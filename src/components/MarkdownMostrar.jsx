//INFO: mostrar markdown en un div

import { Children, useState, useEffect, createRef } from 'react';
import { markdownTransformarHTML, urlParamsParaDiccionario } from '../services/pa-lib';
import {useHistory} from "react-router-dom";

//TODO: mover a otro lado, independizar de Markdown
function urlDjangoAEstaApp(url,contexto) { //U: las del sitio html puro son distintas, las transformamos
	let dst= null;
	let params= {};
	params.fh_max= contexto.fh_max || new Date(new Date(contexto.fhCreado).getTime()+1);

	let m = url.match('^/charla/([^#]+)')
	if (m) { 
		params.charla= '#'+m[1];
		dst= `/textos/?` + urlParamsParaDiccionario(params);
	}
	//DBG: console.log('MarkdownMostrar link',h, dst);
	return dst;
}

function linkDjangoAEstaApp(link_el, contexto, history) { 
	if (link_el.attributes.procesado==null) { link_el.attributes.procesado= true;
		const h= link_el.attributes.href && link_el.attributes.href.textContent;
		const dst= h && urlDjangoAEstaApp(h, contexto);
		if (dst) {
			link_el.onclick= (e) => { history.push(dst); e.preventDefault(); return false; }
		}
	}
}

export default function MarkdownMostrar(props) {
	//VER: (marked) https://reactjs.org/docs/dom-elements.html
	const history= useHistory();
	const dom_element= createRef();

	useEffect( () => {
		if (dom_element.current) { //A: tengo un elemento en el dom
			const links= dom_element.current.querySelectorAll('a'); //A: links dentro de markdown
			//DBG: window.dbgLinks= links; console.log('links', links);
			links.forEach( l => linkDjangoAEstaApp(l, props.contexto, history));
		}
	})

	return (
		Children.map(props.children, md =>
		<div ref={dom_element} {...props}>
			<div  dangerouslySetInnerHTML={{__html: 
				markdownTransformarHTML( md ).markedHtml
			}} />
		</div>
		)
	)
}


