//INFO: pantalla de login en podemos aprender

import { useState, useEffect } from 'react';
import { useRutasConLogin } from '../../hooks/useRutasConLogin';
import LoginTemplate from "./LoginTemplate";

export default function Login() {
	const { login } = useRutasConLogin();
	const [nombreUsuario, setNombreUsuario] = useState("")
	const [contraseniaUsuario, setContraseniaUsuario] = useState("")
	const [preLoader, setPreLoader] = useState(false)

	const handleChangeInputUsuario = (e) => {
		setNombreUsuario(e.target.value)
	}

	const handleChangeInputContrasenia = (e) => {
		setContraseniaUsuario(e.target.value)
	}
	
	const handleClickLogin = async (e) => {
		e.preventDefault();
		if (contraseniaUsuario === "" || nombreUsuario === "") {
      alert("Debe completar los dos campos");
    }
		else {
			setPreLoader(true)
			const res = await login( nombreUsuario, contraseniaUsuario);
			setPreLoader(false)

			if (res && res.detail === "No active account found with the given credentials") {
				alert("Usuario o contraseña incorrecto!");
			} else {
				console.log('Login exitoso');
			}
		}
	}

	return (
		preLoader
			? 
			<h1>Cargando...</h1>
			:
			<LoginTemplate 
				onChangeUsuario={handleChangeInputUsuario} 
				onChangePass={handleChangeInputContrasenia} 
				onClickLogin={handleClickLogin}
			/>
	)	

	
}
