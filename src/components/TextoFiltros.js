//INFO: editar los filtros aplicados a textos

import { fechaLegible } from '../services/pa-lib';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CharlaIcon from '@material-ui/icons/Chat';
import FHMaxIcon from '@material-ui/icons/Schedule';
import DeIcon from '@material-ui/icons/Person';

export default function TextoFiltros({filtros, setFiltros}) {
	const cuandoPideBorrar= (k) => {
		setFiltros({ ...filtros, [k]: null });
	}

	return (
		<div>
			{ Object.entries(filtros).map( ([k,v]) => {
				let txt= k; let icon=null;

				//TODO: se puede generalizar para cualquier set de filtros
				if (k=='fh_max') { txt= fechaLegible(v); icon= <FHMaxIcon />; }
				else if (k=='charla') { txt= v; icon= <CharlaIcon />; }
				else if (k=='de') { txt=v; icon= <DeIcon />; }

				return (
					<Button
						key={k}
						startIcon={icon}
						onClick={() => cuandoPideBorrar(k)}

						endIcon={<DeleteIcon />}
						variant="contained"
					>{txt}</Button>
				)
			})}
		</div>
	)
}

