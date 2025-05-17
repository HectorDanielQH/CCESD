import axios from "./axios.js";

export const obteneratencionPacienteRequest=(page,atencion)=>axios.get('/obteneratencionpaciente',{
    params:{
        page:page,
        limit:5,
        atencion:atencion
    }
});


export const obteneratencionPacienteDoctorRequest=(page,paciente)=>axios.get('/obteneratencionpacientedoctor',{
    params:{
        page:page,
        limit:5,
        paciente:paciente
    }
});

export const registrarAtencionRequest = (paciente) => axios.post(`/registraratencion`,paciente);

 
/**DOCTOR */
export const registrarAtencionDoctorRequest = (id) => axios.post(`/registraratenciondoctor`,{id:id});
export const registrarAtencionVirtualDoctorRequest = (virtual) => axios.post('/registraratencionvirtualdoctor',virtual);
export const registrarAtencionRecetaDoctorRequest = (receta) => axios.post('/registraratencionrecetadoctor',receta);

export const obtenerFarmaciaPageRequest=()=>axios.get('/obtenerfarmaciaspage');
export const eliminarFarmaciaRequest = (_id) => axios.delete(`/eliminarfarmacia/${_id._id}`);
export const editarFarmaciaRequest = (_id,newFarmacia) => axios.put(`/editarfarmacia/${_id._id}`,newFarmacia);