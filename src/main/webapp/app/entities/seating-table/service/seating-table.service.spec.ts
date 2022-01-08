import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISeatingTable, SeatingTable } from '../seating-table.model';

import { SeatingTableService } from './seating-table.service';

describe('SeatingTable Service', () => {
  let service: SeatingTableService;
  let httpMock: HttpTestingController;
  let elemDefault: ISeatingTable;
  let expectedResult: ISeatingTable | ISeatingTable[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SeatingTableService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      tableType: 'AAAAAAA',
      seatCount: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a SeatingTable', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new SeatingTable()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SeatingTable', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          tableType: 'BBBBBB',
          seatCount: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SeatingTable', () => {
      const patchObject = Object.assign({}, new SeatingTable());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SeatingTable', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          tableType: 'BBBBBB',
          seatCount: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a SeatingTable', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addSeatingTableToCollectionIfMissing', () => {
      it('should add a SeatingTable to an empty array', () => {
        const seatingTable: ISeatingTable = { id: 123 };
        expectedResult = service.addSeatingTableToCollectionIfMissing([], seatingTable);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(seatingTable);
      });

      it('should not add a SeatingTable to an array that contains it', () => {
        const seatingTable: ISeatingTable = { id: 123 };
        const seatingTableCollection: ISeatingTable[] = [
          {
            ...seatingTable,
          },
          { id: 456 },
        ];
        expectedResult = service.addSeatingTableToCollectionIfMissing(seatingTableCollection, seatingTable);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SeatingTable to an array that doesn't contain it", () => {
        const seatingTable: ISeatingTable = { id: 123 };
        const seatingTableCollection: ISeatingTable[] = [{ id: 456 }];
        expectedResult = service.addSeatingTableToCollectionIfMissing(seatingTableCollection, seatingTable);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(seatingTable);
      });

      it('should add only unique SeatingTable to an array', () => {
        const seatingTableArray: ISeatingTable[] = [{ id: 123 }, { id: 456 }, { id: 36243 }];
        const seatingTableCollection: ISeatingTable[] = [{ id: 123 }];
        expectedResult = service.addSeatingTableToCollectionIfMissing(seatingTableCollection, ...seatingTableArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const seatingTable: ISeatingTable = { id: 123 };
        const seatingTable2: ISeatingTable = { id: 456 };
        expectedResult = service.addSeatingTableToCollectionIfMissing([], seatingTable, seatingTable2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(seatingTable);
        expect(expectedResult).toContain(seatingTable2);
      });

      it('should accept null and undefined values', () => {
        const seatingTable: ISeatingTable = { id: 123 };
        expectedResult = service.addSeatingTableToCollectionIfMissing([], null, seatingTable, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(seatingTable);
      });

      it('should return initial array if no SeatingTable is added', () => {
        const seatingTableCollection: ISeatingTable[] = [{ id: 123 }];
        expectedResult = service.addSeatingTableToCollectionIfMissing(seatingTableCollection, undefined, null);
        expect(expectedResult).toEqual(seatingTableCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
