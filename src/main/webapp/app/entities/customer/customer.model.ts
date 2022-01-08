export interface ICustomer {
  id?: number;
  fullName?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
}

export class Customer implements ICustomer {
  constructor(public id?: number, public fullName?: string | null, public phoneNumber?: string | null, public email?: string | null) {}
}

export function getCustomerIdentifier(customer: ICustomer): number | undefined {
  return customer.id;
}
