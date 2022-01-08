import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICity, getCityIdentifier } from '../city.model';

export type EntityResponseType = HttpResponse<ICity>;
export type EntityArrayResponseType = HttpResponse<ICity[]>;

@Injectable({ providedIn: 'root' })
export class CityService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cities');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(city: ICity): Observable<EntityResponseType> {
    return this.http.post<ICity>(this.resourceUrl, city, { observe: 'response' });
  }

  update(city: ICity): Observable<EntityResponseType> {
    return this.http.put<ICity>(`${this.resourceUrl}/${getCityIdentifier(city) as number}`, city, { observe: 'response' });
  }

  partialUpdate(city: ICity): Observable<EntityResponseType> {
    return this.http.patch<ICity>(`${this.resourceUrl}/${getCityIdentifier(city) as number}`, city, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICity>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICity[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCityToCollectionIfMissing(cityCollection: ICity[], ...citiesToCheck: (ICity | null | undefined)[]): ICity[] {
    const cities: ICity[] = citiesToCheck.filter(isPresent);
    if (cities.length > 0) {
      const cityCollectionIdentifiers = cityCollection.map(cityItem => getCityIdentifier(cityItem)!);
      const citiesToAdd = cities.filter(cityItem => {
        const cityIdentifier = getCityIdentifier(cityItem);
        if (cityIdentifier == null || cityCollectionIdentifiers.includes(cityIdentifier)) {
          return false;
        }
        cityCollectionIdentifiers.push(cityIdentifier);
        return true;
      });
      return [...citiesToAdd, ...cityCollection];
    }
    return cityCollection;
  }
}
