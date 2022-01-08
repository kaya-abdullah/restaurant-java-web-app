import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRestaurantTable, RestaurantTable } from '../restaurant-table.model';

import { RestaurantTableService } from './restaurant-table.service';

describe('RestaurantTable Service', () => {
  let service: RestaurantTableService;
  let httpMock: HttpTestingController;
  let elemDefault: IRestaurantTable;
  let expectedResult: IRestaurantTable | IRestaurantTable[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RestaurantTableService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      tableCount: 0,
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

    it('should create a RestaurantTable', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new RestaurantTable()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a RestaurantTable', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          tableCount: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a RestaurantTable', () => {
      const patchObject = Object.assign({}, new RestaurantTable());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of RestaurantTable', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          tableCount: 1,
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

    it('should delete a RestaurantTable', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addRestaurantTableToCollectionIfMissing', () => {
      it('should add a RestaurantTable to an empty array', () => {
        const restaurantTable: IRestaurantTable = { id: 123 };
        expectedResult = service.addRestaurantTableToCollectionIfMissing([], restaurantTable);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(restaurantTable);
      });

      it('should not add a RestaurantTable to an array that contains it', () => {
        const restaurantTable: IRestaurantTable = { id: 123 };
        const restaurantTableCollection: IRestaurantTable[] = [
          {
            ...restaurantTable,
          },
          { id: 456 },
        ];
        expectedResult = service.addRestaurantTableToCollectionIfMissing(restaurantTableCollection, restaurantTable);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a RestaurantTable to an array that doesn't contain it", () => {
        const restaurantTable: IRestaurantTable = { id: 123 };
        const restaurantTableCollection: IRestaurantTable[] = [{ id: 456 }];
        expectedResult = service.addRestaurantTableToCollectionIfMissing(restaurantTableCollection, restaurantTable);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(restaurantTable);
      });

      it('should add only unique RestaurantTable to an array', () => {
        const restaurantTableArray: IRestaurantTable[] = [{ id: 123 }, { id: 456 }, { id: 10540 }];
        const restaurantTableCollection: IRestaurantTable[] = [{ id: 123 }];
        expectedResult = service.addRestaurantTableToCollectionIfMissing(restaurantTableCollection, ...restaurantTableArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const restaurantTable: IRestaurantTable = { id: 123 };
        const restaurantTable2: IRestaurantTable = { id: 456 };
        expectedResult = service.addRestaurantTableToCollectionIfMissing([], restaurantTable, restaurantTable2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(restaurantTable);
        expect(expectedResult).toContain(restaurantTable2);
      });

      it('should accept null and undefined values', () => {
        const restaurantTable: IRestaurantTable = { id: 123 };
        expectedResult = service.addRestaurantTableToCollectionIfMissing([], null, restaurantTable, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(restaurantTable);
      });

      it('should return initial array if no RestaurantTable is added', () => {
        const restaurantTableCollection: IRestaurantTable[] = [{ id: 123 }];
        expectedResult = service.addRestaurantTableToCollectionIfMissing(restaurantTableCollection, undefined, null);
        expect(expectedResult).toEqual(restaurantTableCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
