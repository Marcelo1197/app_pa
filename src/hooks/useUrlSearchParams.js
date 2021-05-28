//INFO: extraer valores de url query params ej textos/?autor=mauriciocap
//VER: https://reactrouter.com/web/example/query-parameters

import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';

export function useUrlSearchParams() { //U: extraer valores de url query params ej textos/?autor=mauriciocap, reaccionar solo cuando cambian los valores
	const reactLocation = useLocation();

	const [values, set_values]= useState({});

	//DBG: console.log('useUrlSearchParams',reactLocation.search);
	const ps= new URLSearchParams(reactLocation.search);
	const keys= Array.from(ps.keys());
	let hayNuevosOdistintos= false;
	const dest= {};
	keys.forEach(k => { 
		dest[k]= ps.get(k); //A: por las dudas los voy guardando
		//DBG: console.log('useUrlSearchParams par vs value',ps.get(k),values[k], hayNuevosOdistintos);
		if ( ps.get(k) != values[k] ) { hayNuevosOdistintos= true; }
	});		
	if (hayNuevosOdistintos) { 
		//DBG: console.log('useUrlSearchParams hayNuevosOdistintos',dest,values);
		set_values(dest); 
	}
	else {
		const algunosYaNoEstan= Object.keys(values).find(k => dest[k]==null);
		if (algunosYaNoEstan) {
			//DBG: console.log('useUrlSearchParams algunosYaNoEstan',dest,values);
			set_values(dest);
		}
	}
; //A: SOLO cuando cambian los parametros tipo /?fecha_min=...

	return values;
}

