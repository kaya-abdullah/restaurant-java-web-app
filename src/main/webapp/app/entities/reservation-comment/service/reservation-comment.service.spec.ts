import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IReservationComment, ReservationComment } from '../reservation-comment.model';

import { ReservationCommentService } from './reservation-comment.service';

describe('ReservationComment Service', () => {
  let service: ReservationCommentService;
  let httpMock: HttpTestingController;
  let elemDefault: IReservationComment;
  let expectedResult: IReservationComment | IReservationComment[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ReservationCommentService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      commentDate: currentDate,
      operatorNote: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          commentDate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a ReservationComment', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          commentDate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          commentDate: currentDate,
        },
        returnedFromService
      );

      service.create(new ReservationComment()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ReservationComment', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          commentDate: currentDate.format(DATE_TIME_FORMAT),
          operatorNote: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          commentDate: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ReservationComment', () => {
      const patchObject = Object.assign(
        {
          commentDate: currentDate.format(DATE_TIME_FORMAT),
        },
        new ReservationComment()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          commentDate: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ReservationComment', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          commentDate: currentDate.format(DATE_TIME_FORMAT),
          operatorNote: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          commentDate: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a ReservationComment', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addReservationCommentToCollectionIfMissing', () => {
      it('should add a ReservationComment to an empty array', () => {
        const reservationComment: IReservationComment = { id: 123 };
        expectedResult = service.addReservationCommentToCollectionIfMissing([], reservationComment);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reservationComment);
      });

      it('should not add a ReservationComment to an array that contains it', () => {
        const reservationComment: IReservationComment = { id: 123 };
        const reservationCommentCollection: IReservationComment[] = [
          {
            ...reservationComment,
          },
          { id: 456 },
        ];
        expectedResult = service.addReservationCommentToCollectionIfMissing(reservationCommentCollection, reservationComment);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ReservationComment to an array that doesn't contain it", () => {
        const reservationComment: IReservationComment = { id: 123 };
        const reservationCommentCollection: IReservationComment[] = [{ id: 456 }];
        expectedResult = service.addReservationCommentToCollectionIfMissing(reservationCommentCollection, reservationComment);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reservationComment);
      });

      it('should add only unique ReservationComment to an array', () => {
        const reservationCommentArray: IReservationComment[] = [{ id: 123 }, { id: 456 }, { id: 71452 }];
        const reservationCommentCollection: IReservationComment[] = [{ id: 123 }];
        expectedResult = service.addReservationCommentToCollectionIfMissing(reservationCommentCollection, ...reservationCommentArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const reservationComment: IReservationComment = { id: 123 };
        const reservationComment2: IReservationComment = { id: 456 };
        expectedResult = service.addReservationCommentToCollectionIfMissing([], reservationComment, reservationComment2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reservationComment);
        expect(expectedResult).toContain(reservationComment2);
      });

      it('should accept null and undefined values', () => {
        const reservationComment: IReservationComment = { id: 123 };
        expectedResult = service.addReservationCommentToCollectionIfMissing([], null, reservationComment, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reservationComment);
      });

      it('should return initial array if no ReservationComment is added', () => {
        const reservationCommentCollection: IReservationComment[] = [{ id: 123 }];
        expectedResult = service.addReservationCommentToCollectionIfMissing(reservationCommentCollection, undefined, null);
        expect(expectedResult).toEqual(reservationCommentCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
