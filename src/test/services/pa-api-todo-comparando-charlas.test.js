//INFO: comparar charlas, ej leer y actualizar una todo list con la API de PodemosAprender
import * as PaApiDatos from '../../services/pa-api-datos';
import * as TestUtil from '../util';
import {logmsg} from '../../services/util';

jest.setTimeout(20000);

//S: TODO: mover a las librerias *****************************

//S: idea para todo ******************************************
async function todoTareas(charlaModelo) {
	const charlaDicc= await PaApiDatos.charlaAdiccionario(charlaModelo,null,false);
	logmsg('tareasYestado',{charlaDicc});
	const Tareas= {};
	Object.entries(charlaDicc).forEach( ([orden, txt]) => {
		Tareas[orden]= {consigna: txt.texto};
	});
	logmsg('tareasYestado', {Tareas});	
	return Tareas;
}

async function todoTareasYEstado(charlaModelo, username) {
	const Tareas= await todoTareas(charlaModelo);
	const Evidencia= await todoTareas(charlaModelo+'_segun_'+username);
	Object.entries(Tareas).forEach( ([k,tarea]) => {
		tarea.evidencia= Evidencia[k]?.consigna;
	});
	return Tareas;
}

async function todoRegistrarEvidencia(charlaModelo, username, tareaId, textoOnull) {
	const charlaRegistro= charlaModelo+'_segun_'+username;
	const texto= textoOnull || `EVIDENCIA de la tarea ${tareaId} de ${charlaModelo}`;
	await PaApiDatos.textoCrear(texto, charlaRegistro, tareaId);
}

//S: como se usa *********************************************

it('crearLeerYActualizarTodo', async () => { 
	await TestUtil.comoParticipante('admin');

	const charlaModelo= '#borrame_todo_'+(new Date().getTime())
	const textoSimulado= 'Desde #borrame_test_automatico a las '+(new Date());
	for (let tareaNum= 0; tareaNum<5; tareaNum++) {
		await PaApiDatos.textoCrear(`CONSIGNA de la tarea${tareaNum} de ${charlaModelo} ${textoSimulado}`, charlaModelo, `Tarea_${tareaNum}`);
	}
	//A: participanteA creo un todo con una lista de tareas, las identifica el ORDEN

	//S: participanteB consulta y anota evidencia para algunas tareas
	await TestUtil.comoParticipante('pepita');
	const tareasYestado0= await todoTareasYEstado(charlaModelo, 'pepita');
	const tareasId= Object.keys(tareasYestado0);
	logmsg('tareasYestado INICIAL',tareasYestado0);

	await todoRegistrarEvidencia(charlaModelo, 'pepita', tareasId[1]);
	await todoRegistrarEvidencia(charlaModelo, 'pepita', tareasId[3]);

	const tareasYestado1= await todoTareasYEstado(charlaModelo, 'pepita');
	logmsg('tareasYestado DESPUES',tareasYestado1);
});

