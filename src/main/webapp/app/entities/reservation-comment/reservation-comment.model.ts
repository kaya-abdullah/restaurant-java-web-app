import dayjs from 'dayjs/esm';
import { IReservation } from 'app/entities/reservation/reservation.model';

export interface IReservationComment {
  id?: number;
  commentDate?: dayjs.Dayjs | null;
  operatorNote?: string | null;
  reservation?: IReservation | null;
}

export class ReservationComment implements IReservationComment {
  constructor(
    public id?: number,
    public commentDate?: dayjs.Dayjs | null,
    public operatorNote?: string | null,
    public reservation?: IReservation | null
  ) {}
}

export function getReservationCommentIdentifier(reservationComment: IReservationComment): number | undefined {
  return reservationComment.id;
}
