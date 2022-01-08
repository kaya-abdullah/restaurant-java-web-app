import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRestaurantTable } from '../restaurant-table.model';
import { RestaurantTableService } from '../service/restaurant-table.service';

@Component({
  templateUrl: './restaurant-table-delete-dialog.component.html',
})
export class RestaurantTableDeleteDialogComponent {
  restaurantTable?: IRestaurantTable;

  constructor(protected restaurantTableService: RestaurantTableService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.restaurantTableService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
