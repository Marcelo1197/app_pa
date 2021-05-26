import { useEffect, useState } from "react";

import { fetchConToken } from "../services/pa-api";

export const useHookState = (estadoInicial) => {
  const [hookState, setHookState] = useState(estadoInicial);
  const setPartData = (
    partialData //U: Actualizar consistentemente el estado
  ) => setHookState((prevState) => ({ ...prevState, ...partialData }));

  return [hookState, setHookState, setPartData];
};

export const API_STATE_CARGANDO = { state: "CARGANDO" };
export const API_STATE_ERROR = { state: "ERROR" };
export const API_STATE_LISTO = { state: "LISTO" };

const fetchData = async (url, opciones, setPartData) => {
  setPartData({
    status: API_STATE_CARGANDO,
    error: "",
    data: [],
  });
  //A: Actualizamos el estado a LOADING y no tenemos data.

  try {
    const res = await fetchConToken(url, opciones);

    if (!res.ok) {
      //A: Ej no me pude conectar
      setPartData({
        status: API_STATE_ERROR,
        error: res.statusText || "Ups, error en la request",
      });
      return;
      //A: Error grave, actualicé el estado y terminé
    }

    const data = await res.json();
    setPartData({
      status: API_STATE_LISTO,
      data: data,
    });
  } catch (err) {
    setPartData({
      status: API_STATE_ERROR,
      error: err.message || "Error res.json",
    });
  }
};
//DBG: 
window.fetchData = fetchData;

export const usePaApi = (url, opciones = {}) => {
	// eslint-disable-next-line
  const [hookState, setHookState, setPartData] = useHookState({
    //U: Devolvemos un estado de React que lanza eventos para actualizar la pantalla
    status: API_STATE_CARGANDO,
    error: "",
    data: [],
  });

  useEffect(() => {
    setTimeout(
      () => fetchData(url, opciones, setPartData),
      opciones.EMU_DEMORA || 0
    );
  }, [url]);

  return [hookState];
};
