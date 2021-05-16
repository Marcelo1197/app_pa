//INFO: punto de entrada principal a la App, mantenerlo limpio, tiene que servir de indice

import reportWebVitals from './reportWebVitals';

import { ProvideServidorPodemosAprender} from './contexts/ServidorPodemosAprender';

import './index.css';

import AppMenuYMarco from './components/AppMenuYMarco';
import Login from './pages/Login/Login';

import Inicio from './pages/Inicio';
import Textos from './pages/Textos';

import QueHago from './pages/QueHago';
import PaginaTexto from './pages/Texto';
import Charla from './pages/Charla';

import PaginaModoDesarrollo from './pages/ModoDesarrollo';

const MenuYRutas = [
	{
		path: '/login',
		pagina: Login,
		noNecesitaLogin: true,
		//A: sin descripcion no se muestra en el menu
	},
  {
    path: '/',
    dsc: 'Inicio',
    pagina: Inicio,
  },
	{
    path: '/como-voy',
    dsc: '¿Cómo voy?',
    pagina: () => <h2>Bubblegum</h2>,
  },
  {
    path: '/que-hago',
    dsc: '¿Qué hago?',
    pagina: QueHago.PaginaQueHago,
    icono: <QueHago.IconoQueHago />,
  },
  {
    path: '/texto/:textoid',
		esPrefijo: true,
    pagina: PaginaTexto,
  },
	{
    path: '/charla/:charlaid',
		esPrefijo: true,
    pagina: Charla,
  },
	{
    path: '/textos/',
		esPrefijo: true, //A: necesita para queryParams ej ?fecha_min=
		dsc: 'Textos',
    pagina: Textos,
  },

	{ divisor: true },
	{
    path: '/devel/',
		dsc: 'Modo  Desarrollo',
    pagina: PaginaModoDesarrollo,
		noNecesitaLogin: true,
  },

	{ divisor: true },
  {
    dsc: 'Logout',
		accion: (contexto) => { 
			//DBG: console.log('Logout'); 
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
