//INFO: ejemplo de como escribir tests UNITARIOS locales

import { fechaLegible } from '../services/pa-lib.js'; //A: importas las funciones para testear

test('fechaLegible', () => { //A: escribis test con descripciones claras de que testeas y que debe pasar
	const ref= '2021-05-17T08:17:41.168Z';
	expect( fechaLegible(ref, ref) ).toBe('ahora');
	expect( fechaLegible('2021-05-17T08:16:11.168Z', ref) ).toBe('hace 2minutos');
	expect( fechaLegible('2021-05-17T03:16:11.168Z', ref) ).toBe('hace 5.0horas');
	expect( fechaLegible('2021-04-25T03:16:11.168Z', ref) ).toBe('hace 22.2días');
	expect( fechaLegible('2021-01-22T03:16:11.168Z', ref) ).toBe('hace 16.5semanas');
	expect( fechaLegible('2020-01-22T03:16:11.168Z', ref) ).toBe('1/22/2020, 12:16:11 AM');
	//A: en este caso agrupe varios expect ... toBe pq es una funcion simple, sino separo en tests distintos
});
