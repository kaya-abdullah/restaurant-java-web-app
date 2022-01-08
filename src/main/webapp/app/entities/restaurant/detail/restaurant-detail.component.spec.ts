import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RestaurantDetailComponent } from './restaurant-detail.component';

describe('Restaurant Management Detail Component', () => {
  let comp: RestaurantDetailComponent;
  let fixture: ComponentFixture<RestaurantDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ restaurant: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(RestaurantDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(RestaurantDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load restaurant on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.restaurant).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
