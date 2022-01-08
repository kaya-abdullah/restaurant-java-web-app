import { ICountry } from 'app/entities/country/country.model';

export interface ICity {
  id?: number;
  name?: string;
  phonePrefix?: string;
  country?: ICountry | null;
}

export class City implements ICity {
  constructor(public id?: number, public name?: string, public phonePrefix?: string, public country?: ICountry | null) {}
}

export function getCityIdentifier(city: ICity): number | undefined {
  return city.id;
}
