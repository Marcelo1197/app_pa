//INFO: un contexto para leer y escribir datos de si.podemosaprender.org (o local)

//VER: https://usehooks.com/useAuth
//VER: https://reactrouter.com/web/example/auth-workflow

////////////////////////////////////////////////////////////
//S: que necesitamos
import { useContext, createContext, useState } from "react";

import PaApi from "../services/pa-api";
/* DBG { */
window.PaApi= PaApi;
PaApi.CFG.api_url='http://localhost:8000';
/* } DBG  */

////////////////////////////////////////////////////////////
//S: el contexto
const ServidorPodemosAprenderContext = createContext(); //U: el contexto para conectar componentes que no son hijos directos, asi no tengo que pasar todo por props, un contexto es como un buzon donde vas a buscar mensajes

export function useServidorPodemosAprender() { //U: tus componentes que estan en el contexto pueden acceder con este hook
  return useContext(ServidorPodemosAprenderContext);
}


function useProvideServidorPodemosAprender() { //U: este se usa en el componente provider para envolver los hijos en este contexto
  const [usuario, setUsuario] = useState(null); //U: devuelve usuario y eso lo hace reactivo (actualiza otros)
	//TODO: agregamos otro estado para ultimo mensaje de error?

  const login = (usuario, pass) => {
    return (
			PaApi.apiLogin(usuario, pass)
				.then( (res) => { setUsuario(usuario); return res; }) //A: me guardo usuario, avisa a otros componentes
				.catch( (err) => { setUsuario(null); throw(err); } ) //A: tambien si fallo
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
		return (
			PaApi.fetchConToken(query)
				.catch( (err) => { 
					if (PaApi.esErrorNecesitaLogin(err)) {
						setUsuario(null);
					}
					throw err;
				})
			)
		//TODO: manejar errores de conexion
	}

  return {
    usuario, //U: el estado reactivo para que se actualicen dependientes
    login, //U: funcion para loguearse
    logout, //U: funcion para desloguearse
		fetch, //U: para enviar y traer datos via graphql	
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


