import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RestaurantTableComponent } from '../list/restaurant-table.component';
import { RestaurantTableDetailComponent } from '../detail/restaurant-table-detail.component';
import { RestaurantTableUpdateComponent } from '../update/restaurant-table-update.component';
import { RestaurantTableRoutingResolveService } from './restaurant-table-routing-resolve.service';

const restaurantTableRoute: Routes = [
  {
    path: '',
    component: RestaurantTableComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RestaurantTableDetailComponent,
    resolve: {
      restaurantTable: RestaurantTableRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RestaurantTableUpdateComponent,
    resolve: {
      restaurantTable: RestaurantTableRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RestaurantTableUpdateComponent,
    resolve: {
      restaurantTable: RestaurantTableRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(restaurantTableRoute)],
  exports: [RouterModule],
})
export class RestaurantTableRoutingModule {}
