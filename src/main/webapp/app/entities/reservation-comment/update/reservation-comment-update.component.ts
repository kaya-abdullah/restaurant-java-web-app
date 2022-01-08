import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IReservationComment, ReservationComment } from '../reservation-comment.model';
import { ReservationCommentService } from '../service/reservation-comment.service';
import { IReservation } from 'app/entities/reservation/reservation.model';
import { ReservationService } from 'app/entities/reservation/service/reservation.service';

@Component({
  selector: 'jhi-reservation-comment-update',
  templateUrl: './reservation-comment-update.component.html',
})
export class ReservationCommentUpdateComponent implements OnInit {
  isSaving = false;

  reservationsSharedCollection: IReservation[] = [];

  editForm = this.fb.group({
    id: [],
    commentDate: [],
    operatorNote: [null, [Validators.maxLength(4000)]],
    reservation: [],
  });

  constructor(
    protected reservationCommentService: ReservationCommentService,
    protected reservationService: ReservationService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reservationComment }) => {
      if (reservationComment.id === undefined) {
        const today = dayjs().startOf('day');
        reservationComment.commentDate = today;
      }

      this.updateForm(reservationComment);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reservationComment = this.createFromForm();
    if (reservationComment.id !== undefined) {
      this.subscribeToSaveResponse(this.reservationCommentService.update(reservationComment));
    } else {
      this.subscribeToSaveResponse(this.reservationCommentService.create(reservationComment));
    }
  }

  trackReservationById(index: number, item: IReservation): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReservationComment>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(reservationComment: IReservationComment): void {
    this.editForm.patchValue({
      id: reservationComment.id,
      commentDate: reservationComment.commentDate ? reservationComment.commentDate.format(DATE_TIME_FORMAT) : null,
      operatorNote: reservationComment.operatorNote,
      reservation: reservationComment.reservation,
    });

    this.reservationsSharedCollection = this.reservationService.addReservationToCollectionIfMissing(
      this.reservationsSharedCollection,
      reservationComment.reservation
    );
  }

  protected loadRelationshipsOptions(): void {
    this.reservationService
      .query()
      .pipe(map((res: HttpResponse<IReservation[]>) => res.body ?? []))
      .pipe(
        map((reservations: IReservation[]) =>
          this.reservationService.addReservationToCollectionIfMissing(reservations, this.editForm.get('reservation')!.value)
        )
      )
      .subscribe((reservations: IReservation[]) => (this.reservationsSharedCollection = reservations));
  }

  protected createFromForm(): IReservationComment {
    return {
      ...new ReservationComment(),
      id: this.editForm.get(['id'])!.value,
      commentDate: this.editForm.get(['commentDate'])!.value
        ? dayjs(this.editForm.get(['commentDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      operatorNote: this.editForm.get(['operatorNote'])!.value,
      reservation: this.editForm.get(['reservation'])!.value,
    };
  }
}
