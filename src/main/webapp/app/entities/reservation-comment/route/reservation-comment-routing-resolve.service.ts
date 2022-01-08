import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IReservationComment, ReservationComment } from '../reservation-comment.model';
import { ReservationCommentService } from '../service/reservation-comment.service';

@Injectable({ providedIn: 'root' })
export class ReservationCommentRoutingResolveService implements Resolve<IReservationComment> {
  constructor(protected service: ReservationCommentService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReservationComment> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((reservationComment: HttpResponse<ReservationComment>) => {
          if (reservationComment.body) {
            return of(reservationComment.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ReservationComment());
  }
}
