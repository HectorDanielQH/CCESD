import axios from "./axios.js";


export const obtenerLaboratorioRequest=(page,laboratorio)=>axios.get('/obtenerlaboratorios',{
    params:{
        page:page,
        limit:5,
        laboratorio:laboratorio
    }
});


export const obtenerLaboratorioPageRequest=()=>axios.get('/obtenerlaboratoriospage');

export const registrarLaboratorioRequest = (laboratorio) => axios.post(`/registrarlaboratorio`,laboratorio);
export const eliminarLaboratorioRequest = (_id) => axios.delete(`/eliminarlaboratorio/${_id._id}`);
export const editarLaboratorioRequest = (_id,newLaboratorio) => axios.put(`/editarlaboratorio/${_id._id}`,newLaboratorio);