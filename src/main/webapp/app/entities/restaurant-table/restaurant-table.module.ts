import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RestaurantTableComponent } from './list/restaurant-table.component';
import { RestaurantTableDetailComponent } from './detail/restaurant-table-detail.component';
import { RestaurantTableUpdateComponent } from './update/restaurant-table-update.component';
import { RestaurantTableDeleteDialogComponent } from './delete/restaurant-table-delete-dialog.component';
import { RestaurantTableRoutingModule } from './route/restaurant-table-routing.module';

@NgModule({
  imports: [SharedModule, RestaurantTableRoutingModule],
  declarations: [
    RestaurantTableComponent,
    RestaurantTableDetailComponent,
    RestaurantTableUpdateComponent,
    RestaurantTableDeleteDialogComponent,
  ],
  entryComponents: [RestaurantTableDeleteDialogComponent],
})
export class RestaurantTableModule {}
