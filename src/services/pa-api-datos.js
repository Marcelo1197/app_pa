//INFO: encapsular como representamos las cosas en el servidor/graphql

import {apiConsultar, apiModificar} from './pa-api';
import * as util from './util';
import { logmsg } from './util';

let DBG=0; //U: para controlar cuanto loguea este modulo

export async function textoCrear(textoEnviado, charlaTitulo, orden) {
	const res= await apiModificar(	
		'textoModificar', 
		{texto: textoEnviado, charlaTitulo, orden}, 
		['texto','id','texto']
	);
	return res;
}

export async function charlaitemsAdiccionario(ordenEmpiezaCon, charlaTitulo, username, quiereAnidados) {
	//TODO: a lo mejor consigo la lista de charlaitem de otro lado, separar
	//TODO: agregar filtros que sean directo en el codigo (sin graphql)
	const texto_lista_res= await apiConsultar(
		['charlaitemLista', 'id', 'orden', 
			['texto', 'texto','fhCreado', 'fhEditado', ['deQuien','username'] ],
			['charla', 'titulo'],
		], 
		{'*orden_Startswith': ordenEmpiezaCon, '*charla_Titulo': charlaTitulo, '*deQuien_Username': username}
	);
	const r= {};
	texto_lista_res.datos.forEach( item => {	
		//DBG: logm('ITEM',{charlaTitulo,item});
		let orden= item.orden;
		if (! orden.startsWith('_')) {
			if (quiereAnidados) { util.set_p(r, '/'+orden, item); }
			else { r[orden]= item; }
		}
		//DBG: logm('ITEM',{charlaTitulo,item,r});

		//TODO: consultemos en textos O en charlaItem, devolvamos siempre en el mismo formato (ahora item es un charlaitem) 
	});
	//DBG: console.log('Tareas',JSON.stringify(Tareas,null,1));
	return r;
}


export function charlaAdiccionario(charlaTitulo, username, quiereAnidados) {
	return charlaitemsAdiccionario(null, charlaTitulo, username, quiereAnidados);
}


