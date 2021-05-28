//INFO: mostrar un texto

import { useParams, useLocation, useHistory } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useServidorPodemosAprender } from '../contexts/ServidorPodemosAprender';
import { useUrlSearchParams } from '../hooks/useUrlSearchParams';
import { markdownTransformarHTML, fechaLegible, fechasSonIguales, fechaParaTexto } from '../services/pa-lib';
import MarkdownMostrar from '../components/MarkdownMostrar';

//VER: https://material-ui.com/components/textarea-autosize/#textarea-autosize
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';

import SaveIcon from '@material-ui/icons/Save';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';

import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
	botones: {
		display: 'flex',
		justifyContent: 'right',
		flexWrap: 'wrap',
		'& > button': {
			margin: theme.spacing(1),
		},
	},
	snack: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}));

export default function PaginaTextoEditar(props) {
	const classes = useStyles();
	const { textoid } = useParams(); 
	//A: el router la pasa como paramentro tipo /texto/bandadjango -> bandadjango
	const { modificar: apiModificar }= useServidorPodemosAprender();

	const history= useHistory();
	const reactLocation = useLocation();
	const [datos, setDatos]= useState({...reactLocation.state, textoId: textoid })
	//A: el link puede pasar datos en location, sino los vamos a tener que buscar del servidor
	const urlSearchParams= useUrlSearchParams(); //A: ej fh_max=2021-05-12

	const [quiereVistaPrevia, setQuiereVistaPrevia]= useState(false);
	const [snackAbierto, setSnackAbierto]= useState(false);

	const cuandoQuiereGuardar= useCallback( () => { (async () => {
		//DBG: console.log("PaginaTextoEditar cuandoQuiereGuardar");
		const id0= datos.textoId=='nuevo' ? null : datos.textoId;
		const res= await apiModificar(
			'textoModificar',
			{texto: datos.texto, charlaTitulo: datos.charla, orden: datos.orden, id: id0},
			['texto','id','fhEditado']
		);
		//DBG: console.log('PaginaTextoEditar cuandoQuiereGuardar guardó',res);
		const res_texto= res.texto; 
		//DBG: console.log('PaginaTextoEditar cuandoQuiereGuardar guardó datos',JSON.stringify(datos,null,2));
		setDatos({ ...datos, textoId: res_texto.id, fhEditado: res_texto.fhEditado});
		history.replace({...reactLocation, pathname: '/texto_editar/'+res_texto.id, state: datos});
		setSnackAbierto(true);
	})()}, [datos]);

	const cuandoTeclasEspeciales= (e) => {
		if ( (e.key=='Enter' && e.ctrlKey && cuandoQuiereGuardar())
			|| (e.key=='Enter' && e.altKey && setQuiereVistaPrevia(true))
		) { e.preventDefault(); }
	};

	return (
		<>
			<Breadcrumbs aria-label="breadcrumb">
				<Link color="inherit" onClick={() => history.go(-1) }>
					Textos	
				</Link>
				<>
				  De { datos.deQuien||'vos' } { fechaLegible(datos.fhCreado || new Date()) }
				</>
			</Breadcrumbs>

			<div className={classes.botones}>
				<Button variant="contained"
					onClick={() => setQuiereVistaPrevia(!quiereVistaPrevia)}
					variant="contained"
					size="small"
					startIcon={quiereVistaPrevia ? <EditIcon /> : <VisibilityIcon />}
				>{quiereVistaPrevia ? 'Editar' : 'Vista Previa'}
				</Button>
				<Button
					onClick={cuandoQuiereGuardar}
					variant="contained"
					size="small"
					className={classes.button}
					startIcon={<SaveIcon />}
				>Guardar
				</Button>
			</div>			
			<Container fluid
				style={{position: 'relative'}}
			>
				<div>
					<TextField
						onChange={(e) => setDatos({...datos, charla: e.target.value})}
						label="Charla"
						defaultValue="#borrame"
						variant="outlined"
						size="small"
					/>
					<TextField
						onChange={(e) => setDatos({...datos, orden: e.target.value})}
						label="Orden"
						defaultValue=""
						variant="outlined"
						size="small"
					/>
				</div>
				<textarea style={{width: '100%', minHeight: '20em'}}
					onChange={(e) => setDatos({...datos, texto: e.target.value})}
					onKeyDown={cuandoTeclasEspeciales}
				>
					{datos.texto||''}
				</textarea>
				{ quiereVistaPrevia 
					? (
						<MarkdownMostrar contexto={datos} style={{position: 'absolute', top: 0, minHeight: '20em', width: '100%', background: 'white'}}>
							{datos.texto||'_(todavía no escribiste nada)_'}
						</MarkdownMostrar>
					)
					: null
				}
			</Container>
			<div className={classes.snack}>
				<Snackbar
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					open={snackAbierto}
					autoHideDuration={3000}
					onClose={() => setSnackAbierto(false)}
					action={
						<React.Fragment>
							<IconButton size="small" aria-label="close" color="inherit" onClick={() => setSnackAbierto(false)}>
								<CloseIcon fontSize="small" />
							</IconButton>
						</React.Fragment>
					}
				>
					<Alert onClose={() => setSnackAbierto(false)} severity="success">
						Se guardó
					</Alert>
				</Snackbar>
			</div>
		</>
	)
}


