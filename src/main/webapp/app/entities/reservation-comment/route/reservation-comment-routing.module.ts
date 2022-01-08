import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ReservationCommentComponent } from '../list/reservation-comment.component';
import { ReservationCommentDetailComponent } from '../detail/reservation-comment-detail.component';
import { ReservationCommentUpdateComponent } from '../update/reservation-comment-update.component';
import { ReservationCommentRoutingResolveService } from './reservation-comment-routing-resolve.service';

const reservationCommentRoute: Routes = [
  {
    path: '',
    component: ReservationCommentComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ReservationCommentDetailComponent,
    resolve: {
      reservationComment: ReservationCommentRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ReservationCommentUpdateComponent,
    resolve: {
      reservationComment: ReservationCommentRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ReservationCommentUpdateComponent,
    resolve: {
      reservationComment: ReservationCommentRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(reservationCommentRoute)],
  exports: [RouterModule],
})
export class ReservationCommentRoutingModule {}
