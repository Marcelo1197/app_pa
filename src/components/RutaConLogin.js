//INFO: como se usa ServidorPodemosAprender y RutaProtegida

import { Route, Redirect } from 'react-router-dom';
import { useRutasConLogin } from '../hooks/useRutasConLogin';


export function RutaConLogin({ children, necesitaLogin, ...otrosParametros }) { //U: si necesitaLogin=true redirige a /login si es necesario
	const {usuario} = useRutasConLogin(); //A: usa el hook para leer si estamos logueados del contexto
	return (
		<Route
			{...otrosParametros}
			render={({ location }) =>
				((necesitaLogin==false) || (usuario!=null)) 
				?  children 
				: <Redirect to={{ pathname: '/login', state: { from: location } }} />
			}
		/>
	);
}
