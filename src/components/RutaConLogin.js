//INFO: como se usa ServidorPodemosAprender y RutaProtegida

import React from 'react'; //U: necesario despues de transformar jsx
import { Route, Redirect } from 'react-router-dom';
import { useRutasConLogin } from '../hooks/useRutasConLogin';


export function RutaConLogin({ children, necesitaLogin, ...otrosParametros }) { //U: si necesitaLogin=true redirige a /login si es necesario
	const {usuario, USUARIO_NO_SE} = useRutasConLogin(); //A: usa el hook para leer si estamos logueados del contexto
	//DBG: console.log('RutaConLogin', usuario);
	return (
		<Route
			{...otrosParametros}
			render={({ location }) => {
				//DBG: console.log("RutaConLogin", usuario, necesitaLogin, otrosParametros.path);
				if ( (necesitaLogin!=false) && (usuario==null) ) {
					return ( <Redirect to={{ pathname: '/login', state: { from: location } }} /> )
				}
				else if (usuario===USUARIO_NO_SE) { //A: esta revisando token vigente
					return '';
				}
				else { //A: no necesita login o tiene un token valido
					return  children;
				}
			}}
		/>
	);
}
