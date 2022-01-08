export interface ICompany {
  id?: number;
  name?: string;
}

export class Company implements ICompany {
  constructor(public id?: number, public name?: string) {}
}

export function getCompanyIdentifier(company: ICompany): number | undefined {
  return company.id;
}
