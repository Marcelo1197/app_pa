//INFO: punto de entrada principal a la App, mantenerlo limpio, tiene que servir de indice

import reportWebVitals from "./reportWebVitals";

import { ProvideServidorPodemosAprender} from './contexts/ServidorPodemosAprender';

import "./index.css";

import AppMenuYMarco from "./components/AppMenuYMarco";
import Login from './pages/Login/Login';

import Inicio from './pages/Inicio';
import QueHago from "./pages/QueHago";
import Charla from "./pages/Charla";
import Charlas from "./pages/Charlas";


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
    pagina: QueHago.PaginaQueHago,
    icono: <QueHago.IconoQueHago />,
  },
  {
    path: "/charla/:charlaid",
		esPrefijo: true,
    pagina: Charla,
  },
	{
    path: "/charla/",
		dsc: 'Charlas',
    pagina: Charlas,
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
