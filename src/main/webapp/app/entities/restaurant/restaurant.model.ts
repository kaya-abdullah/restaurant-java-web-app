import { ICompany } from 'app/entities/company/company.model';

export interface IRestaurant {
  id?: number;
  name?: string;
  company?: ICompany | null;
}

export class Restaurant implements IRestaurant {
  constructor(public id?: number, public name?: string, public company?: ICompany | null) {}
}

export function getRestaurantIdentifier(restaurant: IRestaurant): number | undefined {
  return restaurant.id;
}
