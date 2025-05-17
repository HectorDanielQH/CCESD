import axios from "./axios.js";


export const obtenerFarmaciaRequest=(page,farmacia)=>axios.get('/obtenerfarmacias',{
    params:{
        page:page,
        limit:5,
        farmacia:farmacia
    }
});


export const obtenerFarmaciaPageRequest=()=>axios.get('/obtenerfarmaciaspage');

export const registrarFarmaciaRequest = (farmacia) => axios.post(`/registrarfarmacia`,farmacia);
export const eliminarFarmaciaRequest = (_id) => axios.delete(`/eliminarfarmacia/${_id._id}`);
export const editarFarmaciaRequest = (_id,newFarmacia) => axios.put(`/editarfarmacia/${_id._id}`,newFarmacia);