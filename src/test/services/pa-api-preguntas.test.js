//INFO: comparar charlas, ej leer y actualizar una todo list con la API de PodemosAprender
import * as PaApiDatos from '../../services/pa-api-datos';
import * as TestUtil from '../util';
import {logmsg} from '../../services/util';

jest.setTimeout(60000);

//S: TODO: mover a las librerias *****************************

//S: Idea para preguntas y respuestas ************************
async function preguntaFormular(texto, enQueCharla, clave) {
	await PaApiDatos.textoCrear(texto, enQueCharla, `Pregunta/${clave}/P`); //TODO: debe existir, limitar largo y caracteres de la clave
}

async function preguntaPendientes(enQueCharla, clave, username) {
	return await PaApiDatos.charlaitemsAdiccionario(`Pregunta/${clave||''}`, enQueCharla, username, true);
}


async function preguntaResponder(textoRespuesta, enQueCharla, clavePregunta) {
	const claveRespuesta= new Date().getTime(); //TODO: o leemos un array de respuestas o le ponemos clave unica a c/u, esta NO es una clave unica muy segura pero zafa
	await PaApiDatos.textoCrear(textoRespuesta, enQueCharla, `Pregunta/${clavePregunta}/R/${claveRespuesta}`); //TODO: limitar largo y caracteres de la clave
}

async function preguntaRespondidas(enQueCharla, clave) {

}



//S: como se usa *********************************************

it('hacerPreguntasYRecibirRespuestas', async () => { 
	await TestUtil.comoParticipante('admin');

	//UX: el usuario admin crea un ToDo en una charla, ej para la bandaReActiva
	const charlaModelo= '#borrame_preguntas_'+(new Date().getTime())

	for (let preguntaNum= 0; preguntaNum<5; preguntaNum++) {
		const textoSimulado= 'Desde #borrame_test_automatico a las '+(new Date());
		await preguntaFormular(textoSimulado, charlaModelo, `comoHago${preguntaNum}paso`);
	}
	//A: participanteA creo un todo con una lista de preguntas, las identifica el ORDEN

	//UX: participanteB busca preguntas sin responder en esa charla y responde la 3 y la 4
	let username_participante= 'pepita';
	await TestUtil.comoParticipante(username_participante);

	const paraResponder= await preguntaPendientes(charlaModelo);
	logmsg('paraResponder 1 ',paraResponder);

	const claves= Object.keys(paraResponder.Pregunta).sort()
	const preg3clave= claves[3]; //A: la pregunta 3
	const preg4clave= claves[4]; //A: la pregunta 3
	logmsg('vamos a responder0',{preg3clave, preg4clave});

	const preg3= paraResponder.Pregunta[preg3clave];
	await preguntaResponder('Respondiendo TRES '+new Date(), charlaModelo, preg3clave);

	const preg4= paraResponder.Pregunta[preg4clave];
	await preguntaResponder('Respondiendo CUATRO '+new Date(), charlaModelo, preg4clave);

	const preguntas= await preguntaPendientes(charlaModelo);
	logmsg('preguntas despues de pepita ',preguntas);
	//TODO: como filtro cuales me interesan? opcion1: les puedo cambiar la clave y que no empiece con Pregunta

	//UX: participanteC busca preguntas sin responder en esa charla y responde la 3 y la 2
	username_participante= 'juan';
	await TestUtil.comoParticipante(username_participante);

	//A: omito las consultas anteriores por brevedad

	const preg2clave= claves[2]; //A: la pregunta 2
	logmsg('vamos a responder1',{preg3clave, preg2clave});

	await preguntaResponder('Respondiendo luego TRES '+new Date(), charlaModelo, preg3clave);

	const preg2= paraResponder.Pregunta[preg2clave];
	await preguntaResponder('Respondiendo luego DOS '+new Date(), charlaModelo, preg2clave);

	const preguntasDespuesDeJuan= await preguntaPendientes(charlaModelo);
	logmsg('preguntas despues de juan ',preguntasDespuesDeJuan);

	expect(Object.keys(preguntasDespuesDeJuan.Pregunta.comoHago3paso.R).length).toEqual(2);
	expect(Object.keys(preguntasDespuesDeJuan.Pregunta.comoHago4paso.R).length).toEqual(1);

	//UX: el que hizo una pregunta quiere ver las respuestas más recientes
	username_participante= 'admin';
	await TestUtil.comoParticipante(username_participante);

	const preguntasDeAdmin= await preguntaPendientes(charlaModelo,null,username_participante);
	logmsg('preguntas de usuario', {username_participante, preguntasDeAdmin});

});

