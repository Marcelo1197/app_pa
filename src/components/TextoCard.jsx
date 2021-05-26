import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { useHistory } from 'react-router-dom';
import { urlParamsParaDiccionario } from '../services/pa-lib';
import { fechaLegible, fechasSonIguales, fechaParaTexto } from '../services/pa-lib';
import MarkdownMostrar from '../components/MarkdownMostrar';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: '80vw',
		margin: '10px',
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
	},
}));

export default function TextoCard({texto, urlSearchParams}) {
	const history = useHistory();
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const LinkTextoTo= {pathname: `/texto/${texto.textoId}`, state: texto}
	const LinkParticipanteTo= { search: '?'+urlParamsParaDiccionario({ ...urlSearchParams, de:texto.deQuien}), state: texto}

	const hue= texto.deQuien.split('').reduce( (acc,c) => (acc+c.charCodeAt(0)), 0) % 360; //TODO: buscar una formula que separe mas los colores

	return (
		<Card className={classes.root}>
			<CardHeader
				onClick={() => history.push(LinkTextoTo)}
				avatar={
					<Avatar aria-label="participante" 
						className={classes.avatar} style={{backgroundColor: `hsl(${hue},90%,20%)`}}
					>
						{texto.deQuien[0]}
					</Avatar>
				}
				action={
					<IconButton aria-label="menu tarjeta texto">
						<MoreVertIcon />
					</IconButton>
				}
				title={<Link to={LinkParticipanteTo}>{texto.deQuien}</Link>}
				subheader={fechaLegible( texto.fhEditado || texto.fhCreado )}
			/>

			<CardContent>
				<MarkdownMostrar 
						contexto={texto}
						style={{maxHeight: '10em', maxWidth: '80vw', overflow: 'hidden'}}
				>
					{texto.texto.substr(0,300)}
				</MarkdownMostrar>
			</CardContent>

			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
}
