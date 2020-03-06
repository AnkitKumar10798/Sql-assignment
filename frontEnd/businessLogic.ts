export enum Role {
  QA,
  Development,
  DevOps,
  UIDesign
}
export interface CRUD<T, U> {
  loadAndRefresh(): void;
  create(a: T[]): void;
  editData(row_num: U): void;
  deleteData(row_num: U): void;
}

export class Employee {
  firstname: string;
  middlename: string;
  lastname: string;
  phone: number;
  email: string;
  role: Role;
  address: string;
  empid: number;
  constructor(
    fname: string,
    mname: string,
    lname: string,
    email: string,
    phone: number,
    role: Role,
    address: string
  ) {
    this.firstname = fname;
    this.middlename = mname;
    this.lastname = lname;
    this.email = email;
    this.phone = phone;
    this.role = role;
    this.address = address;
  }
}

export class operations implements CRUD<Employee, number> {
  async loadAndRefresh() {
    let response = await fetch("http://localhost:3000/crud/fetch");
    let data = await response.json();

    return data;
  }
  create(Emp: Employee[]) {}
  editData(num: number) {}
  deleteData(num: number) {}
}
