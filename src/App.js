//INFO: punto de entrada principal a la App, mantenerlo limpio, tiene que servir de indice

import reportWebVitals from "./reportWebVitals";

import { ProvideServidorPodemosAprender} from './contexts/ServidorPodemosAprender';

import "./index.css";

import AppMenuYMarco from "./components/AppMenuYMarco";
import Login from './pages/Login/Login';

import Inicio from './pages/Inicio';
import QueHago from "./pages/QueHago";
import Charla from "./pages/Charla";

import InboxIcon from "@material-ui/icons/MoveToInbox";
import Badge from "@material-ui/core/Badge";

const MenuYRutas = [
	{
		path: '/login',
		pagina: Login,
		noNecesitaLogin: true,
		//A: sin descripcion no se muestra en el menu
	},
  {
    path: "/",
    dsc: "Inicio",
    pagina: Inicio,
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
		esPrefijo: true,
    dsc: "Charlas",
    pagina: Charla,
  },
	{ divisor: true },
  {
    dsc: "Logout",
		accion: (contexto) => { 
			console.log('Logout'); 
			contexto.logout(); 
		}
	},
];

export default function App() {
	return (
    <ProvideServidorPodemosAprender>
			<AppMenuYMarco menu_y_rutas={MenuYRutas} />;
    </ProvideServidorPodemosAprender>
	)
}
