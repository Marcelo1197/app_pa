//INFO: comparar charlas, ej leer y actualizar una todo list con la API de PodemosAprender
jest.setTimeout(20000);

import PaApi, {desarrolloSolamenteUrl, apiConsultar, apiModificar} from '../../services/pa-api';
import * as util from '../../services/util';

//S: TODO: mover a las librerias *****************************
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

async function charlaAdiccionario(charlaTitulo, username, quiereAnidados) {
	const texto_lista_res= await apiConsultar(
		['textoLista', 'id','texto','fhCreado',['charlaitemSet','orden']], 
		{'*charla_Titulo': charlaTitulo, '*deQuien_Username': username}
	);
	const r= {};
	texto_lista_res.forEach( item => {	
		//DBG: 
		logm('ITEM',charlaTitulo,item);
		let orden= item.charlaitemSet[0].orden;
		if (! orden.startsWith('_')) {
			if (quiereAnidados) { util.set_p(r, '/'+orden, item); }
			else { r[orden]= item; }
		}
	});
	//DBG: console.log('Tareas',JSON.stringify(Tareas,null,1));
	return r;
}

//S: idea para todo ******************************************
async function todoTareasYEstado(charla, username) {
	const todoDicc= await charlaAdiccionario(charla, username);
	const r={};
	Object.keys(todoDicc).sort().forEach( ([k,tarea]) => {
		tarea.evidencia= Evidencia[k];
	});
	return Tareas;
}

async function todoRegistrarEvidencia(charlaModelo, username, tareaId) {
	const charlaRegistro= charlaModelo+'_segun_'+username;
	await textoCrear(`EVIDENCIA de la tarea ${tareaId} de ${charlaModelo}`, charlaRegistro, tareaId);
}

//S: como se usa *********************************************

it('crearLeerYActualizarTodoEnUnaCharla', async () => { 
	desarrolloSolamenteUrl('http://localhost:8000');
	const login_res= await PaApi.apiLogin('admin','secreto');
	//DBG: console.log("login_res",login_res);

	const charlaModelo= '#borrame_todo_'+(new Date().getTime())

	const textoSimulado= 'Desde #borrame_test_automatico a las '+(new Date());
	for (let tareaNum= 0; tareaNum<5; tareaNum++) {
		await textoCrear(`CONSIGNA de la tarea${tareaNum} de ${charlaModelo} ${textoSimulado}`, charlaModelo, `ToDo/Tarea_${tareaNum}`);
	}
	//A: participanteA creo un todo con una lista de tareas, las identifica el ORDEN

	//S: participanteB copia a SU todo, consulta y anota evidencia para algunas tareas
	const username_participante= 'pepita';
	const login_participante_res= await PaApi.apiLogin(username_participante,'secreto');

	const modelo= await charlaAdiccionario(charlaModelo,null,true);
	logm('tareasYestado MODELO',modelo);

	const charlaDeParticipante= charlaModelo+'_para_'+username_participante;
	logm('XC', charlaDeParticipante);
	const tareas= Object.entries(modelo.ToDo);
	for (let i=0; i<tareas.length; i++) { let [k,v]=tareas[i];
		logm('X',k,charlaDeParticipante,v);
		await textoCrear(v.texto, charlaDeParticipante, 'ToDo/'+k); //TODO: linkear el texto con charlaitem
	}
	//A: participante copio la charla a sus todos
	
	const tareaQueTermino= Object.keys(modelo.ToDo)[1]; //A: asi la elegiria en la UI
	await textoCrear('me.salio.re.bien #borrame', charlaDeParticipante, 'ToDo/'+tareaQueTermino+'/evidencia/url'); 
	const tareaQueDuda= Object.keys(modelo.ToDo)[3]; //A: asi la elegiria en la UI
	await textoCrear('No entiendo nada! #borrame', charlaDeParticipante, 'ToDo/'+tareaQueTermino+'/pregunta/1'); 

	const estado= await charlaAdiccionario(charlaDeParticipante,null,true);
	logm('tareasYestado ESTADO despues de evidencia y pregunta',estado);
});

