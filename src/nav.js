import { LitElement, css, html } from "lit";

export class MyNav extends LitElement {
  render() {
    return html` <nav id="navbar">
      <ul>
        <div>
          <h1>
            <!--<img src="./src/logo.png">--><a href="index.html">Annalect</a>
          </h1>
        </div>

        <div id="nav">
          <a href="index.html">Home</a>
          <a href="data.html">Saved Data</a>
        </div>
      </ul>
    </nav>`;
  }
  static get styles() {
    return css`
      #navbar {
        background-image: url("src/bg5.jpg");
        /* background-color:#dbe2de; */
        /* background-color:var(--sl-color-neutral-600); */
        height: 60px;
        padding: 1px;
        width: 100%;
        margin-left: 0px;
        margin-right: 0px;
      }

      ul {
        list-style-type: none;
        display: flex;
      }
      a {
        text-decoration: none;
        font-family: Georgia, serif;
        float: right;
        margin: 10px;
        /* border: 2px solid blue; */
        padding: 2px;
        font-size: 19px;
        /* border-adius:5px; */
        color: #f3f2f5;
        font-weight: 500;
      }
      #nav {
        display: flex;
        position: absolute;
        right: 100px;
      }
      h1 {
        font-weight: 680;
        /* font-size: 1.75em; */
        line-height: 0.75em;

        font-family: Georgia, serif;
        margin: 0px;
        margin-bottom: 500px;
        font-size: 25px;
        margin-right: 200px;
      }
    `;
  }
}

window.customElements.define("nav-bar", MyNav);
