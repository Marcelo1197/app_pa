//INFO: comparar charlas, ej leer y actualizar una todo list con la API de PodemosAprender
jest.setTimeout(60000);

import PaApi, {desarrolloSolamenteUrl, apiConsultar, apiModificar} from '../../services/pa-api';
import * as util from '../../services/util';

//S: TODO: mover a las librerias *****************************
const logm= (msg, data) => {
	console.log(msg, JSON.stringify(data, null,1));
}

async function textoCrear(textoEnviado, charlaTitulo, orden) {
	logm('textoCrear',{charlaTitulo, orden, textoEnviado});
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


//S: Idea para preguntas y respuestas ************************
async function preguntaFormular(texto, enQueCharla, clave) {
	await textoCrear(texto, enQueCharla, `Pregunta/${clave}/P`); //TODO: debe existir, limitar largo y caracteres de la clave
}

async function preguntaPendientes(enQueCharla, clave) {
	return await charlaitemsAdiccionario(`Pregunta/${clave||''}`, enQueCharla, null, true);
}

async function preguntaResponder(textoRespuesta, enQueCharla, clavePregunta) {
	const claveRespuesta= new Date().getTime(); //TODO: o leemos un array de respuestas o le ponemos clave unica a c/u, esta NO es una clave unica muy segura pero zafa
	await textoCrear(textoRespuesta, enQueCharla, `Pregunta/${clavePregunta}/R/${claveRespuesta}`); //TODO: limitar largo y caracteres de la clave
}

async function preguntaRespondidas(enQueCharla, clave) {

}



//S: como se usa *********************************************

it('hacerPreguntasYRecibirRespuestas', async () => { 
	desarrolloSolamenteUrl('http://localhost:8000');
	const login_res= await PaApi.apiLogin('admin','secreto');
	//DBG: console.log("login_res",login_res);

	//UX: el usuario admin crea un ToDo en una charla, ej para la bandaReActiva
	const charlaModelo= '#borrame_preguntas_'+(new Date().getTime())

	for (let preguntaNum= 0; preguntaNum<5; preguntaNum++) {
		const textoSimulado= 'Desde #borrame_test_automatico a las '+(new Date());
		await preguntaFormular(textoSimulado, charlaModelo, `comoHago${preguntaNum}paso`);
	}
	//A: participanteA creo un todo con una lista de preguntas, las identifica el ORDEN

	//S: participanteB busca preguntas sin responder en esa charla y responde la 3 y la 4
	let username_participante= 'pepita';
	let login_participante_res= await PaApi.apiLogin(username_participante,'secreto');

	//UX: la participante pepita se copia la charla modelo a un plan suyo
	const paraResponder= await preguntaPendientes(charlaModelo);
	logm('paraResponder 1 ',paraResponder);

	const claves= Object.keys(paraResponder.Pregunta).sort()
	const preg3clave= claves[3]; //A: la pregunta 3
	const preg4clave= claves[4]; //A: la pregunta 3
	logm('vamos a responder0',{preg3clave, preg4clave});

	const preg3= paraResponder.Pregunta[preg3clave];
	await preguntaResponder('Respondiendo TRES '+new Date(), charlaModelo, preg3clave);

	const preg4= paraResponder.Pregunta[preg4clave];
	await preguntaResponder('Respondiendo CUATRO '+new Date(), charlaModelo, preg4clave);

	const preguntas= await preguntaPendientes(charlaModelo);
	logm('preguntas despues de pepita ',preguntas);
	//TODO: como filtro cuales me interesan? opcion1: les puedo cambiar la clave y que no empiece con Pregunta

	//S: participanteC busca preguntas sin responder en esa charla y responde la 3 y la 2
	username_participante= 'juan';
	login_participante_res= await PaApi.apiLogin(username_participante,'secreto');

	//A: omito las consultas anteriores por brevedad

	const preg2clave= claves[2]; //A: la pregunta 2
	logm('vamos a responder1',{preg3clave, preg2clave});

	await preguntaResponder('Respondiendo luego TRES '+new Date(), charlaModelo, preg3clave);

	const preg2= paraResponder.Pregunta[preg2clave];
	await preguntaResponder('Respondiendo luego DOS '+new Date(), charlaModelo, preg2clave);

	const preguntasDespuesDeJuan= await preguntaPendientes(charlaModelo);
	logm('preguntas despues de juan ',preguntasDespuesDeJuan);

	expect(Object.keys(preguntasDespuesDeJuan.Pregunta.comoHago3paso.R).length).toEqual(2);
	expect(Object.keys(preguntasDespuesDeJuan.Pregunta.comoHago4paso.R).length).toEqual(1);
});

