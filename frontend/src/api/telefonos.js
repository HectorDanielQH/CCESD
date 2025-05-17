import axios from "./axios.js";


export const obtenerTelefonoRequest=(page,telefono)=>axios.get('/obtenertelefono',{
    params:{
        page:page,
        limit:5,
        telefono:telefono
    }
});


export const obtenerTelefonoPageRequest=()=>axios.get('/obtenertelefonopage');

export const registrarTelefonoRequest = (telefono) => axios.post(`/registrartelefono`,telefono);
export const eliminarTelefonoRequest = (_id) => axios.delete(`/eliminartelefono/${_id._id}`);
export const editarTelefonoRequest = (_id,newTelefono) => axios.put(`/editartelefono/${_id._id}`,newTelefono);