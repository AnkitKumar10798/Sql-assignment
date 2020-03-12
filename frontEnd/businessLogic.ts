export enum Role {
  DevOps,
  Developer,
  QA,
  uiDesign
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
  rolename: Role;
  address: string;
  empid: number;
  customername: string;
  constructor(
    fname: string,
    mname: string,
    lname: string,
    email: string,
    phone: number,
    rolename: Role,
    address: string,
    customername: string
  ) {
    this.firstname = fname;
    this.middlename = mname;
    this.lastname = lname;
    this.email = email;
    this.phone = phone;
    this.rolename = rolename;
    this.address = address;
    this.customername = customername;
  }
}

export class operations implements CRUD<Employee, number> {
  async loadAndRefresh() {
    let response = await fetch("http://localhost:3000/crud/fetch");
    let data = await response.json();
    console.log(data);

    return data;
  }
  create(Emp: Employee[]) {}
  editData(num: number) {}
  deleteData(num: number) {}
}
