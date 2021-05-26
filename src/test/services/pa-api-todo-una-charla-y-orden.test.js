//INFO: comparar charlas, ej leer y actualizar una todo list con la API de PodemosAprender
import * as PaApiDatos from '../../services/pa-api-datos';
import * as TestUtil from '../util';
import {logmsg} from '../../services/util';

jest.setTimeout(20000);

//S: TODO: mover a las librerias *****************************

//S: como se usa *********************************************

it('crearLeerYActualizarTodoEnUnaCharla', async () => { 
	//UX: el usuario admin crea un ToDo en una charla, ej para la bandaReActiva
	await TestUtil.comoParticipante('admin');
	const charlaModelo= '#borrame_todo_'+(new Date().getTime())
	const textoSimulado= 'Desde #borrame_test_automatico a las '+(new Date());
	for (let tareaNum= 0; tareaNum<5; tareaNum++) {
		await PaApiDatos.textoCrear(`CONSIGNA de la tarea${tareaNum} de ${charlaModelo} ${textoSimulado}`, charlaModelo, `ToDo/Tarea_${tareaNum}`);
	}
	//A: participanteA creo un todo con una lista de tareas, las identifica el ORDEN

	//S: participanteB copia a SU todo, consulta y anota evidencia para algunas tareas
	const username_participante= 'pepita';
	await TestUtil.comoParticipante(username_participante);
	//UX: la participante pepita se copia la charla modelo a un plan suyo
	const modelo= await PaApiDatos.charlaAdiccionario(charlaModelo,null,true);
	logmsg('tareasYestado MODELO',{modelo});

	const charlaDeParticipante= charlaModelo+'_para_'+username_participante;
	logmsg('XC', {charlaDeParticipante});
	const tareas= Object.entries(modelo.ToDo);
	for (let i=0; i<tareas.length; i++) { let [k,v]=tareas[i];
		logmsg('X',{k,charlaDeParticipante,v});
		await PaApiDatos.textoCrear(v.texto, charlaDeParticipante, 'ToDo/'+k); //TODO: linkear el texto con charlaitem
	}
	//A: participante copio la charla a sus todos
	
	//UX: a medida que pepita va terminando tareas (ToDo) agrega evidencia de que las termino, se ordenan abajo
	const tareaQueTermino= Object.keys(modelo.ToDo)[1]; //A: asi la elegiria en la UI
	await PaApiDatos.textoCrear('me.salio.re.bien #borrame', charlaDeParticipante, 'ToDo/'+tareaQueTermino+'/evidencia/url'); 
	const tareaQueDuda= Object.keys(modelo.ToDo)[3]; //A: asi la elegiria en la UI
	await PaApiDatos.textoCrear('No entiendo nada! #borrame', charlaDeParticipante, 'ToDo/'+tareaQueTermino+'/pregunta/1'); 

	//UX: cualquiera puede tomar una charla y ver que tareas estan pendientes, la evidencia, etc.
	const estado= await PaApiDatos.charlaAdiccionario(charlaDeParticipante,null,true);
	logmsg('tareasYestado ESTADO despues de evidencia y pregunta',estado);
});

