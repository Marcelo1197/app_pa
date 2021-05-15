//INFO: mostrar lista de charlas

import { useState, useEffect } from 'react';
import { useServidorPodemosAprender } from '../contexts/ServidorPodemosAprender';

import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';


const PorPagina= 3;
const consulta= (pagina) => {
	const offset= parseInt(pagina)*PorPagina;
	const q= `
		{ charlaitemLista(first: ${PorPagina}, offset: ${offset},
				 orderBy: ["-texto__fhCreado"]
			) {edges { node 
			{
				charla { titulo }
				texto { id fhCreado texto deQuien { username } }
			}
		}}}
	`;
	//DBG: console.log("Charlas consulta",pagina,offset,q);
	return q;
};

export default function Charla() {
	const servidorPodemosAprender= useServidorPodemosAprender();
	const [charlas, setCharlas]= useState([]);
	const [pagina, setPagina]= useState(0);

	window.dbgCharlasSetPagina= (num) => setPagina(num);

	useEffect(() => {
		(async () => {
			const res= await servidorPodemosAprender.fetch({query: consulta(pagina)});

			//DBG: console.log(JSON.stringify(res.data.charlaitemLista.edges, null, 1));
			const datos= res.data.charlaitemLista.edges.map( item => ({
				charlaTitulo: item.node.charla.titulo,
				fhCreado: item.node.texto.fhCreado,
				deQuien: item.node.texto.deQuien.username,
				texto: item.node.texto.texto,
				textoId: item.node.texto.id,
			}));	

			//DBG: console.log(JSON.stringify(datos, null, 1));

			setCharlas(datos);
			//TODO: errores de red, etc
		})();
	}, [pagina]); //A: repetir la consulta si cambia pagina
	
	return (
		<>
			<h2>
				Charlas (página {pagina})
			</h2>
			{ charlas 
				? (<> 
						<ul>
						{ charlas.map( (charla, index) => (
							<li key={index}>
								<Link to={`/charla/${charla.charlaTitulo.slice(1)}`}>
									{charla.charlaTitulo}
								</Link>
								{charla.fhCreado} 
								por 
								{charla.deQuien} 
								<Link to={{pathname: `/texto/${charla.textoId}`, state: charla}}>
								<div>{charla.texto.substr(0,200)}</div>
								</Link>
							</li>
							))
						}
						</ul>
						<Button onClick={() => setPagina(pagina+1)}>&gt;</Button>	
					</>)
				: "Cargando ..."
			}
		</>
	)
}

