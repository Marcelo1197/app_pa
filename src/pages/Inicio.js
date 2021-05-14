import Link from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";

export default function Inicio() {
	return (
		<>
			<h2>Home</h2>
			Podes ir a 
			<Link component={RouterLink} to="/que-hago">
				¿Qué hago?
			</Link>
			Podes ir a 
			<Link component={RouterLink} to="/charla/bandadjango">
				#bandadjango
			</Link>
		</>
	)
} 
