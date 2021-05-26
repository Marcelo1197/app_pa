//INFO: utiles para escribir tests

import PaApi, {desarrolloSolamenteUrl} from '../services/pa-api';
import {logmsg} from '../services/util';

export async function comoParticipante(username) { //U: se loguea como participante, asume todos tienen clave 'secreto'
	desarrolloSolamenteUrl('http://localhost:8000');
	const login_res= await PaApi.apiLogin(username,'secreto');
	logmsg('comoParticipante',{username,login_res});
}

