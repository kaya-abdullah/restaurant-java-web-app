import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RestaurantTableService } from '../service/restaurant-table.service';
import { IRestaurantTable, RestaurantTable } from '../restaurant-table.model';
import { IRestaurant } from 'app/entities/restaurant/restaurant.model';
import { RestaurantService } from 'app/entities/restaurant/service/restaurant.service';
import { ISeatingTable } from 'app/entities/seating-table/seating-table.model';
import { SeatingTableService } from 'app/entities/seating-table/service/seating-table.service';

import { RestaurantTableUpdateComponent } from './restaurant-table-update.component';

describe('RestaurantTable Management Update Component', () => {
  let comp: RestaurantTableUpdateComponent;
  let fixture: ComponentFixture<RestaurantTableUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let restaurantTableService: RestaurantTableService;
  let restaurantService: RestaurantService;
  let seatingTableService: SeatingTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RestaurantTableUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(RestaurantTableUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RestaurantTableUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    restaurantTableService = TestBed.inject(RestaurantTableService);
    restaurantService = TestBed.inject(RestaurantService);
    seatingTableService = TestBed.inject(SeatingTableService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Restaurant query and add missing value', () => {
      const restaurantTable: IRestaurantTable = { id: 456 };
      const restaurant: IRestaurant = { id: 84592 };
      restaurantTable.restaurant = restaurant;

      const restaurantCollection: IRestaurant[] = [{ id: 26123 }];
      jest.spyOn(restaurantService, 'query').mockReturnValue(of(new HttpResponse({ body: restaurantCollection })));
      const additionalRestaurants = [restaurant];
      const expectedCollection: IRestaurant[] = [...additionalRestaurants, ...restaurantCollection];
      jest.spyOn(restaurantService, 'addRestaurantToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ restaurantTable });
      comp.ngOnInit();

      expect(restaurantService.query).toHaveBeenCalled();
      expect(restaurantService.addRestaurantToCollectionIfMissing).toHaveBeenCalledWith(restaurantCollection, ...additionalRestaurants);
      expect(comp.restaurantsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SeatingTable query and add missing value', () => {
      const restaurantTable: IRestaurantTable = { id: 456 };
      const tables: ISeatingTable[] = [{ id: 69649 }];
      restaurantTable.tables = tables;

      const seatingTableCollection: ISeatingTable[] = [{ id: 48666 }];
      jest.spyOn(seatingTableService, 'query').mockReturnValue(of(new HttpResponse({ body: seatingTableCollection })));
      const additionalSeatingTables = [...tables];
      const expectedCollection: ISeatingTable[] = [...additionalSeatingTables, ...seatingTableCollection];
      jest.spyOn(seatingTableService, 'addSeatingTableToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ restaurantTable });
      comp.ngOnInit();

      expect(seatingTableService.query).toHaveBeenCalled();
      expect(seatingTableService.addSeatingTableToCollectionIfMissing).toHaveBeenCalledWith(
        seatingTableCollection,
        ...additionalSeatingTables
      );
      expect(comp.seatingTablesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const restaurantTable: IRestaurantTable = { id: 456 };
      const restaurant: IRestaurant = { id: 93551 };
      restaurantTable.restaurant = restaurant;
      const tables: ISeatingTable = { id: 90265 };
      restaurantTable.tables = [tables];

      activatedRoute.data = of({ restaurantTable });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(restaurantTable));
      expect(comp.restaurantsSharedCollection).toContain(restaurant);
      expect(comp.seatingTablesSharedCollection).toContain(tables);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RestaurantTable>>();
      const restaurantTable = { id: 123 };
      jest.spyOn(restaurantTableService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ restaurantTable });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: restaurantTable }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(restaurantTableService.update).toHaveBeenCalledWith(restaurantTable);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RestaurantTable>>();
      const restaurantTable = new RestaurantTable();
      jest.spyOn(restaurantTableService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ restaurantTable });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: restaurantTable }));
      saveSubject.complete();

      // THEN
      expect(restaurantTableService.create).toHaveBeenCalledWith(restaurantTable);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RestaurantTable>>();
      const restaurantTable = { id: 123 };
      jest.spyOn(restaurantTableService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ restaurantTable });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(restaurantTableService.update).toHaveBeenCalledWith(restaurantTable);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackRestaurantById', () => {
      it('Should return tracked Restaurant primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackRestaurantById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackSeatingTableById', () => {
      it('Should return tracked SeatingTable primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackSeatingTableById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedSeatingTable', () => {
      it('Should return option if no SeatingTable is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedSeatingTable(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected SeatingTable for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedSeatingTable(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this SeatingTable is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedSeatingTable(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
