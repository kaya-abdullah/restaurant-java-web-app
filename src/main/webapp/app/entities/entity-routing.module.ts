import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'region',
        data: { pageTitle: 'restApp.region.home.title' },
        loadChildren: () => import('./region/region.module').then(m => m.RegionModule),
      },
      {
        path: 'country',
        data: { pageTitle: 'restApp.country.home.title' },
        loadChildren: () => import('./country/country.module').then(m => m.CountryModule),
      },
      {
        path: 'city',
        data: { pageTitle: 'restApp.city.home.title' },
        loadChildren: () => import('./city/city.module').then(m => m.CityModule),
      },
      {
        path: 'location',
        data: { pageTitle: 'restApp.location.home.title' },
        loadChildren: () => import('./location/location.module').then(m => m.LocationModule),
      },
      {
        path: 'company',
        data: { pageTitle: 'restApp.company.home.title' },
        loadChildren: () => import('./company/company.module').then(m => m.CompanyModule),
      },
      {
        path: 'restaurant',
        data: { pageTitle: 'restApp.restaurant.home.title' },
        loadChildren: () => import('./restaurant/restaurant.module').then(m => m.RestaurantModule),
      },
      {
        path: 'department',
        data: { pageTitle: 'restApp.department.home.title' },
        loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule),
      },
      {
        path: 'seating-table',
        data: { pageTitle: 'restApp.seatingTable.home.title' },
        loadChildren: () => import('./seating-table/seating-table.module').then(m => m.SeatingTableModule),
      },
      {
        path: 'restaurant-table',
        data: { pageTitle: 'restApp.restaurantTable.home.title' },
        loadChildren: () => import('./restaurant-table/restaurant-table.module').then(m => m.RestaurantTableModule),
      },
      {
        path: 'employee',
        data: { pageTitle: 'restApp.employee.home.title' },
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
      },
      {
        path: 'job',
        data: { pageTitle: 'restApp.job.home.title' },
        loadChildren: () => import('./job/job.module').then(m => m.JobModule),
      },
      {
        path: 'reservation',
        data: { pageTitle: 'restApp.reservation.home.title' },
        loadChildren: () => import('./reservation/reservation.module').then(m => m.ReservationModule),
      },
      {
        path: 'reservation-comment',
        data: { pageTitle: 'restApp.reservationComment.home.title' },
        loadChildren: () => import('./reservation-comment/reservation-comment.module').then(m => m.ReservationCommentModule),
      },
      {
        path: 'customer',
        data: { pageTitle: 'restApp.customer.home.title' },
        loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
