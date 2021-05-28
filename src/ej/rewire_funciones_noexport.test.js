import m from './services/pa-api-graphql.js';

it('works', () => {
	const x= m.__get__('simplificarType');
	console.log(x+'');
	console.log(m.simplificarType+'');
});

