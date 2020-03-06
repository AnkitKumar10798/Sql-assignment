import { objp } from "./presentation.js";
import { Employee } from "./businessLogic.js";
import { Role } from "./businessLogic.js";
export class NewEntry {
  MakeFormVisible() {
    let formdiv = document.getElementById("Inputform");
    formdiv!.style.visibility = "visible";
    let submitbutton = document.getElementById("submit")! as HTMLInputElement;
    submitbutton.onclick = () => {
      this.NewEntry();
    };
  }
  NewEntry() {
    let tbody = document.getElementsByTagName("tbody")[0];
    let newflag = false;
    objp.flag.push(newflag);
    let newRow = document.createElement("tr");
    newRow.style.textAlign = "center";
    tbody.appendChild(newRow);
    let fname = (document.getElementById("fname")! as HTMLInputElement).value;
    let mname = (document.getElementById("mname")! as HTMLInputElement).value;
    let lname = (document.getElementById("lname")! as HTMLInputElement).value;
    let email = (document.getElementById("email")! as HTMLInputElement).value;
    let phone = (document.getElementById("ph")! as HTMLInputElement).value;
    let roleVal = parseInt(
      (document.getElementById("role1")! as HTMLSelectElement).value
    );
    let address = (document.getElementById("addr")! as HTMLInputElement).value;
    let objE = new Employee(
      fname,
      mname,
      lname,
      email,
      parseInt(phone),
      roleVal,
      address
    );
    // objE.empid = row_Count;
    fetch(`http://localhost:3000/crud/createnew`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objE)
    })
      .then(res => {
        return res.json();
      })
      .then(obj => {
        console.log(obj);
        newRow.setAttribute("id", obj[0].empid.toString());
        newRow.innerHTML =
          '<td class = "cell' +
          obj.empid +
          '">' +
          objE.firstname +
          "</td>" +
          '<td class = "cell' +
          obj.empid +
          '">' +
          objE.middlename +
          "</td>" +
          '<td class = "cell' +
          obj.empid +
          '">' +
          objE.lastname +
          "</td>" +
          '<td class = "cell' +
          obj.empid +
          '">' +
          objE.email +
          "</td>" +
          '<td class = "cell' +
          obj.empid +
          '">' +
          objE.phone +
          "</td>" +
          '<td class = "cell' +
          obj.empid +
          '">' +
          objE.role +
          "</td>" +
          '<td class = "cell' +
          obj.empid +
          '"><' +
          objE.address +
          "/td>" +
          '<td><button type="button" class="btn btn-dark"id="edit' +
          obj.empid +
          '"> edit </button></td>' +
          '<td><button type="button" class = "btn btn-danger"  id="delete' +
          obj.empid +
          '"> delete </button></td>' +
          '<td><input type = "checkbox" class = "checkboxes" ></td>';

        //calling edit and delete functions
        objp.rowCount = (document.getElementById(
          "empTable"
        )! as HTMLTableElement).rows.length;
        let idedit = "edit" + obj.empid;
        let iddelete = "delete" + obj.empid;
        let editButton = document.getElementById(
          idedit
        )! as HTMLTableRowElement;
        editButton.onclick = () => {
          objp.editData(obj.empid);
        };
        //add delete button --------------------------
        let deleteButton = document.getElementById(
          iddelete
        )! as HTMLTableRowElement;
        deleteButton.onclick = () => {
          objp.deleteData(obj.empid);
        };
      });
    document.getElementById("Inputform")!.style.visibility = "hidden";
  }
}
