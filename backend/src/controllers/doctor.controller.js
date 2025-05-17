import Atencion from '../models/atencion.model.js';
import User from "../models/user.model.js";

export const pacientesPorDoctor= async(req, res)=>{
    const {idDoctor}=req.query;
    const pacientes = await Atencion.find({idDoctor:idDoctor});
    return res.json(pacientes,200);
}


export const registrarhorario = async(req, res)=>{
    try {
        const { horarioatencion, id } = req.body;

        if (!horarioatencion || !id) {
            return res.status(400).json({ message: 'Faltan datos requeridos.' });
        }

        const usuario = await User.findByIdAndUpdate(
            id, 
            { horarios: horarioatencion },
            { new: true }
        );

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        return res.status(200).json({ message: 'Horario actualizado exitosamente.', usuario });
    } 
    catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el horario.', error });
    }
}