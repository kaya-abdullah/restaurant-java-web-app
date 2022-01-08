import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CityComponent } from './list/city.component';
import { CityDetailComponent } from './detail/city-detail.component';
import { CityUpdateComponent } from './update/city-update.component';
import { CityDeleteDialogComponent } from './delete/city-delete-dialog.component';
import { CityRoutingModule } from './route/city-routing.module';

@NgModule({
  imports: [SharedModule, CityRoutingModule],
  declarations: [CityComponent, CityDetailComponent, CityUpdateComponent, CityDeleteDialogComponent],
  entryComponents: [CityDeleteDialogComponent],
})
export class CityModule {}
