//INFO: mostrar una charla

import React from 'react'; //U: necesario despues de transformar jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useServidorPodemosAprender } from '../contexts/ServidorPodemosAprender';

const consulta= (tituloCharla) => (`
	{
		charlaitemLista(
			first: 3, 
			charla_Titulo: "${tituloCharla}", 
			orderBy: ["-texto__fhCreado"]
		) {
			edges {
				node {
					texto {
						fhCreado
						deQuien { username }
						texto
					}
				}
			}
		}
	}
`);

export default function Charla() {
	const { charlaid } = useParams(); 
	//A: el router la pasa como paramentro tipo /charla/bandadjango -> bandadjango

	const servidorPodemosAprender= useServidorPodemosAprender();
	const [textos, setTextos]= useState([]);
	
	useEffect(() => {
		(async () => {
			const res= await servidorPodemosAprender.fetch({query: consulta('#'+charlaid)});
			setTextos(res.data.charlaitemLista.edges);
			//TODO: errores de red, etc
		})();
	}, [charlaid]);

	return (
		<>
			<h2>
				Charla { charlaid }
			</h2>

			{ textos.map( datosDeUnTexto => (
				<div style={{border: '1px dotted gray', margin: '5px'}}>
					<div> {datosDeUnTexto.node.texto.deQuien.username } @ { datosDeUnTexto.node.texto.fhCreado } </div>
					<div> {datosDeUnTexto.node.texto.texto} </div>
				</div>
			))}
		</>
	)
}

