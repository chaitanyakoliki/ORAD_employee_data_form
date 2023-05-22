import { LitElement, css, html } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { designation } from "./assets/designation";
import { department } from "./assets/department";
import { city } from "./assets/city";
import { state } from "./assets/state";
import { country } from "./assets/country";


export class MyElement extends LitElement {
  static get properties() {
    return {
      empForm: { type: Object },
      empDataForm:{type:Array},
    };
  }
  //==============================================================

  constructor() {
    super();
    this.empForm = {
      name: { value: "", isValidName: false, errorMessage: "" },
      empCode: { value: "", isValidName: false, errorMessage: "" },
      email:{value:"",isValidName:true},
      phone: { value: "", isValidName: true },
      address: { value: "", isValidName: false, errorMessage: "" },
      address1: { value: "", isValidName: true },
      landmark: { value: "", isValidName: false, errorMessage: "" },
      zipcode: { value: "", isValidName: false, errorMessage: "" },
      designation: { value: "", isValidName: false,errorMessage: ""  },
      department: { value: "", isValidName: false,errorMessage: "" },
      country: { value: "", isValidName:false,errorMessage: "" },
      city: { value: "", isValidName:false,errorMessage: "" },
      state: { value: "", isValidName:false,errorMessage: "" },
    };


    this.empDataForm=[];
  }

  //=====================================================================

  static get styles() {
    return css`
    #bod{
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      box-sizing:border box;
      animation: animate 20s ease infinite;
      background-image: url("src/bg1bg1.jpg"); 
      margin:2px; 
      margin-left:5px;
      margin-right:5px;

      
      
    }
     
    .header h2{
     
      font-family: Georgia, serif;
      font-size:30px;
      text-transform:uppercase;
      text-align:center;
      /* background: -webkit-linear-gradient(#6a11cb, #2575fc );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent; */
    }
    .header {
      padding:10px 0;
      background-image: linear-gradient(120deg, #0bdb58 0%, #0f9ee6 100%);
    }
    .container{
     background-color: #fff;
     /* color:red; */
     border-radius:10px;
     -webkit-border-radius:10px;
     overflow:hidden;
     width:45%;
     margin:0px auto;
     background-color:#e2ecd5;
     box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
     
    }
    .form{
      padding: 12px;
    }
    .form-control{
      margin-bottom:10px;
      position:relative;
      
    }
    .form-control label{
      display:block;
      margin-bottom:5px;
      font-weight:bold;
      font-family: Georgia, serif;
      font-size:17px;
      padding:2px;
    }
    .form-control input{
      width:100%
      border:2px solid #f0f0f0
      border-radius:5px;
      display:block;
      font-family: 'Mulish', sans-serif;
      font-size:14px;
      padding:10px;
    }
    .form-control input:focus{
      outline:0;
      border-color:#777
    }
    .form .btn {
     
      border-radius: 100px;
      box-shadow: rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px;
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
      font-weight:bold;
      
      font-family: 'Mulish', sans-serif;
      width:75%;

    }
    .form .btn:hover{
      
       background:linear-gradient(to right,#e689e1,	#31e482); 
    }
  
    #display{
      color:red;
    }
    input{
      width:96.5%;
      padding: 7px 20px;
      box-shadow: rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px;
    }
    #country,#state,#city,#department,#designation{
      width:101%;
      height:35px; 
      box-shadow: rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px;
    }
    select{
      border:2px solid #f0f0f0
      border-radius:5px;
    }
    select input:focus{
      outline:0;
      border-color:#1e1e1e
    }
    a{
      align-items:center;
      justify-content:center;
      display:flex;
    }
`;
  }
  //=================================================================
  render() {
    return html`
      <div id="bod">
        <div class="container">
          <div class="header">
            <h2>EMPLOYEE  DATA FORM</h2>
          </div>
          
          <form @submit=${this.submit} class="form">
          
            <div class="form-control">
              <label for="name-input"> EmpName:</label>
              <input
                type="text"
                id="name-input"
                required
                autocomplete="off"
                placeholder="Enter your Fullname "
                @input=${(e) => this.validateForm(e, "empName")}
                style=${this.empForm.name?.errorMessage
                  ? "border: solid 1px red;"
                  : "height:13px;"}
              />
              <p id="display">${this.empForm.name.errorMessage}</p>
            </div>
            <!---------------------------------------->

            <div class="form-control">
              <label for="empcode-input">EmpCode:</label>
              <input
                id="empcode-input"
                required
                placeholder="Enter your Employee code"
                @input=${(e) => this.validateForm(e, "empCode")}
                style=${this.empForm.empCode?.errorMessage
                  ? "border: solid 1px red;"
                  : "height:13px;"}
              />
              <p id="display">${this.empForm.empCode.errorMessage}</p>
            </div>
            <!----------------------------------------------------->
            <div class="form-control">
              <label>Email:</label>
              <input
                id="email"
                placeholder="Enter your mail id"
                autocomplete="off"
                @input=${(e) => this.validateForm(e, "Email")}
                style=${this.empForm.email?.errorMessage
                  ? "border: solid 1px red;"
                  : "height:13px;"}
              />
              <p id="display">${this.empForm.email.errorMessage}</p>
            </div>
            <!-------------------------------------------->
            <div class="form-control">
              <label>Phone Num:</label>
              <input
                id="phone"
                placeholder="phone"
                autocomplete="off"
                @input=${(e) => this.validateForm(e, "Phone")}
                style=${this.empForm.phone?.errorMessage
                  ? "border: solid 1px red;"
                  : "height:13px;"}
              />
              <p id="display">${this.empForm.phone.errorMessage}</p>
            </div>
          

            <!------------------------------------------->

            <!-------------------------------------------------->

            <div class="form-control">
              <label>Designation:</label>
              <select
                id="designation"
                required
                Select your option
                @input=${(e) => this.validateForm(e, "designation")}
                style=${this.empForm.designation?.errorMessage
                  ? "border: solid 1px red;"
                  : ""}
              >
                ${repeat(designation, (e) => html` <option>${e}</option>`)}
              </select>
              <p id="display">${this.empForm.designation.errorMessage}</p>
            </div>
            <!--------------------------------------------------->

            <div class="form-control">
              <label>Department:</label>
              <select
                id="department"
                required
                @input=${(e) => this.validateForm(e, "department")}
                style=${this.empForm.department?.errorMessage
                  ? "border: solid 1px red;"
                  : ""}
              >
                ${repeat(department, (e) => html`<option>${e}</option>`)}
              </select>
              <p id="display">${this.empForm.department.errorMessage}</p>
            </div>
          
            <!----------------------------------------------------->

            <div class="form-control">
              <label>Address line 1:</label>
              <input
                id="adline1"
                placeholder="Enter your Address"
                required
                autocomplete="off"
                @input=${(e) => this.validateForm(e, "addressLine1")}
                style=${this.empForm.address?.errorMessage
                  ? "border: solid 1px red;"
                  : "height:13px;"}
              />
            </div>
            <!-------------------------------------------------------->
            <div class="form-control">
              <label>Address line 2:</label>
              <input
                id="adline2"
                placeholder="optional"
                autocomplete="off"
                @input=${(e) => this.validateForm(e, "addressLine2")}
                style=${this.empForm.address?.errorMessage
                  ? "border: solid 1px red;"
                  : "height:13px;"}
              />
              <p id="display">${this.empForm.address.errorMessage}</p>
            </div>
            <!----------------------------------------------------------->

            <div class="form-control">
              <label>Landmark</label>
              <input
                id="landmark"
                required
                type="text"
                placeholder="Enter your Landmark"
                @input=${(e) => this.validateForm(e, "landmark")}
                style=${this.empForm.landmark?.errorMessage
                  ? "border: solid 1px red;"
                  : "height:13px;"}
              />
              <p id="display">${this.empForm.landmark.errorMessage}</p>
            </div>
            <!-------------------------------------------------------->

            <div class="form-control">
              <label>Country</label>
              <select
                id="country"
                required
                @input=${(e) => this.validateForm(e, "country")}
                style=${this.empForm.country?.errorMessage
                  ? "border: solid 1px red;"
                  : ""}
              >
                ${repeat(country, (e) => html` <option>${e}</option>`)}
              </select>
              <p id="display">${this.empForm.country.errorMessage}</p>
            </div>
            <!----------------------------------------------->
            <div class="form-control">
              <label>State:</label>
              <select
                id="state"
                required
                @input=${(e) => this.validateForm(e, "state")}
                style=${this.empForm.state?.errorMessage
                  ? "border: solid 1px red;"
                  : ""}
              >
                ${repeat(state, (e) => html` <option>${e}</option>`)}
              </select>
              <p id="display">${this.empForm.state.errorMessage}</p>
            </div>
            <!------------------------------------------->

            <div class="form-control">
              <label>City:</label>
              <select
                id="city"
                required
                @input=${(e) => this.validateForm(e, "city")}
                style=${this.empForm.city?.errorMessage
                  ? "border: solid 1px red;"
                  : ""}
              >
                ${repeat(city, (e) => html` <option>${e}</option>`)}
              </select>
              <p id="display">${this.empForm.city.errorMessage}</p>
            </div>
            <!------------------------------------------>

            <div class="form-control">
              <label>Zip Code:</label>
              <input
                type="Number"
                id="zip"
                required
                placeholder="Enter your pincode"
                autocomplete="off"
                @input=${(e) => this.validateForm(e, "zipCode")}
                style=${this.empForm.zipcode?.errorMessage
                  ? "border: solid 1px red;"
                  : "height:13px;"}
              />
              <p id="display">${this.empForm.zipcode.errorMessage}</p>
            </div>

            <center><button type="submit" class="btn">Submit</button></center>
          
          </form>
        </div>
      </div>
    `;
  }
  //===================================================================

  
  //===============================================================

  validateForm(e, type) {
    switch (type) {
      case "empName": {
        //value will be restored in the begining when entered to json
        this.empForm = {
          ...this.empForm,
          name: {
            value: `${e.target.value} `,
            isValidName: false,
          },
        };

        if (this.empForm.name.value.length > 7) {
          console.log(this.empForm.name);
          this.empForm = {
            ...this.empForm,
            name: {
              value: `${e.target.value} `,
              isValidName: false,
              errorMessage: "Username can't exceed 7 characters",
            },
          };
        } else {
          this.empForm = {
            ...this.empForm,
            name: {
              value: `${e.target.value} `,
              isValidName: true,
              errorMessage: "",
            },
          };
          console.log(this.empForm.name);
        }
        break;
      }
      //=================================================

      case "empCode": {
        this.empForm = {
          ...this.empForm,
          empCode: {
            value: `${e.target.value} `,
            isValidName: false,
            errorMessage: "",
          },
        };

        if (this.empForm.empCode.value.length > 8) {
          this.empForm = {
            ...this.empForm,
            empCode: {
              value: `${e.target.value} `,
              isValidName: false,
              errorMessage: "Maximum length exceeded",
            },
          };
        } else if (
          (this.empForm.empCode.value.length == 8 &&
            this.empForm.empCode.value.match(/[0-9]{6}[A-Z]/)) ||
          this.empForm.empCode.value.match(/[0-9]{5}[A-Z][0-9]/) ||
          this.empForm.empCode.value.match(/[0-9]{4}[A-Z][0-9]{2}/) ||
          this.empForm.empCode.value.match(/[0-9]{3}[A-Z][0-9]{3}/) ||
          this.empForm.empCode.value.match(/[0-9]{2}[A-Z][0-9]{4}/) ||
          this.empForm.empCode.value.match(/[0-9][A-Z][0-9]{5}/) ||
          this.empForm.empCode.value.match(/[A-Z][0-9]{6}/)
        ) {
          // console.log(this.empForm.email);
          this.empForm = {
            ...this.empForm,
            empCode: {
              value: `${e.target.value}`,
              isValidName: true,
              errorMessage: "",
            },
          };
        } else {
          this.empForm = {
            ...this.empForm,
            empCode: {
              value: `${e.target.value} `,
              isValidName: false,
              errorMessage: "Enter Valid Emp Code",
            },
          };
          // console.log(this.empForm.empCode);
        }
        break;
      }
      //===================================================
      case "Email": {
        this.empForm = {
          ...this.empForm,
          email: {
            value: `${e.target.value} `,
          },
        };
        break;
      }
      //=========================================================================
      case "Phone": {
        this.empForm = {
          ...this.empForm,
          phone: {
            value: `${e.target.value} `,
          },
        };
        break;
      }

      //=============================================

      
      //========================================

      case "designation": {
        this.empForm = {
          ...this.empForm,
          designation: {
            value: `${e.target.value} `,
          },
        };
        const designationFormat = /--Select Your Designation--/;
        if (
          this.empForm.designation.value.match(designationFormat)
        ) {
          this.empForm = {
            ...this.empForm,
            designation: {
              value: "",
              isValidName: false,
              errorMessage: "Enter valid Designation name",
            },
          };
        } else{
          this.empForm = {
            ...this.empForm,
            designation: {
              value: `${e.target.value}`,
              isValidName: true,
              errorMessage: "",
            },
          };
        }
        break;
      }
      //==========================================

      case "department": {
        this.empForm = {
          ...this.empForm,
          department: {
            value: `${e.target.value} `,
          },
        };
        const departmentFormat = /--Select Your Department--/;
        if (
          this.empForm.department.value.match(departmentFormat)
        ) {
          this.empForm = {
            ...this.empForm,
            department: {
              value: "",
              isValidName: false,
              errorMessage: "Enter valid department name",
            },
          };
        } else{
          this.empForm = {
            ...this.empForm,
            department: {
              value: `${e.target.value}`,
              isValidName: true,
              errorMessage: "",
            },
          };
        }
        break;
      }
      //====================================================

      case "addressLine1":
        {
          this.empForm = {
            ...this.empForm,
            address: {
              value: `${e.target.value}`,
            },
          };
        }
        if (
          this.empForm.address.value === "" ||
          this.empForm.address.value.length > 80
        ) {
          // console.log(this.empForm.address);
          this.empForm = {
            ...this.empForm,
            address: {
              value: `${e.target.value} `,
              isValidName: false,
              errorMessage: "Please enter a valid Address",
            },
          };
        } else {
          this.empForm = {
            ...this.empForm,
            address: {
              value: `${e.target.value} `,
              isValidName: true,
              errorMessage: "",
            },
          };
          // console.log(this.empForm.address);
          break;
        }
        //=========================================================

      case "addressLine2": {
        this.empForm = {
          ...this.empForm,
          address1: {
            value: `Optional Address:${e.target.value} `,
          },
        };
        break;
      }
      //================================================

      case "landmark":
        {
          this.empForm = {
            ...this.empForm,
            landmark: {
              value: `${e.target.value}`,
            },
          };
        }
        if (
          this.empForm.landmark.value === "" ||
          this.empForm.landmark.value.length > 50
        ) {
          // console.log(this.empForm.landmark);
          this.empForm = {
            ...this.empForm,
            landmark: {
              value: `${e.target.value} `,
              isValidName: false,
              errorMessage: "Please enter a valid Landmark",
            },
          };
        } else {
          this.empForm = {
            ...this.empForm,
            landmark: {
              value: `${e.target.value} `,
              isValidName: true,
              errorMessage: "",
            },
          };
          // console.log(this.empForm.landmark);
          break;
        }
        //======================================================

      case "country": {
        this.empForm = {
          ...this.empForm,
          country: {
            value: `${e.target.value} `,
          },
        };
        const countryFormat = /--Select Your Country--/;
        if (
          this.empForm.country.value.match(countryFormat)
        ) {
          this.empForm = {
            ...this.empForm,
            country: {
              value: "",
              isValidName: false,
              errorMessage: "Invalid country name",
            },
          };
        } else{
          this.empForm = {
            ...this.empForm,
            country: {
              value: `${e.target.value}`,
              isValidName: true,
              errorMessage: "",
            },
          };
        }
        break;
      }
      //======================================================

      case "state": {
        this.empForm = {
          ...this.empForm,
          state: {
            value: `${e.target.value} `,
          },
        };
        const stateFormat = /--Select Your State--/;
        if (
          this.empForm.state.value.match(stateFormat)
        ) {
          this.empForm = {
            ...this.empForm,
            state: {
              value: "",
              isValidName: false,
              errorMessage: "Enter valid State name",
            },
          };
        } else{
          this.empForm = {
            ...this.empForm,
            state: {
              value: `${e.target.value}`,
              isValidName: true,
              errorMessage: "",
            },
          };
        }
        break;
      }
      //=======================================================


      case "city": {
        this.empForm = {
          ...this.empForm,
          city: {
            value: `${e.target.value} `,
          },
        };
        const cityFormat = /--Select Your City--/;
        if (
          this.empForm.city.value.match(cityFormat)
        ) {
          this.empForm = {
            ...this.empForm,
            city: {
              value: "",
              isValidName: false,
              errorMessage: "Enter valid City name",
            },
          };
        } else{
          this.empForm = {
            ...this.empForm,
            city: {
              value: `${e.target.value}`,
              isValidName: true,
              errorMessage: "",
            },
          };
        }
        break;
      }
      //===================================================

      case "zipCode": {
          this.empForm = {
            ...this.empForm,
            zipcode: {
              value: `${e.target.value}`,
            },
          };
        if (
          this.empForm.zipcode.value.length == 6 &&
          this.empForm.zipcode.value.length <= 8
        ) {
          // console.log(this.empForm.zipcode);
          this.empForm = {
            ...this.empForm,
            zipcode: {
              value: `${e.target.value} `,
              isValidName: true,
              errorMessage: "",
            },
          };
        } else {
          this.empForm = {
            ...this.empForm,
            zipcode: {
              value: `${e.target.value} `,
              isValidName: false,
              errorMessage: "please enter a valid Zip Code",
            },
          };
          break;
        }
      }
    }
  }

  submit(e) {
    e.preventDefault();
    if (
      this.empForm.name.isValidName === true &&
      this.empForm.empCode.isValidName === true &&
      // this.empForm.phone.isValidName==true&&
      this.empForm.department.isValidName === true &&
      this.empForm.address.isValidName === true &&
      this.empForm.landmark.isValidName === true &&
      this.empForm.zipcode.isValidName === true
    ) {
      let empdata = {
        name: this.empForm.name.value,
        empCode: this.empForm.empCode.value,
        email:this.empForm.email.value,
        phone: this.empForm.phone.value,
        designation: this.empForm.designation.value,
        department: this.empForm.department.value,
        address: this.empForm.address.value,
        address1: this.empForm.address1.value,
        landmark: this.empForm.landmark.value,
        country: this.empForm.country.value,
        state: this.empForm.state.value,
        city: this.empForm.city.value,
        zipcode: this.empForm.zipcode.value,
      };
      this.empDataForm.push(empdata);
      const form = this.renderRoot.querySelector("form");
      localStorage.setItem("myFormData", JSON.stringify(this.empForm));
      localStorage.setItem("myFormData", JSON.stringify(this.empDataForm));
     
      form.reset();
      alert("Your response wes submitted");
    }
  }
}
window.customElements.define("my-element", MyElement);