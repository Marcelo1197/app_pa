//INFO: leer y actualizar una todo list con la API de PodemosAprender

import PaApi, {desarrolloSolamenteUrl} from '../../services/pa-api.js';
import GraphqlGeneradorPara, {GraphQlSchemaQuery} from '../../services/pa-api-graphql';

const logm= (msg, data) => {
	console.log(msg, JSON.stringify(data, null,1));
}

let Generador_= null; //U: cache si ya me traje el esquema
async function apiGQL() {
	if (Generador_) { return Generador_ };
	const res= await PaApi.fetchConToken({
		query: GraphQlSchemaQuery,
		operationName: 'IntrospectionQuery',
	});	
	//TODO: control de errores
	Generador_= GraphqlGeneradorPara(res);	
	console.log(JSON.stringify(Generador_.schema,null,2));
	return Generador_;
}

async function textoCrear(textoEnviado, charlaTitulo, orden) {
	const qs= (await apiGQL()).modificacion(
		'textoModificar', 
		{texto: textoEnviado, charlaTitulo, orden}, 
		['texto','id','texto']
	);
	const res= await PaApi.fetchConToken({ query: qs });	
	//DBG: 
	console.log(JSON.stringify(res,null,1));
	expect(res.data.textoModificar.texto.texto).toMatch(textoEnviado);
	return res;
}

async function todoTareas(charlaModelo) {
	const qs= (await apiGQL()).consulta(
		['textoLista', 'id','texto','fhCreado',['deQuien','username'],['charlaitemSet','orden']], 
		{enCharla: charlaModelo}
	);
	const todo_list_res= await PaApi.fetchConToken({query: qs});

	//console.log('TodoLista\n'+ JSON.stringify(todo_list_res,null,1));
	const Tareas= {};
	for (let tareaNum= 0; tareaNum<todo_list_res.data.textoLista.edges.length; tareaNum++) {
		let item= todo_list_res.data.textoLista.edges[tareaNum].node;
		logm('ITEM',item);
		let orden= item.charlaitemSet.edges[0].node.orden;
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

it('apiGetSchema', async () => { 
	desarrolloSolamenteUrl('http://localhost:8000');
	const login_res= await PaApi.apiLogin('admin','secreto');
	await apiGQL();	
})
	
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

