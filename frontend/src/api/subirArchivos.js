import axios from "./axios.js";


export const guardarArchivosRequest = (archivo) => axios.post('/subirArchivo',archivo, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const obtenerArchivosRequest=()=>axios.get('/obtenerarchivos');
