import React from "react";
import ReactDOM from "react-dom";
import Link from "@material-ui/core/Link";
import { useState, useEffect } from "react";
import { Link as RouterLink, useParams, useHistory } from "react-router-dom";

import {
  apiLogin,
  apiNecesitoLoginP,
  fetchConToken,
  usuarioLeer,
	tokenBorrar
} from "./services/pa-api";

import reportWebVitals from "./reportWebVitals";

import "./index.css";

import AppBar from "./components/AppMenuYMarco";

import Login from "./pages/Login/Login";
import QueHago from "./pages/QueHago";
import Charla from "./pages/Charla";

import InboxIcon from "@material-ui/icons/MoveToInbox";
import Badge from "@material-ui/core/Badge";

const Rutas = [
  {
    path: "/",
    dsc: "Inicio",
    exact: true,
    main: () => (
      <>
        <h2>Home</h2>
        Podes ir a{" "}
        <Link component={RouterLink} to="/que-hago">
          ¿Qué hago?
        </Link>
        Podes ir a{" "}
        <Link component={RouterLink} to="/charla/bandadjango">
          #bandadjango
        </Link>
      </>
    ),
  },
	{
		path: "/login",
		dsc: "Login",
		main: () => <Login/>,
	},
  {
    path: "/logout",
    dsc: "Logout",
 		main: () => {
      const LogOut = () => {
        console.log("Logout");
        //VER: https://reactrouter.com/web/api/history
        const history = useHistory();
        useEffect(() => {
          console.log("Logout useEffect");

          tokenBorrar(); //A: Borramos los tokens
          //history.replace("/");
          console.log("Logout useEffect DONE");
        });

        return <h1>LogOut</h1>;
			};
			return <LogOut />
    },
	},
 /*   main: () => {
			console.log("Logout");

			const componente= () => {
				console.log("Logout componente");
				const history= useHistory();
				
				useEffect(() => {
					console.log("Logout Effect");
					history.replace('/');
				});

				return <h2>Ya no estas logueado</h2>
			};

			return <componente />
		},
  },
*/
	{
    path: "/como-voy",
    dsc: "¿Cómo voy?",
    main: () => <h2>Bubblegum</h2>,
  },
  {
    path: "/que-hago",
    dsc: "¿Qué hago?",
    main: () => <QueHago />,
    icono: (
      <Badge badgeContent={4} color="primary">
        <InboxIcon />
      </Badge>
    ),
  },
  {
    path: "/charla/:charlaid",
    dsc: "Charlas",
    main: () => <Charla />,
  },
];

const NECESITA_LOGIN = {};

export default function App() {
	return <AppBar rutas={Rutas} />;
}
