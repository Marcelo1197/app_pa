//INFO: un todo list filtrable por tengo teclado, tiempo disponible, etc.
import React, { useState, useEffect } from 'react'

import InboxIcon from "@material-ui/icons/MoveToInbox";
import Badge from "@material-ui/core/Badge";

import CheckboxList from '../components/todo_list';
import CheckboxFiltros from '../components/todo_filtros';
import { ListaTareasQueHago } from '../components/ListaTareasQueHago';

//TODO: reunir las partes, conectar para que filtre

function IconoQueHago() {
	return (
		<Badge badgeContent={4} color="primary">
			<InboxIcon />
		</Badge>
  )
}

function PaginaQueHago() {
	const [state, setState] = React.useState({
		escribir: true,
		wifi: true,
		pensar: true,
	});

	return (
		<>
			<CheckboxList />
			<CheckboxFiltros setState={setState} state={state}/>
			<ListaTareasQueHago state={state}/>
		</>
	)
}

export default {IconoQueHago, PaginaQueHago};
