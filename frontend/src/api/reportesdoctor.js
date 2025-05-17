import axios from "./axios.js";

export const obtenerpacientes = (idDoctor)=>axios.get('/obtenerpacientes',{
    params:{
        idDoctor:idDoctor
    }
});