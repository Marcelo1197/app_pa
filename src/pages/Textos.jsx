//INFO: mostrar lista de textos

import { useState, useEffect } from 'react';
import { useUrlSearchParams } from '../hooks/useUrlSearchParams';
import { useServidorPodemosAprender } from '../contexts/ServidorPodemosAprender';
import { fechaLegible, fechasSonIguales, fechaParaTexto } from '../services/pa-lib';
import { urlParamsParaDiccionario } from '../services/pa-lib';

import MarkdownMostrar from '../components/MarkdownMostrar';

import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';


const PorPagina= 3;
const consulta= (filtros) => {
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

export default function Texto() {
	const servidorPodemosAprender= useServidorPodemosAprender();
	const urlSearchParams= useUrlSearchParams(); //A: ej fh_max=2021-05-12
	const [textos, setTextos]= useState([]);

	const filtros= {};
	filtros.fhEditado_Lt= fechaParaTexto( urlSearchParams['fh_max'] );
	filtros.enCharla= urlSearchParams['charla'];
	filtros.deQuien_Username= urlSearchParams['de'];
	console.log('Texto filtros', filtros);
	
	useEffect(() => {
		(async () => {
			console.log("Texto buscandoDatos",filtros); 
			const res= await servidorPodemosAprender.fetch({query: consulta(filtros)});

			//DBG: console.log(JSON.stringify(res.data.textoLista.edges, null, 1));
			const datos= res.data.textoLista.edges.map( item => ({
				fhCreado: fechaParaTexto(item.node.fhCreado),
				deQuien: item.node.deQuien.username,
				texto: item.node.texto,
				textoId: item.node.id,
			}));	
			//DBG: console.log(JSON.stringify(datos, null, 1));

			setTextos(datos);
			//TODO: errores de red, etc
		})();
	}, [urlSearchParams]); //A: repetir la consulta si cambia filtros
	
	const fh_max_proxima= new Date(textos.reduce((acc, t) => Math.max(acc, t.fhCreado), 0));
	const fh_min= new Date(textos.reduce((acc, t) => Math.min(acc, t.fhCreado), new Date()));
	//DBG: console.log("Textos fh_min fh_max",fh_min, fh_max_proxima)

	return (
		<>
			<h2>
				Textos {filtros.fhEditado_Lt ? `(desde ${fechaLegible(filtros.fhEditado_Lt)})`: ''}
			</h2>
			{ textos 
				? (<> 
						<>
						{ textos.map( (texto, index) => (
							<div style={{margin: '10px'}} key={index}>
								<Link 
									to={{pathname: `/texto/${texto.textoId}`, state: texto}}
								>{fechaLegible( texto.fhCreado )}
								</Link> por <Link
									to={{ search: '?'+urlParamsParaDiccionario(Object.assign({},urlSearchParams,{de:texto.deQuien})), state: texto}}
								>{texto.deQuien}
								</Link>
								<MarkdownMostrar 
									contexto={texto}
									style={{maxHeight: '10em', maxWidth: '80vw', overflow: 'hidden'}}
								>
									{texto.texto.substr(0,300)}
								</MarkdownMostrar>
							</div>
							))
						}
						</>
						<Button 
							to={{search: '?'+urlParamsParaDiccionario(Object.assign({},urlSearchParams,{fh_max:fh_min}))}}
							component={Link}
						>Más viejos</Button>	
					</>)
				: "Cargando ..."
			}
		</>
	)
}

