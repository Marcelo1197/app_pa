//INFO: mostrar lista de textos con filtros y orden

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

export default function Textos() {
	const history= useHistory();
	const urlSearchParams= useUrlSearchParams(); //A: ej fh_max=2021-05-12
	const [textos, filtros, setFiltros]= usePaApiConsulta();

	useEffect(() => {
		setFiltros({ ...filtros, 
			fhEditado_Lt: fechaParaTexto( urlSearchParams['fh_max'] ),
			enCharla: urlSearchParams['charla'],
			deQuien_Username: urlSearchParams['de'],
		});
		console.log('Texto filtros', filtros);
	}, [urlSearchParams]); //A: repetir la consulta si cambia VALORES de query params 

	const fh_max_proxima= new Date(new Date(textos.reduce((acc, t) => Math.max(acc, t.fhCreado), 0)));
	const fh_min= new Date(textos.reduce((acc, t) => Math.min(acc, t.fhCreado), new Date()));
	//DBG: console.log("Textos fh_min fh_max",fh_min, fh_max_proxima)

	const textosOrdenados= textos.sort( (a,b) => (a.fhCreado > b.fhCreado ? -1 : 1) );	
	//TODO: ordenar mas nuevo arriba como ahora, o mas nuevo abajo?

	const cuandoCambiaFiltros= (filtros) => {
		history.push('/textos/?'+urlParamsParaDiccionario(filtros)); //A: navegamos a nueva url
	};

	return (
		<>
			<h2>
				Textos {filtros.fhEditado_Lt ? `(desde ${fechaLegible(filtros.fhEditado_Lt)})`: ''}
			</h2>

			<TextoFiltros 
				filtros={urlSearchParams} 
				setFiltros={cuandoCambiaFiltros}
			/>

			{ textos 
				? (<> 
						<Container>
						{ 
							textosOrdenados.map( (texto, index) => (
								<TextoCard key={index} texto={texto} urlSearchParams={urlSearchParams}/>
							))
						}
						</Container>

						<Button 
							to={{search: '?'+urlParamsParaDiccionario({ ...urlSearchParams, fh_max:fh_min})}}
							component={Link}
							variant="contained"
						>Más viejos</Button>	

					</>)
				: "Cargando ..."
			}
		</>
	)
}

