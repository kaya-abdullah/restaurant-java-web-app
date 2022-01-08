import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReservationComment } from '../reservation-comment.model';

@Component({
  selector: 'jhi-reservation-comment-detail',
  templateUrl: './reservation-comment-detail.component.html',
})
export class ReservationCommentDetailComponent implements OnInit {
  reservationComment: IReservationComment | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reservationComment }) => {
      this.reservationComment = reservationComment;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
