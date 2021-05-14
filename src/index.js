//INFO: entrada a la aplicacion, solo cargar estilos, fonts, ...
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import "@fontsource/roboto"; //VER: https://material-ui.com/components/typography/#general
import "./index.css";

//import App from "./App";
//import App from "./ej/RutaRequiereLoginUnaVez"
import App from "./ej/Contextos"

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
