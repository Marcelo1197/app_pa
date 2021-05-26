//INFO: opciones y configuración para desarrollar

import React from 'react'; //U: necesario despues de transformar jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useServidorPodemosAprender } from '../contexts/ServidorPodemosAprender';
import PaApi, { desarrolloSolamenteInit, desarrolloSolamenteUrl } from "../services/pa-api";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

desarrolloSolamenteInit(); 

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			maxWidth: '40em',
			width: '80%'
		},
	},
	btn: {
		'&' : {
			width: '8em',
			marginRight: '10px',
		}
	}
}));

export default function PaginaModoDesarrollo() {
	const classes= useStyles();

	const servidorPodemosAprender= useServidorPodemosAprender();
	const [state, setState]= useState({
		servidor: desarrolloSolamenteInit()
	});

	window.servidorPodemosAprender= servidorPodemosAprender;
	window.dbgPaApi= PaApi;

	const cuandoCambia = (event) => {
		setState({[event.target.id]: event.target.value});
	};

	const actualizarServidorPodemosAprender= (cual) => {
		let servidor = cual; //DFLT
		if (cual=='local') { servidor= 'http://localhost:8000'; }
		else if (cual=='prod') { servidor= 'https://si.podemosaprender.org'; } 
		desarrolloSolamenteUrl(servidor);
		setState({servidor});
	}

	return (
		<>
			<h2>Opciones para desarrollar</h2>
			<form className={classes.root}>
				<TextField label="servidor" id="servidor" 
					defaultValue={state.servidor} value={state.servidor} onChange={cuandoCambia} 
					variant="outlined"
				/>
				<div>
					<Button onClick={() => actualizarServidorPodemosAprender('prod')}
						variant="contained" className={classes.btn}>Producción</Button>
					<Button onClick={() => actualizarServidorPodemosAprender('local')}
						variant="contained" className={classes.btn}>Local</Button>
					<Button onClick={() => actualizarServidorPodemosAprender(state.servidor)}
						variant="contained" className={classes.btn}>Guardar</Button>
				</div>
			</form>
		</>
	)
} 
