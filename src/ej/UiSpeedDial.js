//FROM: https://material-ui.com/components/speed-dial/#persistent-action-tooltips 

import { LoremIpsum } from "react-lorem-ipsum";  //U: para generar texto simulado en este estudio
//VER: https://fatihtelis.github.io/react-lorem-ipsum/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'fixed', //A: un recuadro fijo para enmascarar cuando aparece el menu
		top: 0, //A: desde arriba de la pantalla
		height: '100vh', //A: hasta abajo (todo el alto de lo que se ve)
		width: '100vw', //A: y la derecha
		transform: 'translateZ(0px)', //A: que queda "arriba" del texto
		flexGrow: 1,
	},
	speedDial: {
		position: 'absolute', //A: el boton va tambien fijo en ese recuadro
		bottom: theme.spacing(6), //A: un poquito separado del fondo (firefox movil lo esconde cuando muestra su barra)
		right: theme.spacing(4), //A: y de la derecha
	},
}));

export function ComponenteSpeedDial({acciones}) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [hidden, setHidden] = React.useState(false);

	const handleVisibility = () => {
		setHidden((prevHidden) => !prevHidden);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<Button onClick={handleVisibility}>Toggle Speed Dial</Button>
			<Backdrop open={open} />
			<SpeedDial
				ariaLabel="SpeedDial tooltip example"
				className={classes.speedDial}
				hidden={hidden}
				icon={<SpeedDialIcon />}
				onClose={handleClose}
				onOpen={handleOpen}
				open={open}
			>
				{acciones.map((accion) => (
					<SpeedDialAction
						key={accion.name}
						icon={accion.icon}
						tooltipTitle={accion.name}
						tooltipOpen
						onClick={handleClose}
					/>
				))}
			</SpeedDial>
		</div>
	);
}

const accionesEnEstaPantalla = [
	{ icon: <FileCopyIcon />, name: 'Copy' },
	{ icon: <SaveIcon />, name: 'Save' },
	{ icon: <PrintIcon />, name: 'Print' },
	{ icon: <ShareIcon />, name: 'Share' },
	{ icon: <FavoriteIcon />, name: 'Like' },
];

export default function UsoSpeedDial() {
	return (<>
		<ComponenteSpeedDial acciones={accionesEnEstaPantalla}/>
		<p>Un parrafo despues pero aparece arriba/abajo</p>
		<LoremIpsum p={10} />	
	</>)
}


