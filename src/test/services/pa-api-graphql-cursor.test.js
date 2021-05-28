//INFO: comparar charlas, ej leer y actualizar una todo list con la API de PodemosAprender
import PaApi, {desarrolloSolamenteUrl, apiConsultar, apiModificar} from '../../services/pa-api';
import * as util from '../../services/util';
import {logmsg} from '../../services/util';

jest.setTimeout(60000);

//S: TODO: mover a las librerias *****************************
async function textoCrear(textoEnviado, charlaTitulo, orden) {
	logmsg('textoCrear',{charlaTitulo, orden, textoEnviado});
	const res= await apiModificar(	
		'textoModificar', 
		{texto: textoEnviado, charlaTitulo, orden}, 
		['texto','id','texto']
	);
	return res;
}

async function charlaitemsAdiccionario(ordenEmpiezaCon, charlaTitulo, username, quiereAnidados) {
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
	texto_lista_res.forEach( item => {	
		//DBG: logmsg('ITEM',{charlaTitulo,item});
		let orden= item.orden;
		if (! orden.startsWith('_')) {
			if (quiereAnidados) { util.set_p(r, '/'+orden, item); }
			else { r[orden]= item; }
		}
		//DBG: logmsg('ITEM',{charlaTitulo,item,r});

		//TODO: consultemos en textos O en charlaItem, devolvamos siempre en el mismo formato (ahora item es un charlaitem) 
	});
	//DBG: console.log('Tareas',JSON.stringify(Tareas,null,1));
	return r;
}


//S: como se usa *********************************************

it('hacerPreguntasYRecibirRespuestas', async () => { 
	const CuantosTextos= 8;
	const CuantosPorConsulta= 3;

	desarrolloSolamenteUrl('http://localhost:8000');
	const login_res= await PaApi.apiLogin('admin','secreto');
	//DBG: console.log("login_res",login_res);

	//UX: el usuario admin crea un ToDo en una charla, ej para la bandaReActiva
	const charlaModelo= '#borrame_cursor_'+(new Date().getTime())

	for (let textoNum= 0; textoNum<CuantosTextos; textoNum++) {
		const textoSimulado= 'Desde #borrame_test_automatico a las '+(new Date());
		await textoCrear(textoSimulado, charlaModelo, `paso${(textoNum+'').padStart(3,'0')}`);
	}
	//A: participanteA creo un todo con una lista de preguntas, las identifica el ORDEN

	let testVistos= 0;
	let testConsultas= 0;
	
	let hayMas= true; //DFLT
	let cursor= null; //U: desde donde seguir
	while (hayMas) {
		const lista_res= await apiConsultar(
			['charlaitemLista', 'id', 'orden', 
				['texto', 'texto', 'fhCreado'],
				['charla', 'titulo'],
				['pageInfo', 'endCursor', 'hasNextPage', 'startCursor','hasPreviousPage']
			], 
			{'*charla_Titulo': charlaModelo, first: CuantosPorConsulta, after: cursor}
		);
		hayMas= lista_res.pageInfo.hasNextPage;
		cursor= lista_res.pageInfo.endCursor;

		testVistos+= lista_res.datos.length;
		testConsultas++;

		logmsg('Pagina',{testVistos, hayMas, cursor, lista_res});
	}
	logmsg('Fin cursor',{testVistos});
	expect(testVistos).toBe(CuantosTextos);
	expect(testConsultas).toBe(Math.ceil(CuantosTextos/CuantosPorConsulta));
});

