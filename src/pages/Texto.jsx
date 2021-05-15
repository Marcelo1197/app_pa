//INFO: mostrar un texto

import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useServidorPodemosAprender } from '../contexts/ServidorPodemosAprender';
import { markdownTransformarHTML } from '../services/pa-lib';

const consulta= (tituloTexto) => (`
	{
		textoitemLista(
			first: 3, 
			texto_Titulo: "${tituloTexto}", 
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

export default function PaginaTexto(props) {
	const { textoid } = useParams(); 
	//A: el router la pasa como paramentro tipo /texto/bandadjango -> bandadjango

	const  location = useLocation();
	const [datos, setDatos]= useState({...location.state, textoId: textoid })
	//A: el link puede pasar datos en location, sino los vamos a tener que buscar del servidor

	const servidorPodemosAprender= useServidorPodemosAprender();
	
	/*
	useEffect(() => {
		(async () => {
			const res= await servidorPodemosAprender.fetch({query: consulta(textoid)});
			setTexto(res.data.textoitemLista.edges);
			//TODO: errores de red, etc
		})();
	}, [textoid]);
	*/

	return (
		<>
			<h2>
				Texto { textoid }
			</h2>
			<div dangerouslySetInnerHTML={{__html: markdownTransformarHTML(datos.texto).markedHtml}}>
			</div>
		</>
	)
}


