import { operations } from "./businessLogic.js";
import { Role } from "./businessLogic.js";
import { Employee } from "./businessLogic.js";
import { ButtonOperations } from "./buttonoperations.js";
import { NewEntry } from "./newEntry.js";
import { objValidate } from "./validation.js";
class Presentation {
    //-------------------------------------------------------------------
    constructor() {
        this.flag = [];
        //object as attribute------------------------------------------------
        this.obj = new operations();
        this.objB = new ButtonOperations();
        this.objN = new NewEntry();
        document.getElementById("Inputform").style.visibility = "hidden";
        let button = document.getElementById("LOAD");
        button.addEventListener("click", this.loadAndRefresh);
    }
    callBuisnessLogic() {
        this.obj.loadAndRefresh().then(response => {
            this.create(response);
        });
    }
    loadAndRefresh() {
        if (document.getElementById("LOAD").innerHTML == "LOAD DATA") {
            document.getElementById("LOAD").innerHTML = "REFRESH DATA";
        }
        else {
            let div = document.getElementById("div1");
            div.innerHTML = " ";
        }
        objp.callBuisnessLogic();
    }
    create(Emp) {
        //destructing---------------------------------------------------------
        this.datalen = Emp.length;
        this.Record = Emp.map(obj => Object.values(obj));
        console.log(this.Record);
        for (let i = 0; i < this.datalen; i++) {
            this.flag[Emp[i].empid] = false;
        }
        let table = document.createElement("table");
        table.setAttribute("id", "empTable");
        table.setAttribute("class", "table  table-light table-hover");
        table.style.tableLayout = "fixed";
        let arrHeaders = new Array();
        arrHeaders = [
            "firstName",
            "middleName",
            "lastName",
            "Email",
            "phone",
            "Role",
            "Address",
            "customerName",
            "Edit option",
            "Delete option",
            "Multiple select"
        ];
        let tr = table.insertRow(-1);
        //create Headers
        for (let h = 0; h < arrHeaders.length; h++) {
            let th = document.createElement("th");
            th.setAttribute("class", "table table-dark");
            th.innerHTML = arrHeaders[h];
            tr.appendChild(th);
        }
        for (let c = 0; c < this.datalen; c++) {
            tr = table.insertRow(-1);
            tr.setAttribute("id", Emp[c].empid.toString());
            tr.style.textAlign = "center";
            tr.innerHTML =
                '<td  class="cell' +
                    Emp[c].empid +
                    '">' +
                    Emp[c].firstname +
                    "</td>" +
                    '<td  class="cell' +
                    Emp[c].empid +
                    '">' +
                    Emp[c].middlename +
                    "</td>" +
                    '<td  class="cell' +
                    Emp[c].empid +
                    '">' +
                    Emp[c].lastname +
                    "</td>" +
                    '<td  class="cell' +
                    Emp[c].empid +
                    '">' +
                    Emp[c].email +
                    "</td>" +
                    '<td  class="cell' +
                    Emp[c].empid +
                    '">' +
                    Emp[c].phone +
                    "</td>" +
                    '<td  class="cell' +
                    Emp[c].empid +
                    '">' +
                    Emp[c].rolename +
                    "</td>" +
                    '<td  class="cell' +
                    Emp[c].empid +
                    '">' +
                    Emp[c].address +
                    '<td  class="cell' +
                    Emp[c].empid +
                    '">' +
                    Emp[c].customername +
                    "</td>" +
                    "</td>" +
                    '<td> <button type="button" class="btn btn-dark"id="edit' +
                    Emp[c].empid +
                    '"> edit </button></td>' +
                    '<td> <button type="button" class = "btn btn-danger"  id="delete' +
                    Emp[c].empid +
                    '"> delete </button></td>' +
                    '<td><input type = "checkbox" class = "checkboxes" ></td>';
            this.class_name = "cell" + Emp[c].empid;
        }
        document.getElementById("div1").appendChild(table);
        this.rowCount = table.rows.length;
        this.objB.createNewButtons();
        for (let c = 0; c < this.datalen; c++) {
            let idedit = "edit" + Emp[c].empid;
            let iddelete = "delete" + Emp[c].empid;
            this.objB.clickButtons(idedit, iddelete, Emp[c].empid);
        }
    }
    editData(row_num) {
        let id = "cell" + row_num;
        let row_element = document.getElementsByClassName(id);
        if (this.flag[row_num] === false) {
            this.objB.SwitchButton(row_num);
            let row_array = [];
            for (let i = 0; i < 8; i++) {
                if (i === 5) {
                    row_array[i] = row_element[i].innerHTML;
                }
                else {
                    row_array[i] = row_element[i].innerHTML;
                }
            }
            for (let index = 0; index < row_element.length; index++) {
                if (index == 5) {
                    fetch("http://localhost:3000/crud/fetchRoles")
                        .then(val => val.json())
                        .then(res => {
                        let roleSelect = document.createElement("select");
                        roleSelect.setAttribute("id", "role");
                        row_element[index].replaceChild(roleSelect, row_element[index].childNodes[0]);
                        let optionsCount = res.length;
                        let option = [];
                        for (let i = 0; i < optionsCount; i++) {
                            option[i] = document.createElement("option");
                            option[i].setAttribute("value", res[i].roleid);
                            let text = document.createTextNode(res[i].rolename);
                            option[i].appendChild(text);
                            roleSelect.appendChild(option[i]);
                        }
                    });
                }
                else if (index == 7) {
                    fetch("http://localhost:3000/crud/fetchCustomers")
                        .then(val => val.json())
                        .then(res => {
                        let customerSelect = document.createElement("select");
                        customerSelect.setAttribute("id", "customers");
                        row_element[index].replaceChild(customerSelect, row_element[index].childNodes[0]);
                        let optionsCount = res.length;
                        let option = [];
                        for (let i = 0; i < optionsCount; i++) {
                            option[i] = document.createElement("option");
                            option[i].setAttribute("value", res[i].customerid);
                            let text = document.createTextNode(res[i].customername);
                            option[i].appendChild(text);
                            customerSelect.appendChild(option[i]);
                        }
                    });
                }
                else {
                    row_element[index].innerHTML = `<input type="text" class  = "form-control input-sm" 
          value= ${row_array[index]}>`;
                }
            }
        }
        else {
            let select_role = document.getElementById("role");
            let select_customer = document.getElementById("customers");
            let row_array = [];
            for (let i = 0; i < 8; i++) {
                if (i == 5) {
                    row_array[i] = select_role.options[select_role.selectedIndex].text;
                }
                else if (i == 7) {
                    row_array[i] =
                        select_customer.options[select_customer.selectedIndex].text;
                }
                row_array[i] = row_element[i].childNodes[0].value;
            }
            console.log(row_array);
            if (!objValidate.validateEmail(row_array[3])) {
                this.flag[row_num] = false;
                row_element[3].innerHTML +=
                    '<span id = "span1" style = "color:red"></span>';
                let span1 = document.getElementById("span1");
                span1.style.fontSize = "12px";
                span1.innerHTML = "invalid email";
            }
            if (!objValidate.validatePhone(`${row_array[4]}`)) {
                this.flag[row_num] = false;
                row_element[4].innerHTML +=
                    '<span id = "span2"  style = "color:red"></span>';
                let span2 = document.getElementById("span2");
                span2.style.fontSize = "12px";
                span2.innerHTML = "invalid phoneno";
            }
            if (!objValidate.checkothers(row_array[0])) {
                this.flag[row_num] = false;
                row_element[0].innerHTML +=
                    '<span id="span0" style="color:red" ></span>';
                let span0 = document.getElementById("span0");
                span0.style.fontSize = "12px";
                span0.innerHTML = "invalid firstname";
            }
            if (!objValidate.checkothers(row_array[1])) {
                this.flag[row_num] = false;
                row_element[1].innerHTML +=
                    '<span id="span1" style="color:red" ></span>';
                let span1 = document.getElementById("span1");
                span1.style.fontSize = "12px";
                span1.innerHTML = "invalid middlename";
            }
            if (!objValidate.checkothers(row_array[2])) {
                this.flag[row_num] = false;
                row_element[1].innerHTML +=
                    '<span id="span2" style="color:red" ></span>';
                let span2 = document.getElementById("span2");
                span2.style.fontSize = "12px";
                span2.innerHTML = "invalid lastname";
            }
            if (!objValidate.checkothers(row_array[6])) {
                this.flag[row_num] = false;
                row_element[6].innerHTML = `<span id="span6" style="color:red" ></span>`;
                let span6 = document.getElementById("span6");
                span6.style.fontSize = "12px";
                span6.innerHTML = "invalid lastname";
            }
            if (objValidate.checkothers(row_array[2]) &&
                objValidate.validateEmail(row_array[3]) &&
                objValidate.checkothers(row_array[6]) &&
                objValidate.checkothers(row_array[0]) &&
                objValidate.validatePhone(`${row_array[4]}`) &&
                objValidate.checkothers(row_array[1])) {
                let changeEmployee = new Employee(row_array[0], row_array[1], row_array[2], row_array[3], +row_array[4], row_array[5], row_array[6], row_array[7]);
                // changeEmployee.empid = row_num;
                console.log(changeEmployee);
                fetch(`http://localhost:3000/crud/edit/${row_num}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(changeEmployee)
                }).then(res => {
                    this.objB.SwitchButton(row_num);
                    for (let index = 0; index < 8; index++) {
                        if (index == 5) {
                            row_element[index].innerHTML =
                                select_role.options[select_role.selectedIndex].text;
                        }
                        else if (index === 7) {
                            row_element[index].innerHTML =
                                select_customer.options[select_customer.selectedIndex].text;
                        }
                        else {
                            row_element[index].innerHTML = row_element[index]
                                .childNodes[0].value;
                        }
                    }
                });
            }
        }
    }
    deleteData(row_num) {
        let row_array = [];
        let rowid = row_num;
        let row = document.getElementById(rowid.toString());
        for (let index = 0; index < 7; index++) {
            row_array[index] = row.cells[index]
                .childNodes[0].value;
        }
        console.log(this.flag[row_num]);
        if (this.flag[row_num] === false) {
            console.log("calling the delete api ");
            fetch(`http://localhost:3000/crud/delete/${row_num}`, {
                method: "DELETE"
            }).then(res => {
                row.parentNode.removeChild(row);
                this.rowCount = document.getElementById("empTable").rows.length;
            });
        }
        else {
            console.log(row_array);
            for (let i = 0; i < 7; i++) {
                if (i === 5) {
                    let check = typeof row_array[i];
                    if (check === "number") {
                        let x = row_array[i];
                        row.cells[i].innerHTML = Role[x];
                    }
                    else if (check === "string") {
                        row.cells[i].innerHTML = Role[+row_array[i]];
                    }
                }
                else {
                    row.cells[i].innerHTML = row_array[i];
                }
            }
            this.objB.SwitchButton(row_num);
        }
    }
}
export let objp = new Presentation();
