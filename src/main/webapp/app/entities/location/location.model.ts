import { IRestaurant } from 'app/entities/restaurant/restaurant.model';
import { ICity } from 'app/entities/city/city.model';
import { ICountry } from 'app/entities/country/country.model';
import { ICompany } from 'app/entities/company/company.model';

export interface ILocation {
  id?: number;
  streetAddress?: string;
  postalCode?: string;
  stateProvince?: string | null;
  restaurant?: IRestaurant | null;
  city?: ICity | null;
  country?: ICountry | null;
  company?: ICompany | null;
}

export class Location implements ILocation {
  constructor(
    public id?: number,
    public streetAddress?: string,
    public postalCode?: string,
    public stateProvince?: string | null,
    public restaurant?: IRestaurant | null,
    public city?: ICity | null,
    public country?: ICountry | null,
    public company?: ICompany | null
  ) {}
}

export function getLocationIdentifier(location: ILocation): number | undefined {
  return location.id;
}
