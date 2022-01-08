import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ReservationCommentComponent } from './list/reservation-comment.component';
import { ReservationCommentDetailComponent } from './detail/reservation-comment-detail.component';
import { ReservationCommentUpdateComponent } from './update/reservation-comment-update.component';
import { ReservationCommentDeleteDialogComponent } from './delete/reservation-comment-delete-dialog.component';
import { ReservationCommentRoutingModule } from './route/reservation-comment-routing.module';

@NgModule({
  imports: [SharedModule, ReservationCommentRoutingModule],
  declarations: [
    ReservationCommentComponent,
    ReservationCommentDetailComponent,
    ReservationCommentUpdateComponent,
    ReservationCommentDeleteDialogComponent,
  ],
  entryComponents: [ReservationCommentDeleteDialogComponent],
})
export class ReservationCommentModule {}
