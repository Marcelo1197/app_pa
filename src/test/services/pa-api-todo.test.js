//INFO: leer y actualizar una todo list con la API de PodemosAprender

import PaApi, {desarrolloSolamenteUrl, apiConsultar, apiModificar} from '../../services/pa-api.js';

const logm= (msg, data) => {
	console.log(msg, JSON.stringify(data, null,1));
}

async function textoCrear(textoEnviado, charlaTitulo, orden) {
	const res= await apiModificar(	
		'textoModificar', 
		{texto: textoEnviado, charlaTitulo, orden}, 
		['texto','id','texto']
	);
	expect(res.texto.texto).toMatch(textoEnviado);
	return res;
}

async function todoTareas(charlaModelo) {
	const todo_list_res= await apiConsultar(
		['textoLista', 'id','texto','fhCreado',['deQuien','username'],['charlaitemSet','orden']], 
		{'*charla_Titulo': charlaModelo}
	);
	//console.log('TodoLista\n'+ JSON.stringify(todo_list_res,null,1));
	const Tareas= {};
	for (let tareaNum= 0; tareaNum<todo_list_res.length; tareaNum++) {
		let item= todo_list_res[tareaNum];
		logm('ITEM',item);
		let orden= item.charlaitemSet[0].orden;
		if (! orden.startsWith('_')) {
			Tareas[orden]= {consigna: item.texto};
		}
	}
	//DBG: console.log('Tareas',JSON.stringify(Tareas,null,1));
	return Tareas;
}

async function todoTareasYEstado(charlaModelo, username) {
	const Tareas= await todoTareas(charlaModelo);
	const Evidencia= await todoTareas(charlaModelo+'_segun_'+username);
	Object.entries(Tareas).forEach( ([k,tarea]) => {
		tarea.evidencia= Evidencia[k];
	});
	return Tareas;
}

async function todoRegistrarEvidencia(charlaModelo, username, tareaId) {
	const charlaRegistro= charlaModelo+'_segun_'+username;
	await textoCrear(`EVIDENCIA de la tarea ${tareaId} de ${charlaModelo}`, charlaRegistro, tareaId);
}

jest.setTimeout(20000);
it('crearLeerYActualizarTodo', async () => { 
	desarrolloSolamenteUrl('http://localhost:8000');
	const login_res= await PaApi.apiLogin('admin','secreto');
	//DBG: console.log("login_res",login_res);

	//S: crear una todo list
	const charlaModelo= '#borrame_todo_'+(new Date().getTime())
	const textoSimulado= 'Desde #borrame_test_automatico a las '+(new Date());
	for (let tareaNum= 0; tareaNum<5; tareaNum++) {
		await textoCrear(`CONSIGNA de la tarea${tareaNum} de ${charlaModelo} ${textoSimulado}`, charlaModelo, `Tarea_${tareaNum}`);
	}
	//A: participanteA creo un todo con una lista de tareas, las identifica el ORDEN

	//S: participanteB consulta y anota evidencia para algunas tareas
	const login_pepita_res= await PaApi.apiLogin('pepita','secreto');
	const tareasYestado0= await todoTareasYEstado(charlaModelo, 'pepita');
	logm('tareasYestado INICIAL',tareasYestado0);

	await todoRegistrarEvidencia(charlaModelo, 'pepita', Object.keys(tareasYestado0)[1]);
	const tareasYestado1= await todoTareasYEstado(charlaModelo, 'pepita');
	logm('tareasYestado DESPUES',tareasYestado1);
});

