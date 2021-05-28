//INFO: para juntar los valores de input usando el name o id
//U: le pasas cuandoCambiaInput al onChange de input fields
//U: les pones un id o name que los distinga
//U: recibis el valor en valores

import { useState } from "react";

export function useInput(valoresIniciales) {
	const [valores, setValores] = useState(valoresIniciales || {});
	const cuandoCambiaInput = (e) => {
		setValores({...valores, [e.target.name||e.target.id]: (e.target.value||'').trim()}); 
	}

	return [valores, setValores, cuandoCambiaInput];
}


