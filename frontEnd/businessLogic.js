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
    Role[Role["QA"] = 0] = "QA";
    Role[Role["Development"] = 1] = "Development";
    Role[Role["DevOps"] = 2] = "DevOps";
    Role[Role["UIDesign"] = 3] = "UIDesign";
})(Role || (Role = {}));
export class Employee {
    constructor(fname, mname, lname, email, phone, role, address) {
        this.firstname = fname;
        this.middlename = mname;
        this.lastname = lname;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.address = address;
    }
}
export class operations {
    loadAndRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch("http://localhost:3000/crud/fetch");
            let data = yield response.json();
            return data;
        });
    }
    create(Emp) { }
    editData(num) { }
    deleteData(num) { }
}
