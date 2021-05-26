//INFO: comparar charlas, ej leer y actualizar una todo list con la API de PodemosAprender
jest.setTimeout(20000);

import PaApi, {desarrolloSolamenteUrl, apiConsultar, apiModificar} from '../../services/pa-api';
import * as util from '../../services/util';

//S: TODO: mover a las librerias *****************************
const logm= (msg, data) => {
	console.log(msg, JSON.stringify(data, null,1));
}

async function charlaAdiccionario(charlaTitulo, username, quiereAnidados) {
	const texto_lista_res= await apiConsultar(
		['textoLista', 'id','texto','fhCreado',['charlaitemSet','orden']], 
		{'*charla_Titulo': charlaTitulo, '*deQuien_Username': username}
	);
	const r= {};
	texto_lista_res.forEach( item => {	
		//DBG: logm('ITEM',charlaTitulo,item);
		let orden= item.charlaitemSet[0].orden;
		if (! orden.startsWith('_')) {
			if (quiereAnidados) { util.set_p(r, '/'+orden, item); }
			else { r[orden]= item; }
		}
	});
	//DBG: console.log('Tareas',JSON.stringify(Tareas,null,1));
	return r;
}

//S: como se usa *********************************************

//TODO: mostrar como crear la charla, etc.
it('leerUnaCharlaComoDiccionario', async () => { 
	desarrolloSolamenteUrl('http://localhost:8000');
	const login_res= await PaApi.apiLogin('admin','secreto');
	//DBG: console.log("login_res",login_res);

	//UX: el usuario admin crea un ToDo en una charla, ej para la bandaReActiva
	const charlaModelo= '#ej_diccionario'

	//UX: la participante pepita se copia la charla modelo a un plan suyo
	const charlaComoDicc= await charlaAdiccionario(charlaModelo,null,true);
	logm('tareasYestado MODELO',charlaComoDicc);
});

