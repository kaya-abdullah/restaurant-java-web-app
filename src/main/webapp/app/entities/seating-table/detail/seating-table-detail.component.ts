import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISeatingTable } from '../seating-table.model';

@Component({
  selector: 'jhi-seating-table-detail',
  templateUrl: './seating-table-detail.component.html',
})
export class SeatingTableDetailComponent implements OnInit {
  seatingTable: ISeatingTable | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ seatingTable }) => {
      this.seatingTable = seatingTable;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
