import { IRestaurant } from 'app/entities/restaurant/restaurant.model';
import { ISeatingTable } from 'app/entities/seating-table/seating-table.model';

export interface IRestaurantTable {
  id?: number;
  tableCount?: number | null;
  restaurant?: IRestaurant | null;
  tables?: ISeatingTable[] | null;
}

export class RestaurantTable implements IRestaurantTable {
  constructor(
    public id?: number,
    public tableCount?: number | null,
    public restaurant?: IRestaurant | null,
    public tables?: ISeatingTable[] | null
  ) {}
}

export function getRestaurantTableIdentifier(restaurantTable: IRestaurantTable): number | undefined {
  return restaurantTable.id;
}
