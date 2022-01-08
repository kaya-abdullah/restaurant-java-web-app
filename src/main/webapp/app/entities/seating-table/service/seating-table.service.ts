import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISeatingTable, getSeatingTableIdentifier } from '../seating-table.model';

export type EntityResponseType = HttpResponse<ISeatingTable>;
export type EntityArrayResponseType = HttpResponse<ISeatingTable[]>;

@Injectable({ providedIn: 'root' })
export class SeatingTableService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/seating-tables');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(seatingTable: ISeatingTable): Observable<EntityResponseType> {
    return this.http.post<ISeatingTable>(this.resourceUrl, seatingTable, { observe: 'response' });
  }

  update(seatingTable: ISeatingTable): Observable<EntityResponseType> {
    return this.http.put<ISeatingTable>(`${this.resourceUrl}/${getSeatingTableIdentifier(seatingTable) as number}`, seatingTable, {
      observe: 'response',
    });
  }

  partialUpdate(seatingTable: ISeatingTable): Observable<EntityResponseType> {
    return this.http.patch<ISeatingTable>(`${this.resourceUrl}/${getSeatingTableIdentifier(seatingTable) as number}`, seatingTable, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISeatingTable>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISeatingTable[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSeatingTableToCollectionIfMissing(
    seatingTableCollection: ISeatingTable[],
    ...seatingTablesToCheck: (ISeatingTable | null | undefined)[]
  ): ISeatingTable[] {
    const seatingTables: ISeatingTable[] = seatingTablesToCheck.filter(isPresent);
    if (seatingTables.length > 0) {
      const seatingTableCollectionIdentifiers = seatingTableCollection.map(
        seatingTableItem => getSeatingTableIdentifier(seatingTableItem)!
      );
      const seatingTablesToAdd = seatingTables.filter(seatingTableItem => {
        const seatingTableIdentifier = getSeatingTableIdentifier(seatingTableItem);
        if (seatingTableIdentifier == null || seatingTableCollectionIdentifiers.includes(seatingTableIdentifier)) {
          return false;
        }
        seatingTableCollectionIdentifiers.push(seatingTableIdentifier);
        return true;
      });
      return [...seatingTablesToAdd, ...seatingTableCollection];
    }
    return seatingTableCollection;
  }
}
