import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IReservationComment, ReservationComment } from '../reservation-comment.model';
import { ReservationCommentService } from '../service/reservation-comment.service';

import { ReservationCommentRoutingResolveService } from './reservation-comment-routing-resolve.service';

describe('ReservationComment routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ReservationCommentRoutingResolveService;
  let service: ReservationCommentService;
  let resultReservationComment: IReservationComment | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(ReservationCommentRoutingResolveService);
    service = TestBed.inject(ReservationCommentService);
    resultReservationComment = undefined;
  });

  describe('resolve', () => {
    it('should return IReservationComment returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultReservationComment = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultReservationComment).toEqual({ id: 123 });
    });

    it('should return new IReservationComment if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultReservationComment = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultReservationComment).toEqual(new ReservationComment());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ReservationComment })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultReservationComment = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultReservationComment).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
