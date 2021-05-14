//INFO: punto de entrada principal a la App, mantenerlo limpio, tiene que servir de indice

import Link from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import { ProvideServidorPodemosAprender} from './contexts/ServidorPodemosAprender';

import "./index.css";

import AppMenuYMarco from "./components/AppMenuYMarco";

import Login from "./pages/Login/Login";
import QueHago from "./pages/QueHago";
import Charla from "./pages/Charla";

import InboxIcon from "@material-ui/icons/MoveToInbox";
import Badge from "@material-ui/core/Badge";

const MenuYRutas = [
  {
    path: "/",
    dsc: "Inicio",
    exact: true,
    pagina: () => (
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
		necesitaLogin: false,
		pagina: () => <Login/>,
	},
	{
    path: "/como-voy",
    dsc: "¿Cómo voy?",
    pagina: () => <h2>Bubblegum</h2>,
  },
  {
    path: "/que-hago",
    dsc: "¿Qué hago?",
    pagina: () => <QueHago />,
    icono: (
      <Badge badgeContent={4} color="primary">
        <InboxIcon />
      </Badge>
    ),
  },
  {
    path: "/charla/:charlaid",
    dsc: "Charlas",
    pagina: () => <Charla />,
  },
	{ divisor: true },
  {
    dsc: "Logout",
		accion: (contexto) => { contexto.logout() }
	},
];

export default function App() {
	return (
    <ProvideServidorPodemosAprender>
			<AppMenuYMarco menu_y_rutas={MenuYRutas} />;
    </ProvideServidorPodemosAprender>
	)
}
