import { IRestaurantTable } from 'app/entities/restaurant-table/restaurant-table.model';

export interface ISeatingTable {
  id?: number;
  tableType?: string | null;
  seatCount?: number | null;
  restaurantTables?: IRestaurantTable[] | null;
}

export class SeatingTable implements ISeatingTable {
  constructor(
    public id?: number,
    public tableType?: string | null,
    public seatCount?: number | null,
    public restaurantTables?: IRestaurantTable[] | null
  ) {}
}

export function getSeatingTableIdentifier(seatingTable: ISeatingTable): number | undefined {
  return seatingTable.id;
}
