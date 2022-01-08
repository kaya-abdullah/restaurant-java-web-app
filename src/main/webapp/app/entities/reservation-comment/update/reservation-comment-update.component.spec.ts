import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ReservationCommentService } from '../service/reservation-comment.service';
import { IReservationComment, ReservationComment } from '../reservation-comment.model';
import { IReservation } from 'app/entities/reservation/reservation.model';
import { ReservationService } from 'app/entities/reservation/service/reservation.service';

import { ReservationCommentUpdateComponent } from './reservation-comment-update.component';

describe('ReservationComment Management Update Component', () => {
  let comp: ReservationCommentUpdateComponent;
  let fixture: ComponentFixture<ReservationCommentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let reservationCommentService: ReservationCommentService;
  let reservationService: ReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ReservationCommentUpdateComponent],
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
      .overrideTemplate(ReservationCommentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReservationCommentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    reservationCommentService = TestBed.inject(ReservationCommentService);
    reservationService = TestBed.inject(ReservationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Reservation query and add missing value', () => {
      const reservationComment: IReservationComment = { id: 456 };
      const reservation: IReservation = { id: 91173 };
      reservationComment.reservation = reservation;

      const reservationCollection: IReservation[] = [{ id: 73283 }];
      jest.spyOn(reservationService, 'query').mockReturnValue(of(new HttpResponse({ body: reservationCollection })));
      const additionalReservations = [reservation];
      const expectedCollection: IReservation[] = [...additionalReservations, ...reservationCollection];
      jest.spyOn(reservationService, 'addReservationToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reservationComment });
      comp.ngOnInit();

      expect(reservationService.query).toHaveBeenCalled();
      expect(reservationService.addReservationToCollectionIfMissing).toHaveBeenCalledWith(reservationCollection, ...additionalReservations);
      expect(comp.reservationsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const reservationComment: IReservationComment = { id: 456 };
      const reservation: IReservation = { id: 35286 };
      reservationComment.reservation = reservation;

      activatedRoute.data = of({ reservationComment });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(reservationComment));
      expect(comp.reservationsSharedCollection).toContain(reservation);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ReservationComment>>();
      const reservationComment = { id: 123 };
      jest.spyOn(reservationCommentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reservationComment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reservationComment }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(reservationCommentService.update).toHaveBeenCalledWith(reservationComment);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ReservationComment>>();
      const reservationComment = new ReservationComment();
      jest.spyOn(reservationCommentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reservationComment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reservationComment }));
      saveSubject.complete();

      // THEN
      expect(reservationCommentService.create).toHaveBeenCalledWith(reservationComment);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ReservationComment>>();
      const reservationComment = { id: 123 };
      jest.spyOn(reservationCommentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reservationComment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(reservationCommentService.update).toHaveBeenCalledWith(reservationComment);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackReservationById', () => {
      it('Should return tracked Reservation primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackReservationById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
