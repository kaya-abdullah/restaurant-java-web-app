import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ISeatingTable, SeatingTable } from '../seating-table.model';
import { SeatingTableService } from '../service/seating-table.service';

@Component({
  selector: 'jhi-seating-table-update',
  templateUrl: './seating-table-update.component.html',
})
export class SeatingTableUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    tableType: [null, [Validators.maxLength(200)]],
    seatCount: [],
  });

  constructor(protected seatingTableService: SeatingTableService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ seatingTable }) => {
      this.updateForm(seatingTable);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const seatingTable = this.createFromForm();
    if (seatingTable.id !== undefined) {
      this.subscribeToSaveResponse(this.seatingTableService.update(seatingTable));
    } else {
      this.subscribeToSaveResponse(this.seatingTableService.create(seatingTable));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISeatingTable>>): void {
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

  protected updateForm(seatingTable: ISeatingTable): void {
    this.editForm.patchValue({
      id: seatingTable.id,
      tableType: seatingTable.tableType,
      seatCount: seatingTable.seatCount,
    });
  }

  protected createFromForm(): ISeatingTable {
    return {
      ...new SeatingTable(),
      id: this.editForm.get(['id'])!.value,
      tableType: this.editForm.get(['tableType'])!.value,
      seatCount: this.editForm.get(['seatCount'])!.value,
    };
  }
}
