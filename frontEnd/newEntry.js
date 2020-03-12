import { objp } from "./presentation.js";
export class NewEntry {
    MakeFormVisible() {
        this.createCustomerDropDown();
        this.createRoleDropDown();
        let formdiv = document.getElementById("Inputform");
        formdiv.style.visibility = "visible";
        let submitbutton = document.getElementById("submit");
        submitbutton.onclick = () => {
            this.NewEntry();
        };
    }
    createRoleDropDown() {
        let roleSelect = document.getElementById("role1");
        fetch("http://localhost:3000/crud/fetchRoles")
            .then(val => val.json())
            .then(res => {
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
    createCustomerDropDown() {
        let customerSelect = document.getElementById("customer1");
        let roleSelect = document.getElementById("role1");
        fetch("http://localhost:3000/crud/fetchCustomers")
            .then(val => val.json())
            .then(res => {
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
    NewEntry() {
        let customerSelect = document.getElementById("customer1");
        let roleSelect = document.getElementById("role1");
        let tbody = document.getElementsByTagName("tbody")[0];
        let newflag = false;
        objp.flag.push(newflag);
        let newRow = document.createElement("tr");
        newRow.style.textAlign = "center";
        tbody.appendChild(newRow);
        let firstname = document.getElementById("fname")
            .value;
        let middlename = document.getElementById("mname")
            .value;
        let lastname = document.getElementById("lname")
            .value;
        let email = document.getElementById("email").value;
        let phone = parseInt(document.getElementById("ph").value);
        let roleid = parseInt(document.getElementById("role1").value);
        let customerid = parseInt(document.getElementById("role1").value);
        let address = document.getElementById("addr").value;
        let customername = customerSelect.options[customerSelect.selectedIndex].text;
        let rolename = roleSelect.options[roleSelect.selectedIndex].text;
        let objE = {
            firstname,
            middlename,
            lastname,
            email,
            phone,
            roleid,
            address,
            customerid
        };
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
                    rolename +
                    "</td>" +
                    '<td class = "cell' +
                    obj.empid +
                    '"><' +
                    objE.address +
                    "/td>" +
                    '<td  class="cell' +
                    obj.empid +
                    '">' +
                    customername +
                    "</td>" +
                    '<td><button type="button" class="btn btn-dark"id="edit' +
                    obj.empid +
                    '"> edit </button></td>' +
                    '<td><button type="button" class = "btn btn-danger"  id="delete' +
                    obj.empid +
                    '"> delete </button></td>' +
                    '<td><input type = "checkbox" class = "checkboxes" ></td>';
            //calling edit and delete functions
            objp.rowCount = document.getElementById("empTable").rows.length;
            let idedit = "edit" + obj.empid;
            let iddelete = "delete" + obj.empid;
            let editButton = document.getElementById(idedit);
            editButton.onclick = () => {
                objp.editData(obj.empid);
            };
            //add delete button --------------------------
            let deleteButton = document.getElementById(iddelete);
            deleteButton.onclick = () => {
                objp.deleteData(obj.empid);
            };
        });
        document.getElementById("Inputform").style.visibility = "hidden";
    }
}
