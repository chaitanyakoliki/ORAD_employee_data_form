import { LitElement, html } from "lit";

class EmployeeForm extends LitElement {
  static get properties() {
    return {
      empForm: { type: Object },

    };
  }

  constructor() {
    super();
    this.empForm = {
      name: { value: "", isValidName: false, errorMessage: "" },
      empCode: { value: "", isValidName: false, errorMessage: "" },
      email: { value: "", isValidName: false, errorMessage: "" },
      phone: { value: "", isValidName: false, errorMessage: "" },
      AddressLine1: { value: "", isValidName: false, errorMessage: "" },
      zip: { value: "", isValidName: false, errorMessage: "" },
    
    };
  }

  render() {
    return html`
      <center><div class="container1" style="background-color:#797373" >
      <h1 style=color:orange >Employee-Dataform </h1></div></center>
      <div class="container"  style="background-color:#c5bdbd" margin:10px>
        <label >
          Name:<input 
            type="text"
            id="name-input"
            @input=${(e) => this.validateForm(e, "empName")}
            required
            maxlength="40"
            pattern="[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*"
            style=${
              this.empForm.name?.errorMessage
                ? "border: solid 1px red"
                : "height:20px "
            }
          />
          <span>${this.empForm.name?.errorMessage || ""}</span></label
        ><br />

        <label>
          Code:<input
            type="text"
            id="empcode-input"
            @input=${(e) => this.validateForm(e, "empCode")}
            required
            pattern="/^([A-Za-z]d{6})$/;"
            style=${
              this.empForm.empCode?.errorMessage
                ? "border: solid 1px red"
                : "height:20px "
            }
          />
          <span>${this.empForm.empCode?.errorMessage || ""}</span></label
        ><br />

        <label>
          Eamil:<input type="text" id="email-input" required
          pattern=/^[^s@]+@[^s@]+.[^s@]+$/;
          @input=${(e) => this.validateForm(e, "empEmail")}
          style=${
            this.empForm.empEmail?.errorMessage
              ? "border:solid 1px red"
              : "height:20px "
          }
          />
          <span>${this.empForm.email?.errorMessage || ""}</span
        ></label>
          
          <br />

          <label>
              Designation:
              <select
                name="Designation"
                @input=${(e) => this.validateForm(e, "Designation")}
                style=${
                  this.empForm.Designation?.errorMessage
                    ? "border:solid 1px red"
                    : "height:25px "
                }
              >
                <option value="">--Please select--</option>
                <option value="Trainee Engineer">Trainee Engineer</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Programmer Analyst">Programmer Analyst</option>
                <option value="Senior Software Engineer">
                  Senior Software Engineer
                </option>
                <option value="System Analyst">System Analyst</option>
                <option value="Project Lead">Project Lead</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Program Manager">Program Manager</option>
              </select> </label
            ><br />

          <label>
              Department:
              <select
                name="Department"
                @input=${(e) => this.validateForm(e, "Designation")}
                style=${
                  this.empForm.Designation?.errorMessage
                    ? "border:solid 1px red"
                    : "height:25px "
                }
              >
                <option value="">--Please select--</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="IT">IT</option>
              </select> </label
            ><br />

            <label>
              Primary Phone:<input
                type="text"
                id="phone-input"
                @input=${(e) => this.validateForm(e, "phoneNumber")}
                style=${
                  this.empForm.phone?.errorMessage
                    ? "border:solid 1px red"
                    : "height:20px "
                }
              />
              <span>${this.empForm.phone?.errorMessage || ""}</span
              ><label>
                <br />

                <label>
                  Secondary Phone:<input
                    type="text"
                    id="phone-input"
                    @input=${(e) => this.validateForm(e, "phoneNumber")}
                    style=${
                      this.empForm.phone?.errorMessage
                        ? "border:solid 1px red"
                        : "height:20px "
                    }
                  />
                  <span>${this.empForm.phone?.errorMessage || ""}</span
                  ><label>
                    <br />
                    <br />
                    <label>
                      Address Line 1 :<input
                        type="text"
                        id="AddressLine1 -input"
                        @input=${(e) => this.validateForm(e, "AddressLine1")}
                        required
                        maxlength="80"
                        style=${
                          this.empForm.AddressLine1?.errorMessage
                            ? "border: solid 1px red"
                            : "height:20px "
                        }
                      />
                      <span
                        >${this.empForm.AddressLine1?.errorMessage || ""}</span
                      ></label
                    ><br />
                    <label>
                      Zip:<input
                        type="text" 
                        id="zip-input"
                        @input=${(e) => this.validateForm(e, "Zip")}
                        
                        
                        style=${
                          this.empForm.zip?.errorMessage
                            ? "border: solid 1px red"
                            : "height:20px "
                        }
                      />
                      <span
                        >${this.empForm.zip.errorMessage || ""}</span
                      ></label
                    ><br />

                    <label>
                      Address Line 2 :<input
                        type="text" placeholder="(Optional)"
                        id="AddressLine2 -input"
                        @input=${(e) => this.validateForm(e, "AddressLine2")}
                        
                        required
                        maxlength="80" 
                        style=${
                          this.empForm.AddressLine2?.errorMessage
                            ? "border: solid 1px red"
                            : "height:20px "
                        }
                      />
                      <span
                        >${this.empForm.AddressLine2?.errorMessage || ""}</span
                      ></label
                    ><br />

                   


                    <center>
                      <button @click=${
                        this.click
                      } style="back-groundcolor: blue">Submit</button>
                    </center>
                 
           
      </div></center>
    `;
  }
  click() {
    // console.log(this.empForm.name.value);
    // console.log(this.empForm.empCode.value);
    // console.log(this.empForm.empEmail.value);
    alert("Your responenns was submited");
  }
  validateForm(e, type) {
    switch (type) {
      case "empName": {
        // console.log(this.empForm.name.isValidName);
        if (
          this.empForm.name.value === "" ||
          this.empForm.name.value.length > 40
        ) {
          const newName = {
            value: `${e.target.value}`,
            isValidName: false,
            errorMessage: "Please enter a valid emp name" ,
          };
          // console.log(this.empForm.name.errorMessage);
          this.empForm = {
            ...this.empForm,
            name: newName,
          };
          console.log(this.empForm.name.value.errorMessage);
        } else {
          this.empForm = {
            ...this.empForm,
            name: {
              value: `${e.target.value}`,
              isValidName: true,
              errorMessage: "",
            },
          };
        }
      }

      //  else {
      //       this.empForm.name = { value: `${e.target.value}`, isValidName: true, errorMessage: '' }};

      case "empCode": {
        // console.log(this.empForm.name.isValidName);
        if (
          this.empForm.empCode.value === "" ||
          this.empForm.empCode.value.length > 5
        ) {
          const newempCode = {
            value: `${e.target.value}`,
            isValidName: false,
            errorMessage: "Please enter a valid emp Emp Code",
          };
          // console.log(this.empForm.name.errorMessage);
          this.empForm = {
            ...this.empForm,
            empCode: newempCode,
          };
          console.log(this.empForm.empCode.value.errorMessage);
        } else {
          this.empForm = {
            ...this.empForm,
            empCode: {
              value: `${e.target.value}`,
              isValidName: true,
              errorMessage: "",
            },
          };
        }
      }

      case "empEmail": {
        if (
          this.empForm.email.value === "" ||
          this.empForm.email.value.length > 13
        ) {
          const newemail = {
            value: `${e.target.value}`,
            isValidName: false,
            errorMessage: "Please enter a valid Email",
          };
          // console.log(this.empForm.name.errorMessage);
          this.empForm = {
            ...this.empForm,
            email: newemail,
          };
          console.log(this.empForm.email.value.errorMessage);
        } else {
          this.empForm = {
            ...this.empForm,
            email: {
              value: `${e.target.value}`,
              isValidName: true,
              errorMessage: "",
            },
          };
        }
      }

      case "phoneNumber": {
        const phoneNumber = /^\d{10}$/;
        if (
          this.empForm.phone.value === "" ||
          this.empForm.phone.value.length > 10
        ) {
          const newphone = {
            value: `${e.target.value}`,
            isValidName: false,
            errorMessage: "Please enter a valid Phone number",
          };
          // console.log(this.empForm.name.errorMessage);
          this.empForm = {
            ...this.empForm,
            phone: newphone,
          };
          console.log(this.empForm.phone.value.errorMessage);
        } else {
          this.empForm = {
            ...this.empForm,
            phone: {
              value: `${e.target.value}`,
              isValidName: true,
              errorMessage: "",
            },
          };
        }
      }
      case "AddressLine1": {
        if (
          this.empForm.AddressLine1.value === "aa" ||
          this.empForm.AddressLine1.value.length > 80
        ) {
          const newAddressLine1 = {
            value: `${e.target.value}`,
            isValidName: false,
            errorMessage: "Address Line 1 is required",
          };
          // console.log(this.empForm.name.errorMessage);
          this.empForm = {
            ...this.empForm,
            AddressLine1: newAddressLine1,
          };
          console.log(this.empForm.AddressLine1.value.errorMessage);
        } else {
          this.empForm = {
            ...this.empForm,
            AddressLine1: {
              value: `${e.target.value}`,
              isValidName: true,
              errorMessage: "",
            },
          };
        }
      }
      case "Zip": {
        const Zip = /^\d{6}$/;
        if (
          this.empForm.zip.value === "" ||
          this.empForm.zip.value.length > 6
        ) {
          const newzip = {
            value: `${e.target.value}`,
            isValidName: false,
            errorMessage: "Please enter a valid Zip code",
          };
          // console.log(this.empForm.name.errorMessage);
          this.empForm = {
            ...this.empForm,
            zip: newzip,
          };
          console.log(this.empForm.zip.value.errorMessage);
        } else {
          this.empForm = {
            ...this.empForm,
            zip: {
              value: `${e.target.value}`,
              isValidName: true,
              errorMessage: "",
            },
          };
        }
      }
    }
  }
}

window.customElements.define("employee-form", EmployeeForm);
