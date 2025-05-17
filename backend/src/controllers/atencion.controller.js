import Atencion from '../models/atencion.model.js';

export const pacientesTotal= async(req, res)=>{
    const pacientes = await Atencion.find();
    return res.json(pacientes,200);
}

export const pacientepordoctor= async(req, res)=>{
    const {idDoctor,fechaInicio,fechaFin} = req.query;
    const fechainicio = new Date(fechaInicio);
    const fechafin = new Date(fechaFin);
    
    fechafin.setHours(23, 59, 59, 999);
    const atenciones = await Atencion.find({
        idDoctor: idDoctor,
        createdAt: {
            $gte: fechainicio,
            $lte: fechafin
        }
    });
    return res.json(atenciones);
}