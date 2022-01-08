import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISeatingTable, SeatingTable } from '../seating-table.model';
import { SeatingTableService } from '../service/seating-table.service';

@Injectable({ providedIn: 'root' })
export class SeatingTableRoutingResolveService implements Resolve<ISeatingTable> {
  constructor(protected service: SeatingTableService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISeatingTable> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((seatingTable: HttpResponse<SeatingTable>) => {
          if (seatingTable.body) {
            return of(seatingTable.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SeatingTable());
  }
}
