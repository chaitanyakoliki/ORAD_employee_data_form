import { LitElement, css, html, nothing } from "lit";
import { repeat } from "lit/directives/repeat.js";
import "./my-element";

export class Userdata extends LitElement {
  static get properties() {
    return {
      savedData: { type: Array },
      index: { type: Number },
      editData: { type: Object },
      ascending: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.savedData = JSON.parse(localStorage.getItem("myFormData")) || [];
    this.index = -1;
    this.editData = undefined;
    this.ascending = false;
  }
  //================================================================

  //===================================================================
  render() {
    return html`
      <table id="myTable">
        <h1>
          <marquee loop="-1" scrollamount="5" width="100%"
            >Employee Data Form
          </marquee>
        </h1>
        <button type="text" class="btn-sort" @click=${this.sortitem}>
          Sort
        </button>

        <div class="search">
          <form action="#">
            <input
              type="text"
              id="nameFilter"
              @input=${this.filterByName}
              placeholder="Search for names.."
              title="Type in a name"
            />
          </form>
        </div>

        <thead>
          <tr>
            <th>Name</th>
            <th>Empcode</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Address</th>
            <th>Address1</th>
            <th>Landmark</th>
            <th>country</th>
            <th>State</th>
            <th>City</th>
            <th>Zipcode</th>
            <th>Actions</th>
          </tr>
        </thead>
        <!---------------------------------------------------------->
        ${this.editData
          ? html` <dialog id="popUpForm">
              <my-element
                isEditing
                .editData=${this.editData}
                .savedData=${this.savedData}
                ><button class="btn" @click=${this.cancelData}>
                  Close
                </button></my-element
              >
            </dialog>`
          : nothing}
        <!----------------------------------------------------------->
        ${repeat(
          this.savedData,
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
                <button class="update" @click=${() => this.updateitem(index)}>
                  Update
                </button>
                <!-- <sl-button class="update" @click=${() => this.updateitem(index)}>Button</sl-button> -->

                &nbsp &nbsp
                <button
                  class="delete"
                  @click=${() => this.deletecondition(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          `
        )}
      </table>
    `;
  }

  //===============================================================
  sortitem() {
    this.ascending = !this.ascending;
    const multiplier = this.ascending ? 1 : -1;
    this.savedData.sort((x, y) => {
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
  //==================================================
  filterByName(e) {
    e.preventDefault();
    const filterValue = e.target.value.toLowerCase();
    this.savedData= JSON.parse(localStorage.getItem("myFormData")) || [];

    if (filterValue) {
      this.savedData = this.savedData.filter((item) =>
        item.name.toLowerCase().includes(filterValue)
      );
    }

    this.requestUpdate();
  }
  //===============================================================

  updateitem(index) {
    this.index = index;
    const items = this.savedData[index];
    this.editData = items;

    requestAnimationFrame(() => {
      this.popUpForm();
    });
  }
  popUpForm() {
    const popUp = this.renderRoot.querySelector("#popUpForm");
    popUp.showModal();
  }

  cancelData() {
    this.editData = undefined;
    const popUp = this.renderRoot.querySelector("#popUpForm");
    popUp.close();
    window.location.reload();
  }

  deletecondition(index) {
    if (confirm("Are you sure you want to delete")) {
      this.deleteitem(index);
    }
  }
  deleteitem(index) {
    this.savedData.splice(index, 1);
    localStorage.setItem("myFormData", JSON.stringify(this.savedData));
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
      /* #myTable{
        background-color:black;

      } */

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
        color: #fbfcfc;
        width: 85px;
        margin-left: 35px;
        padding: 2px 16px;
        border-radius: 0.7rem;
        background-image: linear-gradient(Black, blue);
        /* background-color:#080808; */
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
        color: #f6fcfb;
        padding: 2px 16px;
        border-radius: 0.6rem;
        /* background-image: linear-gradient(orange, pink); */
        /* background-color:#0a0a0a; */
        background-image: linear-gradient(Black, blue);
        box-shadow: 0px 1px 6px 0px rgb(158, 129, 254);
        transform: translate(0, -3px);
        transition: 0.2s;
        transition-timing-function: linear;
      }
      .delete:active {
        transform: translate(0, 0);
        border-bottom: 2px solid rgb(50, 50, 50);
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
        background-color: #c18deb;
      }
      tr:hover {
        background-color: #72d35550;
      }
      tr:nth-child(even) {
        background-color: #e6eaf0;
      }

      .btn-sort {
        margin-top: 1.5px;
        align-items: center;
        background-color: #3e337c;
        border: 0px solid #111;
        border-radius: 8px;
        box-sizing: border-box;
        color: #f3f0f0;
        cursor: pointer;
        display: flex;
        font-family: Inter, sans-serif;
        font-size: 16px;
        height: 38px;
        justify-content: center;
        line-height: 24px;
        max-width: 80%;
        padding: 0 25px;
        position: absolute;
        text-align: center;
        text-decoration: none;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
      }
      .btn-sort:after {
        background-color: #111;
        border-radius: 8px;
        content: "";
        display: block;
        height: 38px;
        left: 0;
        width: 100%;
        position: absolute;
        top: -2px;
        transform: translate(8px, 8px);
        transition: transform 0.2s ease-out;
        z-index: -1;
      }

      .btn-sort:hover:after {
        transform: translate(0, 0);
      }

      .btn-sort:active {
        /* background-color: #ffdeda; */
        background-color: #3e337c;
        outline: 0;
      }
      .btn-sort :hover {
        outline: 0;
      }
      @media (min-width: 768px) {
        .btn-sort {
          padding: 0 40px;
        }
      }
      .btn {
        border-radius: 100px;
        box-shadow: rgba(44, 187, 99, 0.2) 0 -25px 18px -14px inset,
          rgba(44, 187, 99, 0.15) 0 1px 2px, rgba(44, 187, 99, 0.15) 0 2px 4px,
          rgba(44, 187, 99, 0.15) 0 4px 8px, rgba(44, 187, 99, 0.15) 0 8px 16px,
          rgba(44, 187, 99, 0.15) 0 16px 32px;
        color: green;
        /* cursor: pointer; */
        display: inline-block;

        padding: 7px 20px;
        text-align: center;
        text-decoration: none;
        transition: all 250ms;
        border: 0;
        font-size: 16px;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        font-weight: bold;

        font-family: "Mulish", sans-serif;
        width: 75%;
        margin-left: 47px;
        margin-top: 10px;
      }
      .btn:hover {
        background: linear-gradient(to right, #e689e1, #31e482);
      }
      #popUpForm {
        border: none;
        outline: none;
        width: 70%;
        height: 70%;
        padding: 0px;
      }
    `;
  }
}
window.customElements.define("data-store", Userdata);
