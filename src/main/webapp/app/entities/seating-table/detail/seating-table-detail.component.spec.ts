import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SeatingTableDetailComponent } from './seating-table-detail.component';

describe('SeatingTable Management Detail Component', () => {
  let comp: SeatingTableDetailComponent;
  let fixture: ComponentFixture<SeatingTableDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeatingTableDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ seatingTable: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SeatingTableDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SeatingTableDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load seatingTable on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.seatingTable).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
