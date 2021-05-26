//INFO: mostrar lista de textos con filtros y orden

import React from 'react'; //U: necesario despues de transformar jsx
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUrlSearchParams } from '../hooks/useUrlSearchParams';
import { urlParamsParaDiccionario } from '../services/pa-lib';
import { fechaLegible, fechasSonIguales, fechaParaTexto } from '../services/pa-lib';
import { usePaApiConsulta } from '../hooks/usePaApiConsulta';

import TextoFiltros from '../components/TextoFiltros';
import TextoCard from '../components/TextoCard';

import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

export default function PaginaToDo() {
	const history= useHistory();

	const urlSearchParams= useUrlSearchParams(); //A: ej fh_max=2021-05-12
	const filtrosParaUrlParams= () => ({
			fhEditado_Lt: fechaParaTexto( urlSearchParams['fh_max'] ),
			charla_Titulo: urlSearchParams['charla'],
			deQuien_Username: urlSearchParams['de'],
	});

	const {datos, filtros, setFiltros, estado}= usePaApiConsulta(
		[ 'charlaitemLista', 'orden', ['charla', 'titulo'], ['texto', 'texto', 'fhEditado', 'fhCreado', ['deQuien', 'username']]],
		{ 
			orderBy:["charla__titulo","orden",'texto__fhCreado'], first: 50, 
			orden_Startswith: "ToDo", charla_Titulo_Startswith: "#bo",
			...(filtrosParaUrlParams())
		},
	);

	useEffect(() => {
		setFiltros({ ...filtros, ...(filtrosParaUrlParams())});
	}, [urlSearchParams]); //A: repetir la consulta si cambia VALORES de query params 

	const charlas= datos.reduce( (acc, charlaitem) => {
		const k= charlaitem.charla.titulo;
		acc[k]=(acc[k]||0)+1;
		return acc;
	}, {});

	return (
		<>
			<h2>
				¿Qué hago?
			</h2>
			{estado}<br/>
			{Object.entries(charlas).map( ([k,v]) => <span> {k} ({v}) </span>)}
			{	datos 
				? (<> 
						<Container>
						{ 
							datos.map( (charlaitem, index) => (
								<TextoCard key={index} texto={charlaitem.texto} urlSearchParams={urlSearchParams}/>
							))
						}
						</Container>
					</>)
				: "Cargando ..."
			}
		</>
	)
}

