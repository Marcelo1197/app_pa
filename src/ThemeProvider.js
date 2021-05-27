//INFO: un contexto para obtener y cambiar el Tema visual (colores, etc.)
//VER: https://github.com/mui-org/material-ui/blob/master/docs/src/modules/components/ThemeContext.js

import React from 'react';
import PropTypes from 'prop-types';
import {
	ThemeProvider as MuiThemeProvider,
	createMuiTheme,
	darken,
} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { blue, pink } from '@material-ui/core/colors'; //U: paletas predefinidas de Material UI

//S: definiciones iniciales **********************************
const themeInitialOptions = {
	dense: false,
	direction: 'ltr',
	paletteColors: {},
	spacing: 8, // spacing unit
};

const highDensity = {
	props: {
		MuiButton: {
			size: 'small',
		},
		MuiFilledInput: {
			margin: 'dense',
		},
		MuiFormControl: {
			margin: 'dense',
		},
		MuiFormHelperText: {
			margin: 'dense',
		},
		MuiIconButton: {
			size: 'small',
		},
		MuiInputBase: {
			margin: 'dense',
		},
		MuiInputLabel: {
			margin: 'dense',
		},
		MuiListItem: {
			dense: true,
		},
		MuiOutlinedInput: {
			margin: 'dense',
		},
		MuiFab: {
			size: 'small',
		},
		MuiTable: {
			size: 'small',
		},
		MuiTextField: {
			margin: 'dense',
		},
		MuiToolbar: {
			variant: 'dense',
		},
	},
	overrides: {
		MuiIconButton: {
			sizeSmall: {
				// minimal touch target hit spacing
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

	//VER: https://reactjs.org/docs/hooks-reference.html#usereducer
	const [themeOptions, dispatch] = React.useReducer((state, action) => {
		switch (action.type) {
			case 'SET_SPACING':
				return {
					...state,
					spacing: action.payload,
				};
			case 'INCREASE_SPACING': {
				return {
					...state,
					spacing: state.spacing + 1,
				};
			}
			case 'DECREASE_SPACING': {
				return {
					...state,
					spacing: state.spacing - 1,
				};
			}
			case 'SET_DENSE':
				return {
					...state,
					dense: action.payload,
				};
			case 'RESET_DENSITY':
				return {
					...state,
					dense: themeInitialOptions.dense,
					spacing: themeInitialOptions.spacing,
				};
			case 'RESET_COLORS':
				return {
					...state,
					paletteColors: themeInitialOptions.paletteColors,
				};
			case 'CHANGE':
				return {
					...state,
					paletteType: action.payload.paletteType || state.paletteType,
					direction: action.payload.direction || state.direction,
					paletteColors: action.payload.paletteColors || state.paletteColors,
				};
			default:
				throw new Error(`Unrecognized type ${action.type}`);
		}
	}, themeInitialOptions);

	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const preferredType = prefersDarkMode ? 'dark' : 'light';
	const { dense, paletteColors, paletteType = preferredType, spacing } = themeOptions;

	const theme = React.useMemo(() => {
		const nextTheme = createMuiTheme(
			{
				palette: {
					primary: {
						main: paletteType === 'light' ? blue[700] : blue[200],
					},
					secondary: {
						main: paletteType === 'light' ? darken(pink.A400, 0.1) : pink[200],
					},
					type: paletteType,
					background: {
						default: paletteType === 'light' ? '#fff' : '#121212',
					},
					...paletteColors,
				},
				spacing,
			},
			dense ? highDensity : null,
		);

		nextTheme.palette.background.level2 =
			paletteType === 'light' ? nextTheme.palette.grey[100] : '#333';

		nextTheme.palette.background.level1 =
			paletteType === 'light' ? '#fff' : nextTheme.palette.grey[900];

		return nextTheme;
	}, [dense, paletteColors, paletteType, spacing]);

	React.useEffect(() => { //A: exponer como variable global en la consola, otro js
		window.theme = theme;
	}, [theme]);

	return (
		<MuiThemeProvider theme={theme}>
			<DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
		</MuiThemeProvider>
	);
}

ThemeProvider.propTypes = {
	children: PropTypes.node,
};

/**
 * @returns {(nextOptions: Partial<typeof themeInitialOptions>) => void}
 */
export function useChangeTheme() {
	const dispatch = React.useContext(DispatchContext);
	return React.useCallback((options) => dispatch({ type: 'CHANGE', payload: options }), [dispatch]);
}
