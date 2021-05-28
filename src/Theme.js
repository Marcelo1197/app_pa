//INFO: crear uno o más temas seleccionables

import { createMuiTheme } from '@material-ui/core/styles';

//VER: https://material-ui.com/customization/color/#picking-colors
//VER: https://material-ui.com/customization/palette/#dark-mode
//VER: https://si.podemosaprender.org/charla/bandaUX_UI/#texto_321
export const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#ffd600",
		},
		secondary: {
			main: '#20fc85',
		},
    background: {
      default: '#EEE',
      paper: '#FFF',
    }
	},
});
