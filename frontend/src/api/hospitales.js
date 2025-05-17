import axios from "./axios.js";


export const obtenerHospitalRequest=(page,hospital)=>axios.get('/obtenerhospitales',{
    params:{
        page:page,
        limit:5,
        hospital:hospital
    }
});


export const obtenerHospitalPageRequest=()=>axios.get('/obtenerhospitalespage');

export const registrarHospitalRequest = (hospital) => axios.post(`/registrarhospital`,hospital);
export const eliminarHospitalRequest = (_id) => axios.delete(`/eliminarhospital/${_id._id}`);
export const editarHospitalRequest = (_id,newHospital) => axios.put(`/editarhospital/${_id._id}`,newHospital);