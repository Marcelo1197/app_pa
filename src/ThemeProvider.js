//INFO: un contexto para obtener y cambiar el Tema visual (colores, etc.)
//VER: https://github.com/mui-org/material-ui/blob/master/docs/src/modules/components/ThemeContext.js

//U: podes probar ej. en la consola  tema_cambiar({colores:{primary: { main: '#00FF00'}, background: {default: '#909090'}}})

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	ThemeProvider as MuiThemeProvider,
	createMuiTheme,
	darken,
} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { blue, pink, grey } from '@material-ui/core/colors'; //U: paletas predefinidas de Material UI

//S: definiciones iniciales **********************************
const opcionesIniciales = {
	colores: {},
	dense: false,
	spacing: 8, //U: spacing unit
	masOpciones: {}, //U: para cambiar cualquier cosa de todo el tema
};

const highDensity = {
	props: {
		MuiButton: { size: 'small', },
		MuiFilledInput: { margin: 'dense', },
		MuiFormControl: { margin: 'dense', },
		MuiFormHelperText: { margin: 'dense', },
		MuiIconButton: { size: 'small', },
		MuiInputBase: { margin: 'dense', },
		MuiInputLabel: { margin: 'dense', },
		MuiListItem: { dense: true, },
		MuiOutlinedInput: { margin: 'dense', },
		MuiFab: { size: 'small', },
		MuiTable: { size: 'small', },
		MuiTextField: { margin: 'dense', },
		MuiToolbar: { variant: 'dense', },
	},
	overrides: {
		MuiIconButton: {
			sizeSmall: { //A: minimal touch target hit spacing
				marginLeft: 4,
				marginRight: 4,
				padding: 12,
			},
		},
	},
};

//S: Un componente que provee un contexto con el tema ********
export const DispatchContext = React.createContext(() => {
	throw new Error('Forgot to wrap component in `ThemeProvider`');
});
if (import.meta.env.NODE_ENV !== 'production') {
	DispatchContext.displayName = 'ThemeDispatchContext';
}

export function ThemeProvider(props) {
	const { children } = props;

	const [opcionesTema, setOpcionesTema]= useState(opcionesIniciales);

	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const preferredType = prefersDarkMode ? 'dark' : 'light';

	const { dense, colores, tipoPaleta = preferredType, spacing, masOpciones } = opcionesTema;
	
	const tema = React.useMemo(() => {
		const paletaDflt= {
			primary: {
				main: tipoPaleta === 'light' ? blue[700] : blue[200],
			},
			secondary: {
				main: tipoPaleta === 'light' ? darken(pink.A400, 0.1) : pink[200],
			},
			type: tipoPaleta,
			background: {
				default: tipoPaleta === 'light' ? '#fff' : '#121212',
				level2: tipoPaleta === 'light' ? grey[100] : '#333',
				level1: tipoPaleta === 'light' ? '#fff' : grey[900],
			},
		};

		const temaNuevo = createMuiTheme(
			{
				palette: {
					...paletaDflt,		//DFLT: los puede cambiar colores
					...colores,
				},
				spacing,
			},
			dense ? highDensity : null,
			masOpciones
		);


		return temaNuevo;
	}, [dense, colores, tipoPaleta, spacing, masOpciones]);

	const tema_cambiar= React.useCallback(
		(opciones) => { setOpcionesTema(opciones); return tema }, 
		[setOpcionesTema]
	);

	React.useEffect(() => { //A: exponer como variable global en la consola, otro js
		window.tema_cambiar= tema_cambiar;
	}, [setOpcionesTema]);

	return (
		<MuiThemeProvider theme={tema}>
			<DispatchContext.Provider value={tema_cambiar}>{children}</DispatchContext.Provider>
		</MuiThemeProvider>
	);
}

ThemeProvider.propTypes = {
	children: PropTypes.node,
};

export function useCambiarTemaVisual() {
	const tema_cambiar = React.useContext(DispatchContext);
	return React.useCallback(tema_cambiar, [tema_cambiar]);
}
