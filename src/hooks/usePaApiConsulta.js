//INFO: encapsular consultas a la API graphQl de Pa

import { useEffect, useState } from "react";
import { useServidorPodemosAprender } from '../contexts/ServidorPodemosAprender';
import { fechaLegible, fechasSonIguales, fechaParaTexto } from '../services/pa-lib';

const PorPagina= 3;
function generarGraphQl(filtros) {
	const filtros_txt= Object.entries(filtros)
		.map( ([k,v]) => (v!=null ? `${k}: "${(v instanceof Date ? v.toISOString() : v)}"` : ''))
		.join("\n");

	const q= `
		{ textoLista (
				${filtros_txt}
				first: 3
				orderBy: ["-fhCreado"]
			) 
			{ edges { node { 
				id
				deQuien { username }
				fhCreado
				texto    
			}}}
		}
	`;
	//DBG: 
	console.log("Textos consulta",filtros, q);
	return q;
};

export function usePaApiConsulta(consultaInicial) {
	const servidorPodemosAprender= useServidorPodemosAprender();

	const [datos, setDatos]= useState([]); //A: los datos que trajimos
	const [filtros, setFiltros]= useState({}); //A: los filtros que aplicamos
	const [consulta, setConsulta]= useState(consultaInicial); //A: la consulta a ejecutar

	useEffect(() => {
		(async () => {
			console.log("Texto buscandoDatos",filtros); 
			const res= await servidorPodemosAprender.fetch({query: generarGraphQl(filtros)});

			//DBG: console.log(JSON.stringify(res.data.textoLista.edges, null, 1));
			const datos= res.data.textoLista.edges.map( item => ({
				fhCreado: fechaParaTexto(item.node.fhCreado),
				deQuien: item.node.deQuien.username,
				texto: item.node.texto,
				textoId: item.node.id,
			}));	
			//DBG: console.log(JSON.stringify(datos, null, 1));

			setDatos(datos);
			//TODO: errores de red, etc
		})();
	}, [filtros, consulta]); //A: repetir la consulta si cambia filtros

	return [datos, filtros, setFiltros, setConsulta];
}

