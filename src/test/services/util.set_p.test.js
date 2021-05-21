import * as util from '../../services/util';

it('soporta claves como las de Pregunta y Respuesta', () => {
	const r= {};
	util.set_p(r, "/Pregunta/comoHago2paso/P", 'pregunta');
	util.set_p(r, "/Pregunta/comoHago2paso/R/1621633474948", 'respuesta');
	console.log(JSON.stringify(r));
});
