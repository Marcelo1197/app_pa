//INFO: en vez de pasar props a lo largo de toda la jerarquia
// por claridad lo escribo en un solo archivo pero seria mejor separar componentes, hooks, etc.

import React, { useContext, createContext, useState } from "react";

////////////////////////////////////////////////////////////
// S: hooks
function useProveedorDeContextoConsola() { //U: hook que provee state y opcional funciones
	const [unValor, setUnValor]= useState(""); //U: el estado que lo hace reactivo (propaga cambios)
	
	window.simularEventoExternoQueCambiaValor= function (valorNuevo) { //U: como una api externa, ej pa-api
		setUnValor(valorNuevo); //A: llama el setter del hook useState, que propaga cambios a los que lo usan
		console.log("simularEventoExternoQueCambiaValor "+new Date(),valorNuevo)
	}

	const cambiarValorDesdeReact= function (valorNuevo) { //U: llamando desde react
		console.log("cambiarValorDesdeReact "+new Date(),valorNuevo)
		setUnValor(valorNuevo);
	}

	return {
		unValor,
		cambiarValorDesdeReact
	}
}

const MiContextoConsola = createContext(); //U: el contexto para conectar componentes que no son hijos directos, asi no tengo que pasar todo por props, un contexto es como un buzon donde vas a buscar mensajes

function useContextoConsola() { //U: con este hook los componentes que estan en el contexto pueden acceder
  return useContext(MiContextoConsola);
}

////////////////////////////////////////////////////////////
// S: componentes para el contexto

function ProvideContextoConsola({ children }) { //U: el componente para el contexto
const elContextoConsola = useProveedorDeContextoConsola(); //A: usa el hook que armamos y le pasa a los children como context
//APRENDER: aca conecta el context con el valor que devolvio el hook o algun estado!
// como le pasa auth en las props, todo lo que esta en el context ahora depende de auth
return (
	<MiContextoConsola.Provider value={elContextoConsola}>
		{children}
	</MiContextoConsola.Provider>
);
}

////////////////////////////////////////////////////////////
// S: como se usa

function ComponenteQueUsaContexto(props) { 
	const contextoConsola= useContextoConsola(); //A: consigo el contexto
	const [miValor, setMiValor]= useState(); 

	return (
		<div style={{border: '1px solid black', margin: '10px', ...props.style}}>
			<h2>Soy el componente {props.nombre}</h2>
			<p>El valor compartido es {contextoConsola.unValor}</p>
			<p>Ultima actualización {new Date()+''}</p>
      <p>Mi valor escrito aca: {miValor}</p>
			<p>
				<input onChange={ (e) => setMiValor(e.target.value) } />
				<button onClick={ () => contextoConsola.cambiarValorDesdeReact(miValor) }>Actualizar contexto</button>
			</p>
      
		</div>
	)	
}

function ComponenteIntermedioQueNoSeEnteraDeNadaUno() {
	return <ComponenteQueUsaContexto nombre="Uno" style={{background: '#FF8080'}}  />
}

function ComponenteIntermedioQueNoSeEnteraDeNadaDos() {
	return <ComponenteQueUsaContexto nombre="Dos" style={{background: '#80FF80'}}  />
}

function ComponenteQueNoSeActualiza({ cuando }) {
	return <div>Me dibuje a las {cuando+''}</div>;
}

export default function ComponenteQueLosEnvuelveYCreaElContexto() {
	return (
		<ProvideContextoConsola>	
			<ComponenteIntermedioQueNoSeEnteraDeNadaUno />
			<ComponenteIntermedioQueNoSeEnteraDeNadaDos />
			<ComponenteQueNoSeActualiza cuando={new Date()}/>
			<p>También podés usar en la consola <code>simularEventoExternoQueCambiaValor</code></p>
			<p>Este texto no depende de nada que se actualice {new Date()+''}</p>
		</ProvideContextoConsola>
	)
}


//U: para probar desde la consola que se actualice con un interval
//VER: https://blog.bitsrc.io/polling-in-react-using-the-useinterval-custom-hook-e2bcefda4197
var clk;

window.simularEventoPeriodico= () => {
	clearInterval(clk);
	var i=0; 
	clk=setInterval(() => { 
		i++; 
		window.simularEventoExternoQueCambiaValor("desde la consola "+i);
  },2000);
}

window.simularEventoPeriodicoDetener= () => {
	clearInterval(clk);
}
