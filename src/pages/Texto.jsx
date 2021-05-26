//INFO: mostrar un texto

import React from 'react'; //U: necesario despues de transformar jsx
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useServidorPodemosAprender } from '../contexts/ServidorPodemosAprender';
import { markdownTransformarHTML, fechaLegible, fechasSonIguales, fechaParaTexto } from '../services/pa-lib';
import MarkdownMostrar from '../components/MarkdownMostrar';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';


export default function PaginaTexto(props) {
	const { textoid } = useParams(); 
	//A: el router la pasa como paramentro tipo /texto/bandadjango -> bandadjango

	const history= useHistory();
	const reactLocation = useLocation();
	const [datos, setDatos]= useState({...reactLocation.state, textoId: textoid })
	//A: el link puede pasar datos en location, sino los vamos a tener que buscar del servidor

	//VER: (marked) https://reactjs.org/docs/dom-elements.html
	return (
		<>
			<Breadcrumbs aria-label="breadcrumb">
				<Link color="inherit" onClick={() => history.go(-1) }>
					Textos	
				</Link>
				<>
				De { datos.deQuien } { fechaLegible(datos.fhCreado) }
				</>
			</Breadcrumbs>
				
			<Container>
				<MarkdownMostrar contexto={datos}>
					{datos.texto}
				</MarkdownMostrar>
			</Container>
		</>
	)
}


