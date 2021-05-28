import TextoFiltros from '../../components/TextoFiltros';

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

function xpathFind(expr) {
	const xpath_res = document.evaluate(expr, document, null, XPathResult.ANY_TYPE, null);
	return xpath_res.iterateNext();
}

function click(el) {
	el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
}

//VER: https://reactjs.org/docs/testing-recipes.html
let container = null;
beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
	//A: setup a DOM element as a render target
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
	//A: cleanup on exiting
});

test('Un filtro solo, y lo elimino', () => { 
	const cuandoCambiaFiltros= jest.fn(); //VER: https://jestjs.io/docs/mock-functions
	const filtrosInicial= {fh_max: new Date().toISOString()};

	act( () => {
		render(
			<TextoFiltros filtros={filtrosInicial} setFiltros={cuandoCambiaFiltros} />,
			container
		)		
	});

	expect(container.textContent).toBe('ahora');

	const btnFHMax = xpathFind("//*[@role='button']//*[text()='ahora']"); //A: hay varios elementos dentro del button
	expect( btnFHMax ).not.toBeNull();
	act( () => { click(btnFHMax); });

	expect(cuandoCambiaFiltros.mock.calls.length).toBe(1); //A: la llamaron una vez
	expect(cuandoCambiaFiltros.mock.calls[0][0]).toEqual({fh_max: null}); //A: el parametro fue eliminar ese filtro

});

test('Varios filtros, elimino uno', () => { 
	const cuandoCambiaFiltros= jest.fn(); //VER: https://jestjs.io/docs/mock-functions
	const filtrosInicial= {fh_max: new Date().toISOString(), de: 'mauriciocap'};

	act( () => {
		render(
			<TextoFiltros filtros={filtrosInicial} setFiltros={cuandoCambiaFiltros} />,
			container
		)		
	});

	expect(container.textContent).toBe('ahoramauriciocap');
	//VER: https://devhints.io/xpath
	const btnFHMax = xpathFind("//*[@role='button']//*[text()='ahora']"); //A: hay varios elementos dentro del button
	expect( btnFHMax ).not.toBeNull();
	act( () => { click(btnFHMax); });

	expect(cuandoCambiaFiltros.mock.calls.length).toBe(1); //A: la llamaron una vez
	expect(cuandoCambiaFiltros.mock.calls[0][0]).toEqual({fh_max: null, de: 'mauriciocap'}); //A: el parametro fue eliminar ese filtro

});
