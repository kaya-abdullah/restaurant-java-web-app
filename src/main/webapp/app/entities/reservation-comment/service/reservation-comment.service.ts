import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IReservationComment, getReservationCommentIdentifier } from '../reservation-comment.model';

export type EntityResponseType = HttpResponse<IReservationComment>;
export type EntityArrayResponseType = HttpResponse<IReservationComment[]>;

@Injectable({ providedIn: 'root' })
export class ReservationCommentService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/reservation-comments');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(reservationComment: IReservationComment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reservationComment);
    return this.http
      .post<IReservationComment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(reservationComment: IReservationComment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reservationComment);
    return this.http
      .put<IReservationComment>(`${this.resourceUrl}/${getReservationCommentIdentifier(reservationComment) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(reservationComment: IReservationComment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reservationComment);
    return this.http
      .patch<IReservationComment>(`${this.resourceUrl}/${getReservationCommentIdentifier(reservationComment) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReservationComment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReservationComment[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addReservationCommentToCollectionIfMissing(
    reservationCommentCollection: IReservationComment[],
    ...reservationCommentsToCheck: (IReservationComment | null | undefined)[]
  ): IReservationComment[] {
    const reservationComments: IReservationComment[] = reservationCommentsToCheck.filter(isPresent);
    if (reservationComments.length > 0) {
      const reservationCommentCollectionIdentifiers = reservationCommentCollection.map(
        reservationCommentItem => getReservationCommentIdentifier(reservationCommentItem)!
      );
      const reservationCommentsToAdd = reservationComments.filter(reservationCommentItem => {
        const reservationCommentIdentifier = getReservationCommentIdentifier(reservationCommentItem);
        if (reservationCommentIdentifier == null || reservationCommentCollectionIdentifiers.includes(reservationCommentIdentifier)) {
          return false;
        }
        reservationCommentCollectionIdentifiers.push(reservationCommentIdentifier);
        return true;
      });
      return [...reservationCommentsToAdd, ...reservationCommentCollection];
    }
    return reservationCommentCollection;
  }

  protected convertDateFromClient(reservationComment: IReservationComment): IReservationComment {
    return Object.assign({}, reservationComment, {
      commentDate: reservationComment.commentDate?.isValid() ? reservationComment.commentDate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.commentDate = res.body.commentDate ? dayjs(res.body.commentDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((reservationComment: IReservationComment) => {
        reservationComment.commentDate = reservationComment.commentDate ? dayjs(reservationComment.commentDate) : undefined;
      });
    }
    return res;
  }
}
