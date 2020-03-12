var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export var Role;
(function (Role) {
    Role[Role["DevOps"] = 0] = "DevOps";
    Role[Role["Developer"] = 1] = "Developer";
    Role[Role["QA"] = 2] = "QA";
    Role[Role["uiDesign"] = 3] = "uiDesign";
})(Role || (Role = {}));
export class Employee {
    constructor(fname, mname, lname, email, phone, rolename, address, customername) {
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
export class operations {
    loadAndRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch("http://localhost:3000/crud/fetch");
            let data = yield response.json();
            console.log(data);
            return data;
        });
    }
    create(Emp) { }
    editData(num) { }
    deleteData(num) { }
}
