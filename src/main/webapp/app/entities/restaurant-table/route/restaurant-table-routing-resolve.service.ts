import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRestaurantTable, RestaurantTable } from '../restaurant-table.model';
import { RestaurantTableService } from '../service/restaurant-table.service';

@Injectable({ providedIn: 'root' })
export class RestaurantTableRoutingResolveService implements Resolve<IRestaurantTable> {
  constructor(protected service: RestaurantTableService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRestaurantTable> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((restaurantTable: HttpResponse<RestaurantTable>) => {
          if (restaurantTable.body) {
            return of(restaurantTable.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RestaurantTable());
  }
}
