import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CityDetailComponent } from './city-detail.component';

describe('City Management Detail Component', () => {
  let comp: CityDetailComponent;
  let fixture: ComponentFixture<CityDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CityDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ city: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CityDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CityDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load city on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.city).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
