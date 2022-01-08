import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRestaurantTable, getRestaurantTableIdentifier } from '../restaurant-table.model';

export type EntityResponseType = HttpResponse<IRestaurantTable>;
export type EntityArrayResponseType = HttpResponse<IRestaurantTable[]>;

@Injectable({ providedIn: 'root' })
export class RestaurantTableService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/restaurant-tables');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(restaurantTable: IRestaurantTable): Observable<EntityResponseType> {
    return this.http.post<IRestaurantTable>(this.resourceUrl, restaurantTable, { observe: 'response' });
  }

  update(restaurantTable: IRestaurantTable): Observable<EntityResponseType> {
    return this.http.put<IRestaurantTable>(
      `${this.resourceUrl}/${getRestaurantTableIdentifier(restaurantTable) as number}`,
      restaurantTable,
      { observe: 'response' }
    );
  }

  partialUpdate(restaurantTable: IRestaurantTable): Observable<EntityResponseType> {
    return this.http.patch<IRestaurantTable>(
      `${this.resourceUrl}/${getRestaurantTableIdentifier(restaurantTable) as number}`,
      restaurantTable,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRestaurantTable>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRestaurantTable[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addRestaurantTableToCollectionIfMissing(
    restaurantTableCollection: IRestaurantTable[],
    ...restaurantTablesToCheck: (IRestaurantTable | null | undefined)[]
  ): IRestaurantTable[] {
    const restaurantTables: IRestaurantTable[] = restaurantTablesToCheck.filter(isPresent);
    if (restaurantTables.length > 0) {
      const restaurantTableCollectionIdentifiers = restaurantTableCollection.map(
        restaurantTableItem => getRestaurantTableIdentifier(restaurantTableItem)!
      );
      const restaurantTablesToAdd = restaurantTables.filter(restaurantTableItem => {
        const restaurantTableIdentifier = getRestaurantTableIdentifier(restaurantTableItem);
        if (restaurantTableIdentifier == null || restaurantTableCollectionIdentifiers.includes(restaurantTableIdentifier)) {
          return false;
        }
        restaurantTableCollectionIdentifiers.push(restaurantTableIdentifier);
        return true;
      });
      return [...restaurantTablesToAdd, ...restaurantTableCollection];
    }
    return restaurantTableCollection;
  }
}
