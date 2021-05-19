//INFO: generar consultas a partir del esquema que devuelve graphene

import {schemaSimplificadoPara, generarQuery, generarMutation } from '../../services/pa-api-graphql';

it('Genera consultas y modificaciones', () => {
	//TODO: convertir en un test verdadero

	const MiSchema= schemaSimplificadoPara(require('../../ej/graphql_schema_de_django.json'));
	//DBG: console.log(JSON.stringify(MiSchema,null,2))
	//U: QUERIES: Quiero conseguir 
	const qm= [ 
		'textoLista', 
		'texto', 
		['deQuien','username'], 
		['charlaitemSet', 
			['charla', 
				'titulo',
				['deQuien','username']
			], 
			'orden'
		]
	]

	console.log( generarQuery(qm, MiSchema) );

	console.log( generarMutation(
		'textoModificar', 
		{
			texto: `Parar #borrame_test_automatico ${new Date().toISOString()}`, 
			charlaTitulo: '#borrame_charla_1',
			orden: (new Date()+'').substr(15,10),
		},
		null,
		MiSchema
	));

	console.log( generarMutation(
		'textoModificar', 
		{
			texto: `Parar #borrame_test_automatico ${new Date().toISOString()}`, 
			charlaTitulo: '#borrame_charla_1',
			orden: (new Date()+'').substr(15,10),
		},
		['texto','id',['deQuien','username']],
		MiSchema
	));

});
