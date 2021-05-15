//INFO: mostrar un texto

import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useServidorPodemosAprender } from '../contexts/ServidorPodemosAprender';
import { markdownTransformarHTML, fechaLegible } from '../services/pa-lib';


export default function PaginaTexto(props) {
	const { textoid } = useParams(); 
	//A: el router la pasa como paramentro tipo /texto/bandadjango -> bandadjango

	const  location = useLocation();
	const [datos, setDatos]= useState({...location.state, textoId: textoid })
	//A: el link puede pasar datos en location, sino los vamos a tener que buscar del servidor

	//VER: (marked) https://reactjs.org/docs/dom-elements.html
	return (
		<>
			<h2>
				De { datos.deQuien }
				<br />{ fechaLegible(datos.fhCreado) }
			</h2>
			<div dangerouslySetInnerHTML={{__html: markdownTransformarHTML(datos.texto).markedHtml}}>
			</div>
		</>
	)
}


