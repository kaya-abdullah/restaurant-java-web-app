import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SeatingTableService } from '../service/seating-table.service';
import { ISeatingTable, SeatingTable } from '../seating-table.model';

import { SeatingTableUpdateComponent } from './seating-table-update.component';

describe('SeatingTable Management Update Component', () => {
  let comp: SeatingTableUpdateComponent;
  let fixture: ComponentFixture<SeatingTableUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let seatingTableService: SeatingTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SeatingTableUpdateComponent],
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
      .overrideTemplate(SeatingTableUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SeatingTableUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    seatingTableService = TestBed.inject(SeatingTableService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const seatingTable: ISeatingTable = { id: 456 };

      activatedRoute.data = of({ seatingTable });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(seatingTable));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SeatingTable>>();
      const seatingTable = { id: 123 };
      jest.spyOn(seatingTableService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ seatingTable });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: seatingTable }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(seatingTableService.update).toHaveBeenCalledWith(seatingTable);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SeatingTable>>();
      const seatingTable = new SeatingTable();
      jest.spyOn(seatingTableService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ seatingTable });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: seatingTable }));
      saveSubject.complete();

      // THEN
      expect(seatingTableService.create).toHaveBeenCalledWith(seatingTable);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SeatingTable>>();
      const seatingTable = { id: 123 };
      jest.spyOn(seatingTableService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ seatingTable });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(seatingTableService.update).toHaveBeenCalledWith(seatingTable);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
