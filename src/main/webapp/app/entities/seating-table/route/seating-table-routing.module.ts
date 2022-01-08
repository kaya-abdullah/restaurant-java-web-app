import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SeatingTableComponent } from '../list/seating-table.component';
import { SeatingTableDetailComponent } from '../detail/seating-table-detail.component';
import { SeatingTableUpdateComponent } from '../update/seating-table-update.component';
import { SeatingTableRoutingResolveService } from './seating-table-routing-resolve.service';

const seatingTableRoute: Routes = [
  {
    path: '',
    component: SeatingTableComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SeatingTableDetailComponent,
    resolve: {
      seatingTable: SeatingTableRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SeatingTableUpdateComponent,
    resolve: {
      seatingTable: SeatingTableRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SeatingTableUpdateComponent,
    resolve: {
      seatingTable: SeatingTableRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(seatingTableRoute)],
  exports: [RouterModule],
})
export class SeatingTableRoutingModule {}
