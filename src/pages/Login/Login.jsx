//INFO: pantalla de login en podemos aprender

import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { CFG, apiLogin, apiNecesitoLoginP, fetchConToken, usuarioLeer } from '../../services/pa-api';

import LoginTemplate from "./LoginTemplate";

CFG.api_url= 'http://localhost:8000'; //A: cambie a servidor de pruebas //TODO: hacer configurable

export default function Login() {

	const history= useHistory();
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
			const res = await apiLogin(
				nombreUsuario,
				contraseniaUsuario
			);
			setPreLoader(false)

			if (res.detail === "No active account found with the given credentials") {
				alert("Usuario o contraseña incorrecto!");
			} else {
				console.log('Login exitoso');
				history.replace('/?_'+Date.now());	
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
