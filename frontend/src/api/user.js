import axios from "./axios.js";

export const actualizarUsernameRequest = (username,email) => axios.put(`/actualizarnombreusuario`,{username, email});
export const actualizarCorreoElectronicoRequest = (emailpast, emailnew) => axios.put(`/actualizarcorreoelectronico`,{emailpast, emailnew});
export const actualizarContrasenaRequest = (password, email) => axios.put(`/actualizarcontrasena`, {password, email});

export const profileActualizar=(id)=>axios.get(`/profile/${id._id}`)