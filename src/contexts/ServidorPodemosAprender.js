//INFO: un contexto para leer y escribir datos de si.podemosaprender.org (o local)

//VER: https://usehooks.com/useAuth
//VER: https://reactrouter.com/web/example/auth-workflow

////////////////////////////////////////////////////////////
//S: que necesitamos
import React, { useContext, createContext, useState, useEffect } from "react";

import PaApi from "../services/pa-api";

////////////////////////////////////////////////////////////
//S: el contexto
const ServidorPodemosAprenderContext = React.createContext(); //U: el contexto para conectar componentes que no son hijos directos, asi no tengo que pasar todo por props, un contexto es como un buzon donde vas a buscar mensajes

export function useServidorPodemosAprender() { //U: tus componentes que estan en el contexto pueden acceder con este hook
  return useContext(ServidorPodemosAprenderContext);
}


function useProvideServidorPodemosAprender() { //U: este se usa en el componente provider para envolver los hijos en este contexto
	const USUARIO_NO_SE= {usuario: 'no se'}
  const [usuario, setUsuario] = useState(USUARIO_NO_SE); //U: devuelve usuario y eso lo hace reactivo (actualiza otros)
	const [consultando, setConsultando]= useState(0); //U: si estamos esperando un fetch

	//TODO: agregamos otro estado para ultimo mensaje de error?

	useEffect(() => {
		(async () => { //A: para usar await, creo una funcion anonima y la llamo aca mismo
			const necesitoLogin= await PaApi.apiNecesitoLoginP();
			const usuario= PaApi.usuarioLeer(); 
			//DBG: console.log("useProvideServidorPodemosAprender apiNecesitoLoginP",necesitoLogin,usuario);
			if (!necesitoLogin) {
				setUsuario( usuario );
			}
			else {
				setUsuario( null );
			}
		})();
	}, []);

  const login = (usuario, pass) => {
		setConsultando(consultando+1);
    return (
			PaApi.apiLogin(usuario, pass)
				.then( (res) => { setConsultando(consultando-1); 
					setUsuario(usuario); return res; }) //A: me guardo usuario, avisa a otros componentes
				.catch( (err) => { setConsultando(consultando-1); 
					setUsuario(null); throw(err); } ) //A: tambien si fallo
		);
  }

  const logout = () => {
		console.log('useProvideServidorPodemosAprender logout');
    return (
			PaApi.apiLogout()
				.then(() => { 
					console.log('useProvideServidorPodemosAprender logout then'); 
					setUsuario(null); 
				})
		);
  }

	const fetch = (query) => {
		setConsultando(consultando+1);
		return (
			PaApi.fetchConToken(query)
				.then ( r => { setConsultando(consultando-1);
					return r;
				})
				.catch( (err) => { setConsultando(consultando-1);
					if (PaApi.esErrorNecesitaLogin(err)) {
						setUsuario(null);
					}
					throw err;
				})
			)
		//TODO: manejar errores de conexion
	}

  return {
		USUARIO_NO_SE, //U: estado inicial antes de averiguar si necesito login
    usuario, //U: el estado reactivo para que se actualicen dependientes
    login, //U: funcion para loguearse
    logout, //U: funcion para desloguearse
		fetch, //OBSOLETO, usar 'consultar' y 'modificar'
		consultar: PaApi.apiConsultar,//U: para enviar y traer datos via graphql	
		modificar: PaApi.apiModificar,//U: para enviar y traer datos via graphql	
		consultando, //U: para saber si estamos esperando requests
		api_url: PaApi.api_url, //U: para mostrar ej en login
  };
}


export function ProvideServidorPodemosAprender({ children }) { //U: el componente para el contexto
  const servidorPodemosAprender = useProvideServidorPodemosAprender(); //A: usa el hook que armamos y le pasa a los children como context
	//APRENDER: aca conecta el context con el valor que devolvio el hook o algun estado!
	// como le pasa auth en las props, todo lo que esta en el context ahora depende de auth
  return (
    <ServidorPodemosAprenderContext.Provider value={servidorPodemosAprender}>
      {children}
    </ServidorPodemosAprenderContext.Provider>
  );
}

/* DBG {*/ 
window.PaApi= PaApi;
/* } DBG  */


