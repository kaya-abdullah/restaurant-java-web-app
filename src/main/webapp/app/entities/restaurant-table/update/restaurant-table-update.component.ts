import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IRestaurantTable, RestaurantTable } from '../restaurant-table.model';
import { RestaurantTableService } from '../service/restaurant-table.service';
import { IRestaurant } from 'app/entities/restaurant/restaurant.model';
import { RestaurantService } from 'app/entities/restaurant/service/restaurant.service';
import { ISeatingTable } from 'app/entities/seating-table/seating-table.model';
import { SeatingTableService } from 'app/entities/seating-table/service/seating-table.service';

@Component({
  selector: 'jhi-restaurant-table-update',
  templateUrl: './restaurant-table-update.component.html',
})
export class RestaurantTableUpdateComponent implements OnInit {
  isSaving = false;

  restaurantsSharedCollection: IRestaurant[] = [];
  seatingTablesSharedCollection: ISeatingTable[] = [];

  editForm = this.fb.group({
    id: [],
    tableCount: [],
    restaurant: [],
    tables: [],
  });

  constructor(
    protected restaurantTableService: RestaurantTableService,
    protected restaurantService: RestaurantService,
    protected seatingTableService: SeatingTableService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ restaurantTable }) => {
      this.updateForm(restaurantTable);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const restaurantTable = this.createFromForm();
    if (restaurantTable.id !== undefined) {
      this.subscribeToSaveResponse(this.restaurantTableService.update(restaurantTable));
    } else {
      this.subscribeToSaveResponse(this.restaurantTableService.create(restaurantTable));
    }
  }

  trackRestaurantById(index: number, item: IRestaurant): number {
    return item.id!;
  }

  trackSeatingTableById(index: number, item: ISeatingTable): number {
    return item.id!;
  }

  getSelectedSeatingTable(option: ISeatingTable, selectedVals?: ISeatingTable[]): ISeatingTable {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRestaurantTable>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(restaurantTable: IRestaurantTable): void {
    this.editForm.patchValue({
      id: restaurantTable.id,
      tableCount: restaurantTable.tableCount,
      restaurant: restaurantTable.restaurant,
      tables: restaurantTable.tables,
    });

    this.restaurantsSharedCollection = this.restaurantService.addRestaurantToCollectionIfMissing(
      this.restaurantsSharedCollection,
      restaurantTable.restaurant
    );
    this.seatingTablesSharedCollection = this.seatingTableService.addSeatingTableToCollectionIfMissing(
      this.seatingTablesSharedCollection,
      ...(restaurantTable.tables ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.restaurantService
      .query()
      .pipe(map((res: HttpResponse<IRestaurant[]>) => res.body ?? []))
      .pipe(
        map((restaurants: IRestaurant[]) =>
          this.restaurantService.addRestaurantToCollectionIfMissing(restaurants, this.editForm.get('restaurant')!.value)
        )
      )
      .subscribe((restaurants: IRestaurant[]) => (this.restaurantsSharedCollection = restaurants));

    this.seatingTableService
      .query()
      .pipe(map((res: HttpResponse<ISeatingTable[]>) => res.body ?? []))
      .pipe(
        map((seatingTables: ISeatingTable[]) =>
          this.seatingTableService.addSeatingTableToCollectionIfMissing(seatingTables, ...(this.editForm.get('tables')!.value ?? []))
        )
      )
      .subscribe((seatingTables: ISeatingTable[]) => (this.seatingTablesSharedCollection = seatingTables));
  }

  protected createFromForm(): IRestaurantTable {
    return {
      ...new RestaurantTable(),
      id: this.editForm.get(['id'])!.value,
      tableCount: this.editForm.get(['tableCount'])!.value,
      restaurant: this.editForm.get(['restaurant'])!.value,
      tables: this.editForm.get(['tables'])!.value,
    };
  }
}
