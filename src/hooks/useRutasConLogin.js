//INFO: conectar estado de autenticacion con un Router

import { useServidorPodemosAprender } from '../contexts/ServidorPodemosAprender';

import { useHistory, useLocation } from 'react-router-dom';

export function useRutasConLogin() {
	const history = useHistory();
	const location = useLocation();
	const servidorPodemosAprender = useServidorPodemosAprender();

	const { from } = location.state || { from: { pathname: '/' } };
	const rutaDeDondeViene = from;

	//DBG: console.log("rutaDeDondeViene", rutaDeDondeViene, location.state);
	const login = (usuario, pass) => {
		servidorPodemosAprender.login(usuario,pass).then(() => {
			history.replace(rutaDeDondeViene);
		});
	};

	const logout = () => {
		servidorPodemosAprender
			.logout()
			.then(() => history.push('/'));
	};

	return {
		login, 
		rutaDeDondeViene, 
		logout, 
		usuario: servidorPodemosAprender.usuario, 
		history,
		consultando: servidorPodemosAprender.consultando,
		api_url: servidorPodemosAprender.api_url,
	};
}

