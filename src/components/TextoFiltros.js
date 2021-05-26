//INFO: editar los filtros aplicados a textos

import React from 'react'; //U: necesario despues de transformar jsx
import { fechaLegible } from '../services/pa-lib';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
//VER: https://material-ui.com/components/chips/
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import CharlaIcon from '@material-ui/icons/Chat';
import FHMaxIcon from '@material-ui/icons/Schedule';
import DeIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'left',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(0.5),
		},
	},
}));

export default function TextoFiltros({filtros, setFiltros}) {
	const classes = useStyles();

	const cuandoPideBorrar= (k) => {
		console.log('TextoFiltros cuandoPideBorrar',k, filtros);
		setFiltros({ ...filtros, [k]: null });
	}

	return (
		<div className={classes.root}>	
			{ Object.entries(filtros).map( ([k,v]) => {
				let txt= k; let icon=null;

				//TODO: se puede generalizar para cualquier set de filtros
				if (k=='fh_max') { txt= fechaLegible(v); icon= <FHMaxIcon />; }
				else if (k=='charla') { txt= v; icon= <CharlaIcon />; }
				else if (k=='de') { txt=v; icon= <DeIcon />; }

				return (
					<Chip key={k}
						onDelete={() => cuandoPideBorrar(k)}
						onClick={() => cuandoPideBorrar(k)}
						label={txt}
						icon={icon}
					>
					</Chip>
				)
			})}
		</div>
	)
}

