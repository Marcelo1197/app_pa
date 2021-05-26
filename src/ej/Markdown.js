import MarkdownMostrar from '../components/MarkdownMostrar';

export default function Inicio() {
	return (
		<MarkdownMostrar contexto={{}}>
		{`
## Esto esta en Markdown

Puedo usar todo lo que _markdown_ ya trae.

@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: another authentication Response
@enduml

		`}
		</MarkdownMostrar>
	)
} 
