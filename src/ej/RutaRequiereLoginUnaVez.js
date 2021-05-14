//FROM: https://reactrouter.com/web/example/auth-workflow

import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

import {
  apiLogin,
  apiNecesitoLoginP,
  fetchConToken,
  usuarioLeer,
	tokenBorrar
} from "../services/pa-api";


// This example has 3 pages: a public page, a protected
// page, and a login screen. In order to see the protected
// page, you must first login. Pretty standard stuff.
//
// First, visit the public page. Then, visit the protected
// page. You're not yet logged in, so you are redirected
// to the login page. After you login, you are redirected
// back to the protected page.
//
// Notice the URL change each time. If you click the back
// button at this point, would you expect to go back to the
// login page? No! You're already logged in. Try it out,
// and you'll see you go back to the page you visited
// just *before* logging in, the public page.

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
		setTimeout(() => setUsuario(null), 10000); //U: simular token expira en 10 segundos
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */

function useProvideAuth() { //U: un hook para envolver en un contexto con el tag de este provider
  const [user, setUser] = useState(null); //U: devuelve user y eso lo hace reactivo (actualiza otros)

  const signin = cb => {
    return fakeAuth.signin(() => {
      setUser("user");
      cb();
    });
  };

  const signout = cb => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

	window.reacciona= function (u) { 
		//APRENDER: si cambio user desde cualquier lado, en este caso la consola, actualiza dependientes.
		// ej. si estaba logueado me mostro la pagina protegida PERO si llamo reaciona(null) en la consola
		// la actualiza y me avisa que necesito loguearme
		setUser(u);
	}

  return {
    user, //U: el estado reactivo para que se actualicen dependientes
    signin, //U: funcion para loguearse
    signout //U: funcion para desloguearse
  };
}


const authContext = createContext(); //U: el contexto para conectar componentes que no son hijos directos, asi no tengo que pasar todo por props, un contexto es como un buzon donde vas a buscar mensajes

function useAuth() { //U: con este hook los componentes que estan en el contexto pueden acceder
  return useContext(authContext);
}

function ProvideAuth({ children }) { //U: el componente para el contexto
  const auth = useProvideAuth(); //A: usa el hook que armamos y le pasa a los children como context
	//APRENDER: aca conecta el context con el valor que devolvio el hook o algun estado!
	// como le pasa auth en las props, todo lo que esta en el context ahora depende de auth
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

//APRENDER: como se usa el contexto

function AuthButton() { //U: un boton de logout o cartelito que avisa que no estas logueado
  let history = useHistory();
  let auth = useAuth();

  return auth.user ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          auth.signout(() => history.push("/"));
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
  let auth = useAuth(); //A: usa el hook para leer de el contexto
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
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
  return <h3>Protected</h3>;
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    auth.signin(() => {
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
    <ProvideAuth>
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
    </ProvideAuth>
  );
}


