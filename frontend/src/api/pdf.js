import axios from "./axios.js";

export const obtenerPDFRequest=(id, valores)=>axios.get('/recetamedica/'+id,valores);

export const pdfListaPacienteDoctor=(idPaciente,fechaInicio,fechaFin)=>axios.get('/pdflistapaciente',
{
    params:{
        idPaciente:idPaciente,
        fechaInicio:fechaInicio,
        fechaFin:fechaFin
    }
});


export const pdfListaDoctor=(fechaInicio,fechaFin)=>axios.get('/pdflista',
    {
        params:{
            fechaInicio:fechaInicio,
            fechaFin:fechaFin
        }
    });


export const listatotalpacientes=()=>axios.get('/listatotalpacientes');

export const pdfListaporDoctor=(idDoctor,fechaInicio,fechaFin)=>axios.get('/pdflistarpordoctor',
    {
        params:{
            idDoctor:idDoctor,
            fechaInicio:fechaInicio,
            fechaFin:fechaFin
        }
    });