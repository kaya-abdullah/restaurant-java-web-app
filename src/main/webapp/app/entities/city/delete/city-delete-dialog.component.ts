import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICity } from '../city.model';
import { CityService } from '../service/city.service';

@Component({
  templateUrl: './city-delete-dialog.component.html',
})
export class CityDeleteDialogComponent {
  city?: ICity;

  constructor(protected cityService: CityService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cityService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
