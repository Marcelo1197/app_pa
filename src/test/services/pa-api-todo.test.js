//INFO: leer y actualizar una todo list con la API de PodemosAprender

import PaApi, {desarrolloSolamenteUrl} from '../../services/pa-api.js';

const logm= (msg, data) => {
	console.log(msg, JSON.stringify(data, null,1));
}

const QTextoModificar= `
mutation TextoModificar($texto: String!, $charla_titulo: String!, $orden: String!) { 
	textoModificar(input: {texto: $texto, orden: $orden, charlaTitulo: $charla_titulo} ) 
	{ clientMutationId texto { id texto } } 
}
`
const QTextoListaDeCharla= `
query TextoLista($enCharla: String!) { 
	textoLista(enCharla: $enCharla ) 
	{ edges { node { 
		id deQuien { username } fhEditado texto 
		charlaitemSet(charla_Titulo: $enCharla) {
      edges { node { orden }}
    }
	}}}
}
`	

async function textoCrear(textoEnviado, charla_titulo, orden) {
	const res= await PaApi.fetchConToken({
		query: QTextoModificar, 
		variables: {texto: textoEnviado, charla_titulo, orden},
	});	
	//DBG: console.log(JSON.stringify(res,null,1));
	expect(res.data.textoModificar.texto.texto).toMatch(textoEnviado);
	return res;
}

async function todoTareas(charlaModelo) {
	const todo_list_res= await PaApi.fetchConToken({
		query: QTextoListaDeCharla,
		variables: {enCharla: charlaModelo},
	});	

	//console.log('TodoLista\n'+ JSON.stringify(todo_list_res,null,1));
	const Tareas= {};
	for (let tareaNum= 0; tareaNum<todo_list_res.data.textoLista.edges.length; tareaNum++) {
		let item= todo_list_res.data.textoLista.edges[tareaNum].node;
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


fit('crearLeerYActualizarTodo', async () => { 

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

