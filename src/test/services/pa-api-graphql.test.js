//INFO: generar consultas a partir del esquema que devuelve graphene

import GraphqlGeneradorPara from '../../services/pa-api-graphql';


it('Genera consultas y modificaciones', () => {
	//TODO: convertir en un test verdadero

	const apiGQL= GraphqlGeneradorPara(require('../../ej/graphql_schema_de_django.json'));

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

	console.log( apiGQL.consulta(qm) );
	console.log( apiGQL.consulta(qm, {fhCreado_Gt: new Date()}) );

	console.log( apiGQL.modificacion(
		'textoModificar', 
		{
			texto: `Parar #borrame_test_automatico ${new Date().toISOString()}`, 
			charlaTitulo: '#borrame_charla_1',
			orden: (new Date()+'').substr(15,10),
		},
		null
	));

	console.log( apiGQL.modificacion(
		'textoModificar', 
		{
			texto: `Parar #borrame_test_automatico ${new Date().toISOString()}`, 
			charlaTitulo: '#borrame_charla_1',
			orden: (new Date()+'').substr(15,10),
		},
		['texto','id',['deQuien','username']]
	));

});
