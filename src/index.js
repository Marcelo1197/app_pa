//INFO: entrada a la aplicacion, solo cargar estilos, fonts, ...
import React from "react";
import ReactDOM from "react-dom";

import "@fontsource/roboto"; //VER: https://material-ui.com/components/typography/#general
import "./index.css";

import App from "./App";
//import App from "./ej/RutaRequiereLoginUnaVez"
//import App from "./ej/Contextos"
//import App from "./ej/ServidorPodemosAprender"
//import App from './ej/UiSpeedDial'

ReactDOM.render(<App />, document.getElementById("root"));

