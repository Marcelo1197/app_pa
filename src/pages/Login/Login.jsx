//INFO: pantalla de login en podemos aprender

import React from 'react'; //U: necesario despues de transformar jsx
import { useInput } from '../../hooks/useInput';
import { useRutasConLogin } from '../../hooks/useRutasConLogin';
import LoginTemplate from "./LoginTemplate"; //TODO: queremos separado o junto?

export default function Login() {
	const { login, consultando, api_url } = useRutasConLogin();
	const [valores, setValores, cuandoCambiaInput]= useInput();

	const cuandoPideLogin = async (e) => {
		e.preventDefault();
		console.log('cuandoPideLogin',valores);
		if ( !valores.password ||  !valores.participante ) {
      alert("Debe completar los dos campos");
    }
		else {
			const res = await login( valores.participante, valores.password);
			if (res && res.detail === "No active account found with the given credentials") {
				alert("Usuario o contraseña incorrecto!");
			} else {
				console.log('Login exitoso');
			}
			//TODO: mudar a libreria
		}
	}
	const p= {
					cuandoCambiaInput,
					cuandoPideLogin,
					servidorApi: api_url(),
	}
	return (
		consultando	
			?  <h1>Cargando... </h1>
			: <LoginTemplate {...p} />
	)	
}
