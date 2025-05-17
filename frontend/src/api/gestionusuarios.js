import axios from "./axios.js";

export const obtenerUsuariosRequest = (page,username) => axios.get('/obtenerusuarios',{
    params:{
        page:page,
        limit:5,
        username:username
    }
});
export const registrarUsuariosRequest = (usuario) => axios.post(`/registrarusuarios`,usuario);
export const eliminarUsuariosRequest = (_id) => axios.delete(`/eliminarusuarios/${_id._id}`);
export const editarUsuariosRequest = (_id,newUser) => axios.put(`/editarusuarios/${_id._id}`,newUser);