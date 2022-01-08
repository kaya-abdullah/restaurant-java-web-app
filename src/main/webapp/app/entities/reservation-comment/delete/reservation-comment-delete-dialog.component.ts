import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IReservationComment } from '../reservation-comment.model';
import { ReservationCommentService } from '../service/reservation-comment.service';

@Component({
  templateUrl: './reservation-comment-delete-dialog.component.html',
})
export class ReservationCommentDeleteDialogComponent {
  reservationComment?: IReservationComment;

  constructor(protected reservationCommentService: ReservationCommentService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.reservationCommentService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
