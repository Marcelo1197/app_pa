//INFO: mostrar lista de charlas

import { useState, useEffect } from 'react';
import { useServidorPodemosAprender } from '../contexts/ServidorPodemosAprender';

import {Link} from "react-router-dom";

export default function Charla() {
	const servidorPodemosAprender= useServidorPodemosAprender();
	const [charlas, setCharlas]= useState([]);
	
	useEffect(() => {
		(async () => {
			const res= await servidorPodemosAprender.fetch({query: `
				{ charlaLista(first: 3) { edges { node { titulo, id } }}}
			`});
			setCharlas(res.data.charlaLista.edges);
			//TODO: errores de red, etc
		})();
	}, []);
	
	return (
		<>
			<h2>
				Charlas
			</h2>
			{ charlas 
				? ( 
					<ul>
					{ charlas.map( charla => (
						<li>
							<Link to={`/charla/${charla.node.titulo.slice(1)}`}>
								{JSON.stringify(charla)}
							</Link>
						</li>
						))
					}
					</ul>
					)
				: "Cargando ..."
			}
		</>
	)
}

