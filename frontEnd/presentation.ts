import { CRUD } from "./businessLogic.js";
import { operations } from "./businessLogic.js";
import { Role } from "./businessLogic.js";
import { Employee } from "./businessLogic.js";
import { ButtonOperations } from "./buttonoperations.js";
import { NewEntry } from "./newEntry.js";
import { objValidate } from "./validation.js";
class Presentation implements CRUD<Employee, number> {
  //attributes
  datalen: number;
  rowCount: number;
  class_name: string;
  flag: boolean[] = [];
  Record: Array<any[]>;
  //object as attribute------------------------------------------------
  obj: operations = new operations();
  objB: ButtonOperations = new ButtonOperations();
  objN: NewEntry = new NewEntry();
  callBuisnessLogic() {
    this.obj.loadAndRefresh().then(response => {
      this.create(response);
    });
  }
  //-------------------------------------------------------------------
  constructor() {
    document.getElementById("Inputform")!.style.visibility = "hidden";
    let button = document.getElementById("LOAD");
    button!.addEventListener("click", this.loadAndRefresh);
  }
  loadAndRefresh() {
    if (document.getElementById("LOAD")!.innerHTML == "LOAD DATA") {
      document.getElementById("LOAD")!.innerHTML = "REFRESH DATA";
    } else {
      let div = document.getElementById("div1")! as HTMLElement;
      div.innerHTML = " ";
    }
    objp.callBuisnessLogic();
  }
  create(Emp: Employee[]) {
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
        Role[Emp[c].role] +
        "</td>" +
        '<td  class="cell' +
        Emp[c].empid +
        '">' +
        Emp[c].address +
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
    document.getElementById("div1")!.appendChild(table);
    this.rowCount = table.rows.length;
    this.objB.createNewButtons();
    for (let c = 0; c < this.datalen; c++) {
      let idedit = "edit" + Emp[c].empid;
      let iddelete = "delete" + Emp[c].empid;
      this.objB.clickButtons(idedit, iddelete, Emp[c].empid);
    }
  }
  editData(row_num: number) {
    let id = "cell" + row_num;
    let row_element = document.getElementsByClassName(id);
    if (this.flag[row_num] === false) {
      this.objB.SwitchButton(row_num);
      let row_array: any[] = [];
      for (let i = 0; i < 7; i++) {
        if (i === 5) {
          row_array[i] = row_element[i].innerHTML;
        } else {
          row_array[i] = row_element[i].innerHTML;
        }
      }
      console.log(row_array);
      for (let index = 0; index < row_element.length; index++) {
        if (index === 5) {
          row_element[index].innerHTML = `<select id = "role">
            <option value ="0">QA</option>
            <option value ="1">Development</option>
            <option value ="2">DevOps</option>
            <option value ="3">UIDesign</option>
            </select>`;
        } else {
          row_element[
            index
          ].innerHTML = `<input type="text" class  = "form-control input-sm" 
          value= ${row_array[index]}>`;
        }
      }
    } else {
      let row_array: any[] = [];
      for (let i = 0; i < 7; i++) {
        if (i === 5) {
          row_array[i] = (row_element[i]
            .childNodes[0] as HTMLInputElement).value;
        } else {
          row_array[i] = (row_element[i]
            .childNodes[0] as HTMLInputElement).value;
        }
      }

      if (!objValidate.validateEmail(row_array[3])) {
        this.flag[row_num] = false;
        row_element[3].innerHTML +=
          '<span id = "span1" style = "color:red"></span>';
        let span1 = document.getElementById("span1");
        span1!.style.fontSize = "12px";
        span1!.innerHTML = "invalid email";
      }
      if (!objValidate.validatePhone(`${row_array[4]}`)) {
        this.flag[row_num] = false;
        row_element[4].innerHTML +=
          '<span id = "span2"  style = "color:red"></span>';
        let span2 = document.getElementById("span2");
        span2!.style.fontSize = "12px";
        span2!.innerHTML = "invalid phoneno";
      }
      if (!objValidate.checkothers(row_array[0])) {
        this.flag[row_num] = false;
        row_element[0].innerHTML +=
          '<span id="span0" style="color:red" ></span>';
        let span0 = document.getElementById("span0")!;
        span0.style.fontSize = "12px";
        span0.innerHTML = "invalid firstname";
      }
      if (!objValidate.checkothers(row_array[1])) {
        this.flag[row_num] = false;
        row_element[1].innerHTML +=
          '<span id="span1" style="color:red" ></span>';
        let span1 = document.getElementById("span1")!;
        span1.style.fontSize = "12px";
        span1.innerHTML = "invalid middlename";
      }
      if (!objValidate.checkothers(row_array[2])) {
        this.flag[row_num] = false;
        row_element[1].innerHTML +=
          '<span id="span2" style="color:red" ></span>';
        let span2 = document.getElementById("span2")!;
        span2.style.fontSize = "12px";
        span2.innerHTML = "invalid lastname";
      }
      if (!objValidate.checkothers(row_array[6])) {
        this.flag[row_num] = false;
        row_element[6].innerHTML = `<span id="span6" style="color:red" ></span>`;
        let span6 = document.getElementById("span6")!;
        span6.style.fontSize = "12px";
        span6.innerHTML = "invalid lastname";
      }

      if (
        objValidate.checkothers(row_array[2]) &&
        objValidate.validateEmail(row_array[3]) &&
        objValidate.checkothers(row_array[6]) &&
        objValidate.checkothers(row_array[0]) &&
        objValidate.validatePhone(`${row_array[4]}`) &&
        objValidate.checkothers(row_array[1])
      ) {
        this.Record[row_num] = row_array;
        let changeEmployee = new Employee(
          this.Record[row_num][0],
          this.Record[row_num][1],
          this.Record[row_num][2],
          this.Record[row_num][3],
          this.Record[row_num][4],
          +this.Record[row_num][5],
          this.Record[row_num][6]
        );
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
          for (let index = 0; index < row_element.length; index++) {
            if (index === 5) {
              row_element[index].innerHTML =
                Role[
                  +(row_element[index].childNodes[0] as HTMLInputElement).value
                ];
            } else {
              row_element[index].innerHTML = (row_element[index]
                .childNodes[0] as HTMLInputElement).value;
            }
          }
        });
      }
    }
  }
  deleteData(row_num: number) {
    let row_array: any[] = [];
    let rowid = row_num;
    let row: HTMLTableRowElement = document.getElementById(
      rowid.toString()
    )! as HTMLTableRowElement;
    for (let index = 0; index < 7; index++) {
      row_array[index] = (row.cells[index]
        .childNodes[0] as HTMLInputElement).value;
    }

    console.log(this.flag[row_num]);
    if (this.flag[row_num] === false) {
      console.log("calling the delete api ");
      fetch(`http://localhost:3000/crud/delete/${row_num}`, {
        method: "DELETE"
      }).then(res => {
        row.parentNode!.removeChild(row);
        this.rowCount = (document.getElementById(
          "empTable"
        )! as HTMLTableElement).rows.length;
      });
    } else {
      console.log(row_array);
      for (let i = 0; i < 7; i++) {
        if (i === 5) {
          let check: string = typeof row_array[i];
          if (check === "number") {
            let x = row_array[i];
            row.cells[i].innerHTML = Role[x];
          } else if (check === "string") {
            row.cells[i].innerHTML = Role[+row_array[i]];
          }
        } else {
          row.cells[i].innerHTML = row_array[i];
        }
      }
      this.objB.SwitchButton(row_num);
    }
  }
}

export let objp = new Presentation();
