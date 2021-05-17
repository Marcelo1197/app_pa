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

test('Vacio si no hay filtros', () => { 
	const cuandoCambiaFiltros= jest.fn(); //VER: https://jestjs.io/docs/mock-functions
	const filtrosInicial= {fh_max: new Date().toISOString()};

	act( () => {
		render(
			<TextoFiltros filtros={filtrosInicial} setFiltros={cuandoCambiaFiltros} />,
			container
		)		
	});

	expect(container.textContent).toBe('ahora');

	const btnFHMax = xpathFind("//button//*[text()='ahora']"); //A: hay varios elementos dentro del button
	act( () => { click(btnFHMax); });
	expect(cuandoCambiaFiltros.mock.calls.length).toBe(1);
	expect(cuandoCambiaFiltros.mock.calls[0][0]).toEqual({fh_max: null});
});
