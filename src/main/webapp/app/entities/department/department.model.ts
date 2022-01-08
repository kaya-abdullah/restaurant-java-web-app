import { IEmployee } from 'app/entities/employee/employee.model';
import { IRestaurant } from 'app/entities/restaurant/restaurant.model';

export interface IDepartment {
  id?: number;
  name?: string;
  phoneNumber?: string | null;
  employees?: IEmployee[] | null;
  restaurant?: IRestaurant | null;
}

export class Department implements IDepartment {
  constructor(
    public id?: number,
    public name?: string,
    public phoneNumber?: string | null,
    public employees?: IEmployee[] | null,
    public restaurant?: IRestaurant | null
  ) {}
}

export function getDepartmentIdentifier(department: IDepartment): number | undefined {
  return department.id;
}
