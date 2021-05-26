//INFO: encapsular consultas a la API graphQl de Pa

import { useEffect, useState } from "react";
import { useServidorPodemosAprender } from '../contexts/ServidorPodemosAprender';


export function usePaApiConsulta(consultaInicial, filtrosInicial) {
	const { consultar: apiConsultar }= useServidorPodemosAprender();

	const [datos, setDatos]= useState([]); //A: los datos que trajimos
	const [filtros, setFiltros]= useState(filtrosInicial || {}); //A: los filtros que aplicamos
	const [consulta, setConsulta]= useState(consultaInicial); //A: la consulta a ejecutar
	const [estado, setEstado]= useState('');

	let abortController= new AbortController(); //VER: https://davidwalsh.name/cancel-fetch

	const cancelarConsulta= () => {
		abortController.abort(); //A: si habia request anterior, detenerlo
		setEstado('ERROR: cancelada');
	};

	const ejecutarConsulta= (async () => { //U: la parte async, para no esperar despues de abort
		abortController.abort(); //A: si habia request anterior, detenerlo

		if (filtros==null || consulta==null) { //A: no quiere consultar
			setEstado('noconsulta');
			setDatos(null);
		}

		abortController= new AbortController();  //U: nuevo, para este fetch
		setEstado('procesando');
		const res= await apiConsultar(consulta, filtros, abortController.signal);
		//DBG: console.log('usePaApiConsulta filtros y datos',filtros, JSON.stringify(res.data, null, 1));
		//DBG: console.log('usePaApiConsulta', JSON.stringify(datos, null, 1));
		//TODO: errores de red, etc
		setEstado('listo');
		setDatos(res.datos);
	});

	useEffect(() => {
		ejecutarConsulta();	
	}, [filtros, consulta]); //A: repetir la consulta si cambia filtros

	return {datos, filtros, setFiltros, ejecutarConsulta, cancelarConsulta, consulta, setConsulta, estado};
}

