import { buildPDF } from '../libs/pdfKit.js';
import Atencion from '../models/atencion.model.js';

export const pdfReceta = async (req, res) => {
    const receta = await Atencion.findById(req.params.id);
    res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=invoice.pdf"
    });

    buildPDF(
        receta,
        (data) => res.write(data),
        () => res.end()
    );
};

export const pdfListaPacienteDoctor = async (req, res) => {
    const {idPaciente,fechaInicio,fechaFin} = req.query;
    const fechainicio = new Date(fechaInicio);
    const fechafin = new Date(fechaFin);
    
    fechafin.setHours(23, 59, 59, 999);
    const atenciones = await Atencion.find({
        idPaciente: idPaciente,
        createdAt: {
            $gte: fechainicio,
            $lte: fechafin
        }
    });
    return res.json(atenciones);
};

export const pdfListaDoctor= async (req, res) => {
    const {fechaInicio,fechaFin} = req.query;
    const fechainicio = new Date(fechaInicio);
    const fechafin = new Date(fechaFin);
    
    fechafin.setHours(23, 59, 59, 999);
    const atenciones = await Atencion.find({
        createdAt: {
            $gte: fechainicio,
            $lte: fechafin
        }
    });
    return res.json(atenciones);
};