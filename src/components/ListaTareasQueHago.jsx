import React, { useState, useEffect } from 'react'
import { usePaApi, API_STATE_CARGANDO, API_STATE_ERROR, API_STATE_LISTO } from '../hooks/usePaApi';

import CircularProgress from '@material-ui/core/CircularProgress';

import CardTarea from "./CardTarea"

export const ListaTareasQueHago = (props) => {
  
  const [listaTareas] = usePaApi("http://127.0.0.1:8000/api/todos/");

  switch (listaTareas.status) {
    case API_STATE_CARGANDO:
      return <CircularProgress />
    case API_STATE_LISTO:
      return(
        <div>
          {listaTareas.data.map(dataTarea => <CardTarea  dataTarea={dataTarea}/>)}
        </div>
      )
    case API_STATE_ERROR:

    default:
      return <h1>ERROR</h1>
    
  }

}
