# app_podemosaprender con React y Material UI

## Objetivos

Que cualquier persona pueda crear pantallas aunque sepa poquito.

### Consumir y escribir datos en si.podemosaprender.org

Queremos

- una API Javascript bien simple y que no dependa de React en /services/pa-api.js
- Hook React que la envuelva /hooks/usePaApi.js

TODO: Agregar en pa-api.js funciones como traerCharlas() que escondan las URLs y los parámetros.

### Hacer pantallas

Se puede partir de un ejemplo como /pages/QueHago.jsx

Buscar componentes en https://material-ui.com/components/avatars/

En /src/App.js importar la nueva pantalla y agregarla a las rutas como las otrás


#### Queries

~~~
{ 
charlaitemLista(textoId: "VGV4dG9Ob2RlOjQyNQ==") {
  edges { node { charla { titulo }, orden } }
}
texto(id: "VGV4dG9Ob2RlOjQyNQ==") { texto }
}
~~~

