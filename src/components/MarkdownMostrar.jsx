//INFO: mostrar markdown en un div

import { Children, useState } from 'react';
import { markdownTransformarHTML } from '../services/pa-lib';

export default function MarkdownMostrar(props) {
	//VER: (marked) https://reactjs.org/docs/dom-elements.html
	return (
		Children.map(props.children, md =>
		<div {...props}>
			<div  dangerouslySetInnerHTML={{__html: 
				markdownTransformarHTML( md ).markedHtml
			}} />
		</div>
		)
	)
}


