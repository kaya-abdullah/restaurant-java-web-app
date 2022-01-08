import dayjs from 'dayjs/esm';
import { IEmployee } from 'app/entities/employee/employee.model';
import { IRestaurant } from 'app/entities/restaurant/restaurant.model';
import { ICustomer } from 'app/entities/customer/customer.model';

export interface IReservation {
  id?: number;
  reservationDate?: dayjs.Dayjs | null;
  personCount?: number | null;
  seatingInformation?: string | null;
  operator?: IEmployee | null;
  restaurant?: IRestaurant | null;
  customer?: ICustomer | null;
}

export class Reservation implements IReservation {
  constructor(
    public id?: number,
    public reservationDate?: dayjs.Dayjs | null,
    public personCount?: number | null,
    public seatingInformation?: string | null,
    public operator?: IEmployee | null,
    public restaurant?: IRestaurant | null,
    public customer?: ICustomer | null
  ) {}
}

export function getReservationIdentifier(reservation: IReservation): number | undefined {
  return reservation.id;
}
