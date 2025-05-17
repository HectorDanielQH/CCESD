import axios from "./axios.js";

export const registrarhorario = (horario)=>axios.post('/registrarhorario',horario);