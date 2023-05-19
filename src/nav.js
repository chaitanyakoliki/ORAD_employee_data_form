import { LitElement, css, html } from 'lit'


export class MyNav extends LitElement {

    render() {
        return html`   
        <nav id="navbar">
            <ul>
                <!-- <img src="./src/assets/bg2.jpg"> -->
                <h1> Annalect</h1>
                
            <div id="nav">
                <a href="index.html">Home</a>
                <a href="data.html">Saved Data</a>
            </div>
            </ul>
    </nav>`
    }
    static get styles() {
        return css`
    #navbar{
        background-color:#f1f4f7;
        height:60px;
        padding:2px;
        width:100%

    }
    ul{
        list-style-type:none;
        display:flex;
    }
    a{
        text-decoration:none;
        font-family: Georgia, serif;
        float:right;
        margin:10px;
        /* border: 2px solid blue; */
        padding:2px;
        font-size:19px;
        /* border-adius:5px; */
    }
    #nav{
         display:flex;
        position: absolute;
        right: 100px;
       
    }
    h1{
        font-weight: 300;
       font-size: 1.75em;
       line-height: 0.75em; 
       color: $color-neutral-lt; 
       text-decoration-line:underline;
       text-decoration-style:double;
       font-family: Georgia, serif;
       margin:10px;
       
    }
   
    `
    }

}

window.customElements.define('nav-bar', MyNav)