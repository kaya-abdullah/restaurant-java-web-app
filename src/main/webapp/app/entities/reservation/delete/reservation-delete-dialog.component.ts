import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IReservation } from '../reservation.model';
import { ReservationService } from '../service/reservation.service';

@Component({
  templateUrl: './reservation-delete-dialog.component.html',
})
export class ReservationDeleteDialogComponent {
  reservation?: IReservation;

  constructor(protected reservationService: ReservationService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.reservationService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
