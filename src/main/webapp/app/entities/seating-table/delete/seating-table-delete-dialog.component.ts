import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISeatingTable } from '../seating-table.model';
import { SeatingTableService } from '../service/seating-table.service';

@Component({
  templateUrl: './seating-table-delete-dialog.component.html',
})
export class SeatingTableDeleteDialogComponent {
  seatingTable?: ISeatingTable;

  constructor(protected seatingTableService: SeatingTableService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.seatingTableService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
