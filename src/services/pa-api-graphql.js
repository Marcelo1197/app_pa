//INFO: generar consultas a partir del esquema que devuelve graphene

function simplificarType(t) { 
	if (t.ofType) {
		let t0= t.ofType.name!=null ? t : t.ofType;
		const r= {t: t0.ofType.name}
		if (['SCALAR','INPUT_OBJECT'].indexOf(t0.kind)==-1 ) { r.k= t0.kind; }
		return r;
	}
	else {
		return {t: t.name}
	}
}

export function schemaSimplificadoPara(unSchemaDeDjangoGrapheneRelay) {
	const schemaSimple= {tipos: {}, consultas: {}, modificaciones: {}};

	const s0= unSchemaDeDjangoGrapheneRelay.data.__schema.types;
	s0.forEach(t => {
		if (t.name.startsWith('__')) return;
		//console.log(t.name,t.kind,Object.keys(t))
		if (t.name=='Consultas') {
			t.fields.forEach( q => {
				const e= simplificarType(q.type);
				e.params= {},
					q.args.forEach(a => {
						if (['first','last','offset','before','after'].indexOf(a.name)==-1) {
							e.params[a.name]= simplificarType(a.type);
						}
					})
				schemaSimple.consultas[q.name]= e;
			});
		}
		else if (t.name=='Modificaciones') {
			t.fields.forEach( modif => {
				const e= simplificarType(modif.type);
				e.params= {},
					modif.args.forEach(a => {
						e.params[a.name]= simplificarType(a.type);
					})
				schemaSimple.modificaciones[modif.name]= e;
			});
		}
		else {
			const e= {};
			if (t.inputFields) {
				e.params= {};
				t.inputFields.forEach( infield => {
					e.params[infield.name]= simplificarType(infield.type);
				});
			}
			if (t.fields) {
				e.fields= {};
				t.fields.forEach( field => {
					const f = simplificarType(field.type);
					if (field.args) {
						f.params= {};
						field.args.forEach(a => {
							if (['first','last','offset','before','after'].indexOf(a.name)==-1) {
								f.params[a.name]= simplificarType(a.type);
							}
						})
					}
					e.fields[field.name]= f;
				});
			}
			schemaSimple.tipos[t.name]= e;
		}
	});

	return schemaSimple;
}

function generarQueryPartes(t0, partes, schema) {
	let t= schema.tipos[t0];
	let r= ' ';
	let closing= '';
	//DBG: console.log('generarQueryPartes pre edges',t0,t);
	if (t.fields.edges) { r+='edges {'; closing+='} '; t= schema.tipos[t.fields.edges.t]; }
	if (t.fields.node) { r+='node {'; closing+='} '; t= schema.tipos[t.fields.node.t]; }
	//DBG: console.log('generarQueryPartes after edges',t0,t);
	partes.forEach(p => {
		if (Array.isArray(p)) {
			r+=(p[0]+' { ');
			//DBG: console.log('generarQueryPartes array',p[0], t0,t);
			const tParte= t.fields[p[0]].t
			//DBG: console.log('generarQueryPartes array',tParte, t0,t);
			r+=generarQueryPartes(tParte, p.slice(1), schema);
			r+=(' } ');
		}
		else {
			//DBG: console.log('PARTE',p,xt);
			r+= p+' ';
		}
	});
	r+=closing;
	return r;
}

export function generarQuery(qm, filtros, schema) {
	const q= schema.consultas[qm[0]] || schema.tipos[qm[0]];
	//DBG: console.log('generarQuery',qm,q);
	const param_s= generarParams(qm[0], filtros || {}, schema)
	const qs= (
		'{' +
			qm[0]+ 
			(param_s ? '('+param_s+')':'') 
			+' { ' + 
				generarQueryPartes(q.t, qm.slice(1), schema) + 
		'}}');
	//DBG: console.log('generarQuery',qs, qm);
	return qs;
}

export function generarMutationDfltQuery(modificacionId, schema) {
	const m= schema.modificaciones[modificacionId];
	const tm= schema.tipos[m.t];
	const tr= Object.keys(tm.fields).filter(k => k!='clientMutationId')[0];
	//DBG: console.log('generarMutationDfltQuery',modificacionId,tr,tm, m);
	const qs=  generarQueryPartes(m.t,[[tr,'id']], schema);
	//DBG: console.log('generarMutationDfltQuery',modificacionId, qs);
	return ' { ' +qs+' } ';
}

function generarParams(t,valores,schema) {
	const def= schema.consultas[t] || schema.tipos[t];
	const tipo_params= def.params;
	//DBG: console.log('generarParams',t, tipo_params);
	const param_s= Object.entries(valores).map( ([k,v]) => {
		if (v==null) { return '' }

		let t= tipo_params[k];
		//DBG: console.log(k,t);
		//TODO: otros tipos?
		const vs= 
			t.t=='DateTime'
			? JSON.stringify(new Date(v).toISOString())
			: JSON.stringify(v+'');

		return `${k}: ${vs}`	
	}).join(' ');
	return param_s;
}

export function generarMutation(modificacionId, modificacionValores, query, schema) {
	const m= schema.modificaciones[modificacionId];
	const qs= query ? generarQuery(query, null, schema) : generarMutationDfltQuery(modificacionId, schema);
	const param_s= generarParams(m.params.input.t, modificacionValores, schema)
	const ms= `mutation m_1 { ${modificacionId}(input: { ${param_s} }) ${ qs } }`
	//console.log('generarMutation',ms, modificacionId, modificacionValores);
	return ms;
}

/* U:

MiSchema= schemaSimplificadoPara(require('./graphql_schema_de_django.json'));
//DBG: console.log(JSON.stringify(MiSchema,null,2))
//U: QUERIES: Quiero conseguir 
qm= [ 
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

console.log( generarQuery(qm, null, MiSchema) );

console.log( generarMutationDfltQuery('textoModificar', MiSchema));

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

*/

export default function GraphqlGeneradorPara(schemaDeGrapheneDjango) {
	const schema= schemaSimplificadoPara(schemaDeGrapheneDjango);
	return {
		schema,
		consulta: function consulta(qm, filtros) { return generarQuery(qm, filtros, schema); },
		modificacion: function modificacion(modificacionId, modificacionValores, query) { return generarMutation(modificacionId, modificacionValores, query, schema); },
	};
}
