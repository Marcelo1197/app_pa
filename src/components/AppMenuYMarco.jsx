//FROM: https://material-ui.com/components/drawers/#responsive-drawer

import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link as RouterLink,
	useHistory,
} from "react-router-dom";
import Link from "@material-ui/core/Link";

import { useState, useEffect } from "react";
import { useRutasConLogin } from '../hooks/useRutasConLogin';
import { RutaConLogin } from './RutaConLogin';

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}));

const AccionNoImplementada = () => alert('¿Te animás a implementarla vos?');

function ListItemLink(props) {
	const rutasConLoginHook= useRutasConLogin()
	const { icon, primary, to, accion, cerrarMenu } = props;

	const renderLink = React.useMemo(
		() => React.forwardRef((itemProps, ref) => (
			<RouterLink to={to} ref={ref} {...itemProps} />
		)),
		[to],
	);


	const accionOk = accion || (to ? null : AccionNoImplementada);
	const onClick= (accionOk 
		? (() => {
			//DBG: console.log('Click',primary); 
			cerrarMenu();	
			accionOk(rutasConLoginHook);
			}) 
		: cerrarMenu); //A: paso el hook para que pueda ej logout

	const renderLinkOk = (to !=null) ? renderLink : ((itemProps) => (<Link {...itemProps}/>));
	//DBG: console.log('ListItemLink', primary, accionOk!=null, to)

	return (
		<li key={primary+'___'+to}>
			<ListItem button component={renderLinkOk} onClick={onClick} >
				{icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
				{to
					? <ListItemText primary={primary} />
					: primary
				}
			</ListItem>
		</li>
	);

}


//VER: https://material-ui.com/components/drawers/#persistent-drawer
export default function AppMenuLateral(props) {
	const classes = useStyles();
	const theme = useTheme();

	const [open, setOpen] = React.useState(false);
	const handleDrawerOpen = () => { setOpen(true); };
	const handleDrawerClose = () => { setOpen(false); };

	const BtnMenuAbrir = () => (
		<IconButton
			 color="inherit"
			 aria-label="open drawer"
			 onClick={handleDrawerOpen}
			 edge="start"
			 className={clsx(classes.menuButton, open && classes.hide)}
		 >
			 <MenuIcon />
		 </IconButton>
	);

	const BtnMenuCerrar = () => (
		<>
			<div className={classes.drawerHeader}>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</div>
			<Divider />
		</>
	)

	const BarraNavegacion = () => (
		<AppBar
			position="fixed"
			className={clsx(classes.appBar, { [classes.appBarShift]: open, })}
		>
			<Toolbar>
				<BtnMenuAbrir />
				<Typography variant="h6" noWrap>
					PodemosAprender
				</Typography>
			</Toolbar>
		</AppBar>
	);

	const LasRutas = () => (
		<main
			className={clsx(classes.content, { [classes.contentShift]: open, })}
		>
			<div className={classes.drawerHeader} />
				<Switch>
					{props.menu_y_rutas
						.filter((datosRuta) => (datosRuta.pagina!=null))
						.map((datosRuta, index) => (
							<RutaConLogin
								key={index}
								path={datosRuta.path}
								exact={datosRuta.esPrefijo!=true}
								children={<datosRuta.pagina />}
								necesitaLogin={!datosRuta.noNecesitaLogin}	
							/>
					))}
				</Switch>	
		</main>
	);
	
	const ItemsDelMenuConLinksALasRutas= () => (
		<List>
			{
				props.menu_y_rutas
				.map((ruta, index) => (
					ruta.divisor 
					? <Divider />
					: ruta.dsc
					? ( <ListItemLink accion={ruta.accion} to={ruta.path} icon={ruta.icono} primary={ruta.dsc} cerrarMenu={handleDrawerClose} /> )
					: null
				))
				.filter( e => e!=null) //A: solo si no son null
			}
		</List>
	);

	return (
		<Router>
			<div className={classes.root}>
				<CssBaseline />

				<BarraNavegacion />
		
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{ paper: classes.drawerPaper, }}
				>
					<BtnMenuCerrar />

					<ItemsDelMenuConLinksALasRutas />
				</Drawer>

				<LasRutas />
			</div>
		</Router>
	);
}
