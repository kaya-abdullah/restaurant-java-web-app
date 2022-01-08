import { IRegion } from 'app/entities/region/region.model';

export interface ICountry {
  id?: number;
  name?: string;
  isoCode?: string;
  phonePrefix?: string;
  iconUrl?: string | null;
  region?: IRegion | null;
}

export class Country implements ICountry {
  constructor(
    public id?: number,
    public name?: string,
    public isoCode?: string,
    public phonePrefix?: string,
    public iconUrl?: string | null,
    public region?: IRegion | null
  ) {}
}

export function getCountryIdentifier(country: ICountry): number | undefined {
  return country.id;
}
