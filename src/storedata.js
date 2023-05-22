import { LitElement, css, html } from "lit";
import { repeat } from "lit/directives/repeat.js";


export class Data extends LitElement {
  static get properties() {
    return {
      storeData: { type: Array },
      index: { type: Number },
      storeName: { type: String },
      storeEmpCode: { type: String },
      ascending: { type: Boolean },
    };
  }
  //==============================================================

  constructor() {
    super();
    this.storeData = JSON.parse(localStorage.getItem("myFormData")) || [];
    this.index = -1;
    this.storeName = "";
    this.storeEmpCode = "";
    this.ascending = false;
  }
  //==================================================================
  render() {
    return html`
        
        <table id="myTable">
          
            <h1> <marquee loop="-1" scrollamount="5" width="100%" >Employee Data Form </marquee> </h1>
            <button  type="number" class="btn-sort" @click=${
              this.sortitem
            }>Sort</button>
           
            <!-- <input type="text" id="nameFilter" @input=${
              this.filterByName
            } placeholder="Search for names.." title="Type in a name" > -->

            <div class="search">
            <form action="#">
                <input type="text" id="nameFilter" @input=${
                  this.filterByName
                } placeholder="Search for names.." title="Type in a name" >
                <!-- <button>
                    <i class="fa fa-search"
                        style="font-size: 18px; " >
                    </i>
                </button>  -->

            </form>
        </div> 
       


            <thead>
                <tr>
                    <th>Name</th>
                    <th> Empcode</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th> Designation</th>
                    <th> Department</th>
                    <th> Address</th>
                    <th> Address1</th>
                    <th> Landmark</th>
                    <th> country</th>
                    <th> State</th>
                    <th> City</th>
                    <th>Zipcode</th>
                    <th>Actions</th>

                </tr>
            </thead>
            ${repeat(
              this.storeData,
              (item, index) => html`
                <tr>
                  <td>${item.name}</td>
                  <td>${item.empCode}</td>
                  <td>${item.email}</td>
                  <td>${item.phone}</td>
                  <td>${item.designation}</td>
                  <td>${item.department}</td>
                  <td>${item.address}</td>
                  <td>${item.address1}</td>
                  <td>${item.landmark}</td>
                  <td>${item.country}</td>
                  <td>${item.state}</td>
                  <td>${item.city}</td>
                  <td>${item.zipcode}</td>
                  <td id="btn">
                    <button class="update" @click=${() => this.edit(index)}>
                      Edit
                    </button>
                    &nbsp &nbsp
                    <button class="delete" @click=${() => this.delete(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              `
            )}
        </table>


        
        <dialog id="display">
        <form method="dialog">
          <label id="n1">Name:<input
            type="text"
            id="name"
            placeholder="Name"
            value=${this.storeName}
          /></label><br>
          <label id="n1">Empcode:<input
            type="text"
            id="empCode"
            placeholder="Employee Code"
            value=${this.storeEmpCode}
          /></label><br>
          <center><button id="c1" @click=${
            this.cancelData
          }>Cancel</button><br><br>
          <button id="s1" @click=${
            this.updateData
          } type="submit">Save</button><center>
        </form>
      </dialog>


          
        `;
  }
  //==========================================================
  sortitem() {
    this.ascending = !this.ascending;
    const multiplier = this.ascending ? 1 : -1;
    this.storeData.sort((x, y) => {
      const name1 = x.name.toLowerCase();
      const name2 = y.name.toLowerCase();
      if (name1 < name2) {
        return -1 * multiplier;
      }
      if (name1 > name2) {
        return 1 * multiplier;
      }
    });
    this.requestUpdate();
  }
  //----------------------------------------------------
  filterByName(e) {
    e.preventDefault();
    const filterValue = e.target.value.toLowerCase();
    this.storeData = JSON.parse(localStorage.getItem("myFormData")) || [];

    if (filterValue) {
      this.storeData = this.storeData.filter((item) =>
        item.name.toLowerCase().includes(filterValue)
      );
    }

    this.requestUpdate();
  }
  //----------------------------------------------------
  edit(index) {
    this.index = index;
    const items = this.storeData[index];
    this.storeName = items.name;
    this.storeEmpCode = items.empCode;
    this.display();
  }
  display() {
    const box = this.renderRoot.querySelector("#display");
    box.showModal();
  }
  //-------------------------------------------------------
  updateData(e) {
    e.preventDefault();
    const UpdatedName = this.shadowRoot.querySelector("#name").value;
    const UpdatedEmpCode = this.shadowRoot.querySelector("#empCode").value;
    if (UpdatedName && UpdatedEmpCode) {
      const items = this.storeData[this.index];
      items.name = UpdatedName;
      items.empCode = UpdatedEmpCode;
      localStorage.setItem("myFormData", JSON.stringify(this.storeData));
      window.location.reload();
      this.requestUpdate();
    }
  }
  cancelData() {
    window.location.reload();
  }
  delete(index) {
    this.storeData.splice(index, 1);
    localStorage.setItem("myFormData", JSON.stringify(this.storeData));
    alert("Your data is permanently deleted");
    window.location.reload();
    this.requestUpdate();
  }

  static get styles() {
    return css`
      table,
      th,
      td {
        border: 1px solid black;
        border-collapse: collapse;
      }
   

      #nameFilter {
        /* background-image: url("/src/bg.png"); */
        /* Position the search icon */

        /* height:100px;
        background-position: 9px 9px; */
        background-repeat: no-repeat;
        width: 27%;
        font-size: 16px;
        padding: 12px 20px 12px 40px;
        border: 1px solid #ddd;
        /* margin-bottom: 5px; */
        margin-left: 880px;
      }
      h1 {
        color: #0d0e0d;
        background-color: #dbe2de;
      }
      #btn {
        margin: 5px;
        background-color: #c7e45e5a;
      }

      #display {
        height: 200px;
        padding: 9px 16px;
        border-radius: 0.9rem;
      }
      #name {
        height: 25px;
        margin: 26px;
      }
      #empCode {
        height: 25px;
      }
      .update {
        margin: 7px;
        font-size: 17px;
        width: 85px;
        margin-left: 35px;
        padding: 2px 16px;
        border-radius: 0.7rem;
        background-image: linear-gradient(orange, pink);
        box-shadow: 0px 1px 6px 0px rgb(158, 129, 254);
        transform: translate(0, -3px);
        transition: 0.2s;
        transition-timing-function: linear;
      }
      .update:active {
        transform: translate(0, 0);
        border-bottom: 2px solid rgb(50, 50, 50);
      }
      .delete {
        margin-top: 5px;
        margin-left: 35px;
        font-size: 17px;
        padding: 2px 16px;
        border-radius: 0.6rem;
        background-image: linear-gradient(orange, pink);
        box-shadow: 0px 1px 6px 0px rgb(158, 129, 254);
        transform: translate(0, -3px);
        transition: 0.2s;
        transition-timing-function: linear;
      }

      th,
      td {
        padding: 0px;
      }
      #n1 {
        font-size: 17px;
      }
      #c1 {
        font-size: 17px;
        padding: 5px 16px;
        width: 100px;
        margin-top: 10px;
        border-radius: 0.9rem;
        background-image: linear-gradient(blue, white);
      }
      #s1 {
        font-size: 17px;
        padding: 5px 16px;
        width: 100px;
        /* margin-top:4px; */
        border-radius: 0.9rem;
        background-image: linear-gradient(green, white);
      }

      table {
        /* margin:5px; */
        /* width:99%;  */
        /* font-family:Oldtown; */
        font-size: 16px;
        font-family: Georgia, serif;
        margin-top: 30px;
        /* background-image: url("src/bg2.jpg"); */
        /* background-color:black; */
      }
      th {
        padding-top: 12px;
        padding-bottom: 12px;
        background-color: #97cfcf;
      }

      tr:hover {
        background-color: #72d35550;
      }
      tr:nth-child(even) {
        background-color: #e6eaf0;
      }
      .btn-sort {
        position: absolute;
        /* top:30px;
        right:20px; */
        height: 42.5px;
        width: 100px;
        border-radius: 0.2rem;
        font-size: 17px;
        background-color: #eb2deb54;
        margin-top: 1.5px;
        /* margin-left:750px; */
      }
    `;
  }
}

window.customElements.define("data-store", Data);
