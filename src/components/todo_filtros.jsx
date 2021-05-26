import React from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import PensarIcon from '@material-ui/icons/EmojiObjects';
import WifiIcon from '@material-ui/icons/NetworkCheck';
import TecladoIcon from '@material-ui/icons/Keyboard';

const CheckboxConIcono = (props) => {
	return <FormControlLabel
		control={
			<Checkbox 
				icon={props.icono} checkedIcon={props.icono} 
				onChange={ (evento) => props.cuandoCambia(props.nombre, evento.target.checked) }
				checked={props.estaCheckeado} 
				color={props.estaCheckeado ? 'primary' : 'secondary'}
			/>
		}
		label= {props.etiqueta}
	/>
}

export default function ToDoFiltros({setState, state, cuandoCambia}) {
	const avisarCuandoCambia= cuandoCambia || ( (estado) => console.log('ToDoFiltros cuandoCambia',estado) )
	//A: si no nos pasaron cuandoCambia definimos una que avise en la consola

	/*const [state, setState] = React.useState({
		escribir: true,
		wifi: true,
		pensar: true,
	});*/

	const handleChange = (nombre, estaCheckeado) => {
		const nuevoEstado= { ...state, [nombre]: estaCheckeado };
		setState(nuevoEstado);
		avisarCuandoCambia(nuevoEstado);
	};

	return (
		<FormGroup row>
			<CheckboxConIcono 
				nombre='escribir' etiqueta='Escribir'
				icono={< TecladoIcon />}
				estaCheckeado= {state.escribir}
				cuandoCambia= {handleChange}
			/>

			<CheckboxConIcono 
				nombre='wifi' etiqueta='WiFi'
				icono={< WifiIcon />}
				estaCheckeado= {state.wifi}
				cuandoCambia= {handleChange}
			/>

			<CheckboxConIcono 
				nombre='pensar' etiqueta='Pensar'
				icono={< PensarIcon />}
				estaCheckeado= {state.pensar}
				cuandoCambia= {handleChange}
			/>
		</FormGroup>
	);
}
