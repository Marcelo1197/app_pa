//INFO: como se usa ServidorPodemosAprender y RutaProtegida

import { ProvideServidorPodemosAprender, useServidorPodemosAprender } from '../contexts/ServidorPodemosAprender';
import { RutaConLogin } from '../components/RutaConLogin';
import { useRutasConLogin } from '../hooks/useRutasConLogin';

import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";


function LogoutButton() { //U: un boton de logout o cartelito que avisa que no estas logueado
	const {logout, usuario}= useRutasConLogin();

  return usuario ? (
    <p>
      Welcome!{" "}
      <button onClick={ logout } > Sign out </button>
		</p>
  ) : (
    <p>You are not logged in.</p>
  );
}


function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
	const paApi= useServidorPodemosAprender();
	const [mensaje, setMensaje]= useState();

	const conseguirDatos= async () => {
		try {
			const datos= await paApi.fetch({query: '{ hola }'});
			setMensaje(datos.data.hola);
		}
		catch (ex) {
			setMensaje(ex.message);
		}
	}

	useEffect(() => {
		const proc= setInterval(conseguirDatos, 5000);
		return () => { clearInterval(proc); }
	})
	
  return <p>Servidor responde {mensaje}</p> 
}


function LoginPage() {
	const {login, rutaDeDondeViene}= useRutasConLogin();
  return (
    <div>
      <p>You must log in to view the page at {rutaDeDondeViene.pathname}</p>
      <button onClick={() => login('admin','secreto')}>Log in</button>
    </div>
  );
}

export default function AuthExample() { //U: aca crea el contexto con el provider
  return (
    <ProvideServidorPodemosAprender>
      <Router>
        <div>
          <LogoutButton />

          <ul>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <RutaConLogin necesitaLogin={false} path="/public">
              <PublicPage />
            </RutaConLogin>
            <RutaConLogin path="/protected">
              <ProtectedPage />
            </RutaConLogin>
          </Switch>
        </div>
      </Router>
    </ProvideServidorPodemosAprender>
  );
}

