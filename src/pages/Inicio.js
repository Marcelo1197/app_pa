import React from 'react'; //U: necesario despues de transformar jsx
import MarkdownMostrar from '../components/MarkdownMostrar';

export default function Inicio() {
	return (
		<MarkdownMostrar contexto={{}}>
		{`
## ¡Que bueno que estés acá!

Creamos esta app para ayudarte a que

* cuando tengas un ratito libre
* te enfoque en avanzar algo que te importa

Todavía la estamos inventando. ¿Te gustaría ayudarnos y aparecer en los créditos? Puede ser

* Escribiendo código con la #bandaReActiva , #bandadjango , #bandatesting
* Dibujando pantallas, haciendo experimientos, investigando otras apps con la #bandaUX_UI
* Simplemente contando qué te gustaría y como te fue

Puede que algunas opciones del menú te pidan usuario y clave, si todavía no los creaste

1. Ingresá a https://si.podemosaprender.org
2. Registrate con Facebook o Gmail
3. Aprovecha y asociá todas tus cuentas
4. Agregale una clave a tu cuenta

Se puede desplegar en glitch

		`}
		</MarkdownMostrar>
	)
} 
