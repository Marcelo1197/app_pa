//INFO: generar consultas a partir del esquema que devuelve graphene

import GraphqlGeneradorPara from '../../services/pa-api-graphql';

const normalizarEspacios = (s) => (s.replace(/\s+/g,' ').trim());

const generarQueryPartes= GraphqlGeneradorPara.__get__('generarQueryPartes');

const apiGQL= GraphqlGeneradorPara(require('../../ej/graphql_schema_de_django.json'));
const schema= apiGQL.schema; //U: por comodidad

const GraphqlPageInfo= ['pageInfo','hasPreviousPage','hasNextPage','startCursor','endCursor'];
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

it('generarQueryPartes elemento simple', () => {
	const graphqlGenerado= generarQueryPartes('UserNode', ['username'], {}, schema);
	expect( normalizarEspacios( graphqlGenerado )).toEqual('username');
})

it('generarQueryPartes elemento compuesto', () => {
	const graphqlGenerado= generarQueryPartes('TextoNode', [['deQuien','username']], {}, schema);
	expect( normalizarEspacios( graphqlGenerado )).toEqual('deQuien { username }');
})

it('generarQueryPartes elemento con edges', () => {
	const graphqlGenerado= generarQueryPartes('TextoNodeConnection', ['fhCreado',['deQuien','username']], {}, schema);
	expect( normalizarEspacios( graphqlGenerado )).toEqual('edges { node { fhCreado deQuien { username } } }');
})

it('generarQueryPartes elemento con edges y pageInfo', () => {
	const graphqlGenerado= generarQueryPartes('TextoNodeConnection', ['fhCreado',['deQuien','username'],GraphqlPageInfo], {}, schema);
	expect( normalizarEspacios( graphqlGenerado )).toEqual(
		"pageInfo { hasPreviousPage hasNextPage startCursor endCursor } edges { node { fhCreado deQuien { username } } }"
	);
})

it('generarQueryPartes elemento con edges y filtros', () => {
	const d0= new Date();
	const graphqlGenerado= generarQueryPartes(
		'TextoNodeConnection', ['fhCreado',['deQuien','username'],['charlaSet','titulo']], 
		{'*fhCreado_Lt': d0}, 
		schema
	);
	expect( normalizarEspacios( graphqlGenerado )).toEqual(`edges { node { fhCreado deQuien { username } charlaSet( fhCreado_Lt: "${d0.toISOString()}" ) { edges { node { titulo } } } } }`);
})

it('generarQueryPartes elemento con edges y filtros', () => {
	const charlaTitulo='#borrame';
	const username='admin';
	const graphqlGenerado= generarQueryPartes(
		'TextoNodeConnection', ['textoLista', 'id','texto','fhCreado',['charlaitemSet','orden']],
    {'*charla_Titulo': charlaTitulo, '*deQuien_Username': username},
		schema
	);
	expect( normalizarEspacios( graphqlGenerado )).toEqual(
		"edges { node { id texto fhCreado charlaitemSet( charla_Titulo: \"#borrame\" ) { edges { node { orden } } } } }"
	);
});
	
it('generaConsulta con edges, filtros, y pageInfo', () => {
	const d0= new Date();
	const q= [ 
		'textoLista', 
		GraphqlPageInfo,
		'texto', 
		['deQuien','username'], 
		['charlaSet', 
			'titulo',
			['deQuien','username']
		]
	];	
	const graphqlGenerado= apiGQL.consulta(
		q, 
		{fhCreado_Gt: d0, orderBy: ['fhCreado','fhEditado'], '*charla_Titulo': '#borrame'}
	);
	expect( normalizarEspacios( graphqlGenerado )).toEqual(
		"{textoLista( orderBy: [\"fhCreado\", \"fhEditado\"] fhCreado_Gt: \""+d0.toISOString()+"\" charla_Titulo: \"#borrame\" ) { pageInfo { hasPreviousPage hasNextPage startCursor endCursor } edges { node { texto deQuien { username } charlaSet( fhCreado_Gt: \""+d0.toISOString()+"\" ) { edges { node { titulo deQuien { username } } } } } } }}"
	);
});

it('Modificacion', () => {
	const d0= new Date();
	const params= 	{
			texto: `Parar #borrame_test_automatico ${d0.toISOString()}`, 
			charlaTitulo: '#borrame_charla_1',
			orden: (d0+'').substr(15,10),
	};
	const graphqlGenerado= apiGQL.modificacion(
		'textoModificar', 
		params,
		['texto','id',['deQuien','username']]
	);
	expect( normalizarEspacios( graphqlGenerado )).toEqual(
		"mutation m_1 { textoModificar(input: { texto: \""+ params.texto +
		"\" charlaTitulo: \""+params.charlaTitulo+
		"\" orden: \""+params.orden+
		"\" }) {texto { id deQuien { username } }} }"
	);
})

it('Genera consultas y modificaciones', () => {
	//TODO: convertir en un test verdadero

	//DBG: dump schema console.log('SCHEMA SIMPLIFICADO',JSON.stringify(apiGQL.schema, null, 2));

	//DBG: console.log(JSON.stringify(MiSchema,null,2))
	//U: QUERIES: Quiero conseguir 

	console.log( apiGQL.consulta(qm) );
	console.log( apiGQL.consulta(qm, {fhCreado_Gt: new Date(), orderBy: ['fhCreado']}) );
	console.log( apiGQL.consulta(qm, {fhCreado_Gt: new Date(), orderBy: ['fhCreado'], '*charla_Titulo': '#estaCharla'}) );

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
