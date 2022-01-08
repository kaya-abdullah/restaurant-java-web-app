import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRestaurantTable } from '../restaurant-table.model';

@Component({
  selector: 'jhi-restaurant-table-detail',
  templateUrl: './restaurant-table-detail.component.html',
})
export class RestaurantTableDetailComponent implements OnInit {
  restaurantTable: IRestaurantTable | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ restaurantTable }) => {
      this.restaurantTable = restaurantTable;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
