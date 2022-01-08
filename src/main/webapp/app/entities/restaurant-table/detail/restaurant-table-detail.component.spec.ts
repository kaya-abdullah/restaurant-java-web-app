import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RestaurantTableDetailComponent } from './restaurant-table-detail.component';

describe('RestaurantTable Management Detail Component', () => {
  let comp: RestaurantTableDetailComponent;
  let fixture: ComponentFixture<RestaurantTableDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantTableDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ restaurantTable: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(RestaurantTableDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(RestaurantTableDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load restaurantTable on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.restaurantTable).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
