import { LitElement, css, html, nothing } from "lit";
import { repeat } from "lit/directives/repeat.js";
import "./my-element";
import "@shoelace-style/shoelace/dist/themes/dark.css";
import "@shoelace-style/shoelace/dist/components/tooltip/tooltip.js";
import "@shoelace-style/shoelace/dist/components/dialog/dialog.js";
import "@shoelace-style/shoelace/dist/components/animation/animation.js";
import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import "@shoelace-style/shoelace/dist/components/details/details.js";
import "@shoelace-style/shoelace/dist/components/dialog/dialog.js";

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

  render() {
    return html`
    <div class="hi">
     
     
      <sl-button
          variant="text"
          size="large"
          
          class="btn-sort"
          
        > <a href="index.html">+New Entry</a>
          
        </sl-button>
        <div class="search">
          <form action="#">
            
            <sl-tooltip content="Type in a name.">
              <input
                type="text"
                id="nameFilter"
                @input=${this.filterByName}
                placeholder="Search for names.."
              >
            </sl-tooltip>
            
     
           
          </form>
          
        </div>
      
        <!------------------------------------------------->

        ${
          this.editData
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
            : nothing
        }
        <!--------------------------------------->
        <div class="koliki">
         <div id="h">
        <center><h3>sort  <sl-tooltip content="Sort by name."><sl-icon name="arrow-down-up"  @click=${
          this.sortitem
        }></sl-icon></sl-tooltip></h3></center>
      </div>
        ${repeat(
          this.savedData,
          (item, index) => html`
            <div class="wrapper">
              
              <div class="container">
                
                
                <div class="chaithu">
                
                <sl-tooltip class=".tooltip-text" content="Employee full details">
                
                  
                  <sl-details id="cool" summary="Name:  ${item.name}"> 
                  
                  
       
                   
                    
                    <div class="box">
                   
                    
                    <p>Emp code- ${item.empCode}</p>
                    <p>Email-${item.email}</p>
                    <p>Phone-${item.phone}</p>
                    <p>Designation-${item.designation}</p>
                    <p>Department-${item.department}</p>
                    <p>Address-${item.address},${item.address1}</p>
                    <p>Landmark-${item.landmark}</p>
                    <p>Country-${item.country}</p>
                    <p>State-${item.state}</p>
                    <p>City-${item.city}</p>
                    <p>Zip Code-${item.zipcode}</p>
                    <div class="btn-holder">
                    <sl-tooltip  content="Edit Emp data"> 
                      <button
                        class="update"
                        @click=${() => this.updateitem(index)}
                      >
                        Update
                      </button>
        </sl-tooltip>
                      <sl-tooltip content="Delete Emp data"> 
                      <button
                        class="delete"
                        @click=${() => this.deletecondition(index)}
                      >
                        Delete
                      </button>
        </sl-tooltip>
        </sl-tooltip>
                      
                      
                     
                    </div>
                  </sl-details>
        </div>
                </div>
              </div>
           
          `
        )}
        </div>
      </div>
        </div>
        </div>
    `;
  }
  //==================================================
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
  //=========================================
  filterByName(e) {
    e.preventDefault();
    const filterValue = e.target.value.toLowerCase();
    this.savedData = JSON.parse(localStorage.getItem("myFormData")) || [];

    if (filterValue) {
      this.savedData = this.savedData.filter((item) =>
        item.name.toLowerCase().includes(filterValue)
      );
    }

    this.requestUpdate();
  }
  //===============================================
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
      .hi {
        background-image: url("src/bg5.jpg");
      }

      .head {
        position: static;

        box-shadow: rgba(0, 0, 0, 0.17) 0px -13px 15px 0px inset,
          rgba(0, 0, 0, 0.15) 0px -16px 10px 0px inset,
          rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
          rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
          rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
          rgba(0, 0, 0, 0.09) 0px 32px 16px;
      }
      #h {
        height: 30px;
        margin-right: 3800px;
        margin-left: 190px;
        margin-bottom: 0px;
        color: #ffff;
        background-color: #a51010;
        box-shadow: rgba(0, 0, 0, 0.17) 0px -13px 15px 0px inset,
          rgba(0, 0, 0, 0.15) 0px -16px 10px 0px inset,
          rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
          rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
          rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
          rgba(0, 0, 0, 0.09) 0px 32px 16px;
      }

      #nameFilter {
        background-repeat: no-repeat;
        width: 27%;
        font-size: 16px;
        padding: 12px 20px 12px 40px;
        border: 1px solid #ddd;

        margin-left: 880px;
        margin-top: 20px;
      }
      sl-button.btn-sort {
        align-items: center;
        background-color: #7edbe2;

        border: 0px solid #111;
        border-radius: 8px;

        box-sizing: border-box;

        cursor: pointer;
        display: flex;
        font-family: Inter, sans-serif;
        font-size: 26px;
        height: 38px;
        justify-content: center;
        line-height: 24px;
        margin-top: 70px;
        margin-right: 1099.9px;
        margin-left: 50px;
        width: 120px;
        padding: 0 25px;
        position: absolute;
        text-align: center;
        text-decoration: none;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
      }
      sl-button.btn-sort:after {
        /* background-color: #111; */
        background-color: #0a0a0a;
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

      sl-button.btn-sort:hover:after {
        transform: translate(0, 0);
      }

      sl-button.btn-sort:active {
        background-color: #ffdeda;

        outline: 0;
      }
      sl-button.btn-sort :hover {
        outline: 0;
      }
      @media (min-width: 768px) {
        sl-button.btn-sort {
          padding: 0 40px;
        }
      }
      sl-button.btn-sort {
      }
      .btn {
        border-radius: 100px;
        box-shadow: rgba(44, 187, 99, 0.2) 0 -25px 18px -14px inset,
          rgba(44, 187, 99, 0.15) 0 1px 2px, rgba(44, 187, 99, 0.15) 0 2px 4px,
          rgba(44, 187, 99, 0.15) 0 4px 8px, rgba(44, 187, 99, 0.15) 0 8px 16px,
          rgba(44, 187, 99, 0.15) 0 16px 32px;
        color: green;

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
      .chaithu {
        color: #07021a;
        width: 640px;
        margin-left: 230px;
        margin-top: 10px;
        box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px,
          rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px,
          rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px,
          rgba(0, 0, 0, 0.07) 0px 32px 64px;
        font-weight: bold;
      }
      #cool {
        font-size: 19px;
      }
      .koliki {
        background-image: url("src/bg5.jpg");
      }

      .update {
        margin-left: 65px;
        margin-top: 50px;
        height: 39px;
        width: 90px;
        font-size: 17px;
        color: #e9e7e7;
        padding: 2px 16px;
        border-radius: 0.6rem;
        background-color: Black;

        transform: translate(0, -3px);
        transition: 0.2s;
        transition-timing-function: linear;
      }
      .delete {
        margin-left: 35px;
        height: 39px;
        font-size: 17px;
        color: #faf7f6;
        padding: 2px 16px;
        border-radius: 0.6rem;
        background-color: Black;
        /* background-image: linear-gradient(Black, blue); */
        /* box-shadow: 0px 1px 6px 0px rgb(158, 129, 254); */
        transform: translate(0, -3px);
        transition: 0.2s;
        transition-timing-function: linear;
      }
      .delete:active {
        transform: translate(0, 0);
        border-bottom: 2px solid rgb(50, 50, 50);
      }
      //==============================
      p {
        font-weight: bold;
      }
      sl-button {
        background-color: #000;
      }
      .wrapper {
        display: inline-flex;
        /* background-color: #fff; */
      }
      .box {
        width: 400px;
        height: 450px;
        background-color: #fff;
        border-radius: 5px;
        padding: 60px;
        margin: 10px;
        margin-left: 50px;
        /* letter-spacing: 1px; */
        padding-top: 10px;
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        position: relative;
        font-size: 12px;
        font-weight: bold;
        z-index: 0;
      }
      .box h3 {
        font-size: 35px;
        padding: 20px 0;
        color: #444;
      }
      .box p {
        font-size: 18px;
        color: #faf7f7;
        /* font-family: "mulish", sans-serif; */
        font-family: Georgia, serif;
        display: flex;
        margin-left: -50px;
      }
      .btn-update {
        width: 100%;
        height: 40px;
        background-color: #333;
        color: #fff;
        border: none;
        outline: none;
        font-size: 17px;
        border-radius: 50px;
        margin-top: 45px;
        cursor: pointer;
        margin-left: 0px;
      }
      .btn-update:hover {
        letter-spacing: 2px;
        opacity: 0.8;
      }
      .btn-delete {
        height: 30px;
        background-color: #ffffff;
        border: none;
        outline: none;
        cursor: pointer;
        position: absolute;
        border-radius: 50px;
        top: 10px;
        left: 10px;
      }
      .box::before {
        width: 100%;
        height: 100%;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
      }
      .box::after {
        /* width: 100%;
        height: 100%; */
        width: 100%;
        height: 100%;
        /* background-color: #fbda61; */
        background-image: linear-gradient(45deg, #161616 0%, #4960a0 100%);
        /* background-image: linear-gradient(45deg, #19f03d 0%, #80016b 100%); */
        box-shadow: rgba(44, 187, 99, 0.2) 0 -25px 18px -14px inset,
          rgba(44, 187, 99, 0.15) 0 1px 2px, rgba(44, 187, 99, 0.15) 0 2px 4px,
          rgba(44, 187, 99, 0.15) 0 4px 8px, rgba(44, 187, 99, 0.15) 0 8px 16px,
          rgba(44, 187, 99, 0.15) 0 16px 32px;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        z-index: -2;
        /* clip-path: circle(40% at 80% -13%); */
        /* transition: 0.5s; */
      }
      .heade {
        position: absolute;
        /* position:static; */
        top: 15px;
        right: 30px;
        font-size: 30px;
        font-weight: bolder;
        color: #fff;
        font-family: "Montserrat", sans-serif;
      }
      .box:hover:after {
        clip-path: circle(100%);
      }
      .box:hover h3 {
        color: #fff;
      }
      .box:hover p {
        /* color: #fff; */
      }
      .box:hover .btn-update {
        color: #333;
        background-color: #fff;
      }
      .box:hover .btn-delete {
        color: #333;
        background-color: #fff;
      }
      .box:hover ::before {
        background-color: rgba(0, 0, 0, 0.1);
      }
      .btn-holder {
        display: block;
        margin-top: -40px;
      }
      .btn-sort {
        position: absolute;
        top: 17px;
        right: 10px;
      }

      #slogo {
        width: 20px;
        height: 30px;
        cursor: pointer;
      }
      .tooltip-text {
        font-size: 25px;
        position: absolute;
        right: 10%;
        top: 84%;
        color: #f7f2f2;
        border: 1px solid #0033ff;
        padding: 3px;
        background: #0033ff;
        visibility: hidden;
      }
      .btn-sort:hover .tooltip-text {
        visibility: visible;
      }
      #dlogo {
        width: 100%;
        height: 20px;
        cursor: pointer;
        background-position: fill;
      }
      .out {
        width: 100%;
        filter: blur(8px);
        -webkit-filter: blur(8px);
      }
      #popUpForm {
        border: none;
        outline: none;
        width: 70%;
        height: 70%;
        padding: 0px;
      }
      dialog::-webkit-scrollbar {
        width: 0.1px;
      }

      dialog::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      }

      dialog::-webkit-scrollbar-thumb {
        background-color: #ffffff;
        outline: 1px solid slategrey;
      }
      .btn-cancel {
        background: linear-gradient(to left, #74ebd5, #9face6);
        border-radius: 6px;
        border: none;
        outline: none;
        display: block;
        font-size: 16px;
        padding: 15px 0;
        margin-top: 20px;
        width: 101%;
        font-weight: bold;
        text-transform: uppercase;
        cursor: pointer;
        color: #000000;
        transition: all 1s ease;
      }
      .btn-cancel:hover {
        background: linear-gradient(to right, #74ebd5, #9face6);
      }
      #popUpForm::backdrop {
        background: #0b23a9;
        opacity: 0.6;
      }
      .header h2 {
        color: #222;
        font-family: "Montserrat", sans-serif;
        font-size: 20px;
        text-transform: uppercase;
        text-align: center;
      }
      .header {
        background: linear-gradient(to left, #74ebd5, #9face6);
        padding: 2px;
      }
      .container1 {
        background-color: #fff;
        border-radius: 10px;
        -webkit-border-radius: 10px;
        overflow: hidden;
        width: 100%;
        box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
          0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12;
        background: #e9f6f4;
        position: absolute;
        top: 0px;
        right: 0px;
      }
    `;
  }
}
window.customElements.define("user-data", Userdata);
