import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ReservationCommentDetailComponent } from './reservation-comment-detail.component';

describe('ReservationComment Management Detail Component', () => {
  let comp: ReservationCommentDetailComponent;
  let fixture: ComponentFixture<ReservationCommentDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationCommentDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ reservationComment: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ReservationCommentDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ReservationCommentDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load reservationComment on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.reservationComment).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
