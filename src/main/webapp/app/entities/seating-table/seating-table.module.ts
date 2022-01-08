import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SeatingTableComponent } from './list/seating-table.component';
import { SeatingTableDetailComponent } from './detail/seating-table-detail.component';
import { SeatingTableUpdateComponent } from './update/seating-table-update.component';
import { SeatingTableDeleteDialogComponent } from './delete/seating-table-delete-dialog.component';
import { SeatingTableRoutingModule } from './route/seating-table-routing.module';

@NgModule({
  imports: [SharedModule, SeatingTableRoutingModule],
  declarations: [SeatingTableComponent, SeatingTableDetailComponent, SeatingTableUpdateComponent, SeatingTableDeleteDialogComponent],
  entryComponents: [SeatingTableDeleteDialogComponent],
})
export class SeatingTableModule {}
