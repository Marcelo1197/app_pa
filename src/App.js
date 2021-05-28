//INFO: punto de entrada principal a la App, mantenerlo limpio, tiene que servir de indice

import React from 'react';
import { ThemeProvider } from './ThemeProvider.js';
import CssBaseline from '@material-ui/core/CssBaseline';


import { ProvideServidorPodemosAprender} from './contexts/ServidorPodemosAprender';

import { theme } from './Theme';
import './index.css';

import AppMenuYMarco from './components/AppMenuYMarco';
import Login from './pages/Login/Login';


import Inicio from './pages/Inicio';
import Textos from './pages/Textos';

import QueHago from './pages/QueHago';
import PaginaTexto from './pages/Texto';
import PaginaTextoEditar from './pages/TextoEditar';
import PaginaQueHago from './pages/ToDo';
import Charla from './pages/Charla';

import PaginaModoDesarrollo from './pages/ModoDesarrollo';
import PaginaNoImplementada from './pages/NoImplementada';

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
		noNecesitaLogin: true,
	},
	{
		path: '/ideas/que-hago',
		dsc: '¿Qué hago?',
		pagina: PaginaQueHago
	},
	{
		path: '/como-voy',
		dsc: '¿Cómo voy?',
	},
	{
		dsc: '¿Me hablan a mi?',
		accion: ({history, usuario}) => {
			history.push({ pathname: '/textos', search: `?charla=@${usuario}` });
		},
	},
	{
		dsc: 'Mi plan',
		accion: ({history, usuario}) => {
			history.push({ pathname: '/textos', search: `?charla=${encodeURIComponent('#plan_de_participante_'+usuario)}` });
		},
	},
	{
		path: '/texto/:textoid',
		esPrefijo: true,
		pagina: PaginaTexto,
	},
	{
		path: '/texto_editar/:textoid',
		esPrefijo: true,
		pagina: PaginaTextoEditar,
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
	{
		dsc: 'Texto Nuevo',
		accion: ({history}) => {
			history.push({ pathname: '/texto_editar/nuevo' });
		},
	},

	{ divisor: true },
	{
		dsc: 'Logout',
		accion: (contexto) => { 
			//DBG: console.log('Logout'); 
			contexto.logout(); 
		}
	},

	{ seccion: 'Modo desarrollo' },
	{
		path: '/devel/',
		dsc: 'Servidor',
		pagina: PaginaModoDesarrollo,
		noNecesitaLogin: true,
	},

	{
		path: '/ideas/que-hago',
		dsc: '(idea) ¿Qué hago?',
		pagina: QueHago.PaginaQueHago,
		icono: <QueHago.IconoQueHago />,
	},


	{
		path: '*',
		pagina: PaginaNoImplementada,
		noNecesitaLogin: true,
	}
];

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<ProvideServidorPodemosAprender>
				<AppMenuYMarco menu_y_rutas={MenuYRutas} />;
			</ProvideServidorPodemosAprender>
		</ThemeProvider>
	);
}
