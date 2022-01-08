import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICity, City } from '../city.model';

import { CityService } from './city.service';

describe('City Service', () => {
  let service: CityService;
  let httpMock: HttpTestingController;
  let elemDefault: ICity;
  let expectedResult: ICity | ICity[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CityService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      name: 'AAAAAAA',
      phonePrefix: 'AAAAAAA',
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

    it('should create a City', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new City()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a City', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
          phonePrefix: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a City', () => {
      const patchObject = Object.assign({}, new City());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of City', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
          phonePrefix: 'BBBBBB',
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

    it('should delete a City', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addCityToCollectionIfMissing', () => {
      it('should add a City to an empty array', () => {
        const city: ICity = { id: 123 };
        expectedResult = service.addCityToCollectionIfMissing([], city);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(city);
      });

      it('should not add a City to an array that contains it', () => {
        const city: ICity = { id: 123 };
        const cityCollection: ICity[] = [
          {
            ...city,
          },
          { id: 456 },
        ];
        expectedResult = service.addCityToCollectionIfMissing(cityCollection, city);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a City to an array that doesn't contain it", () => {
        const city: ICity = { id: 123 };
        const cityCollection: ICity[] = [{ id: 456 }];
        expectedResult = service.addCityToCollectionIfMissing(cityCollection, city);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(city);
      });

      it('should add only unique City to an array', () => {
        const cityArray: ICity[] = [{ id: 123 }, { id: 456 }, { id: 82630 }];
        const cityCollection: ICity[] = [{ id: 123 }];
        expectedResult = service.addCityToCollectionIfMissing(cityCollection, ...cityArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const city: ICity = { id: 123 };
        const city2: ICity = { id: 456 };
        expectedResult = service.addCityToCollectionIfMissing([], city, city2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(city);
        expect(expectedResult).toContain(city2);
      });

      it('should accept null and undefined values', () => {
        const city: ICity = { id: 123 };
        expectedResult = service.addCityToCollectionIfMissing([], null, city, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(city);
      });

      it('should return initial array if no City is added', () => {
        const cityCollection: ICity[] = [{ id: 123 }];
        expectedResult = service.addCityToCollectionIfMissing(cityCollection, undefined, null);
        expect(expectedResult).toEqual(cityCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
