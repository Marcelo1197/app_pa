//INFO: como se usa ServidorPodemosAprender y RutaProtegida

import { ProvideServidorPodemosAprender, useServidorPodemosAprender } from '../contexts/ServidorPodemosAprender';

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";


function AuthButton() { //U: un boton de logout o cartelito que avisa que no estas logueado
  let history = useHistory();
  let auth = useServidorPodemosAprender();

  return auth.usuario ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          auth.logout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  let auth = useServidorPodemosAprender(); //A: usa el hook para leer de el contexto
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.usuario ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
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
  let history = useHistory();
  let location = useLocation();
  let auth = useServidorPodemosAprender();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    auth.login('admin','secreto').then(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}

export default function AuthExample() { //U: aca crea el contexto con el provider
  return (
    <ProvideServidorPodemosAprender>
      <Router>
        <div>
          <AuthButton />

          <ul>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/public">
              <PublicPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute path="/protected">
              <ProtectedPage />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ProvideServidorPodemosAprender>
  );
}


