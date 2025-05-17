import axios from "./axios.js";

export const guardarComunicadoRequest = (comunicado) => axios.post('/registrarcomunicado', comunicado, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
});

export const obtenerComunicadosRequest=(page)=>axios.get('/obtenercomunicados',{
  params:{
      page:page,
      limit:5,
  }
});

export const eliminarComunicadoRequest=(_id) => axios.delete(`/eliminarcomunicado/${_id._id}`);

export const obtenerComunicadosPage=()=>axios.get('/obtenercomunicadospage');