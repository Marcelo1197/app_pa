/*

U: asi consigo una lista de textos que mencionan a pepita, mas reciente arriba, puedo usar de cursor

{ charlaitemLista(charla_Titulo: "@pepita", orderBy: ["-texto__fhEditado"]) {
	edges {
		node {
			texto { 
				fhEditado
				deQuien {
					username
				}
				charlaitemSet {
					edges { node {
						charla { titulo }
					}}
				}
			}
		}
	}
} }

*/

