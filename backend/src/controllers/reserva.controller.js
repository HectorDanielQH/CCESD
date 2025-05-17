import Atencion from '../models/atencion.model.js';
import User from "../models/user.model.js";

import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const registrarAtencion = async (req,res)=>{
    const {tipoatencion,domicilio,celular}=req.body;
    const {token}=req.cookies;

    if(!token)
        return res.status(401).json({message:"No autorizado"});

    jwt.verify(token, TOKEN_SECRET, async (err, user)=>{
        if(err)
            return res.status(401).json({message:"No autorizado"});
        const userFound=await User.findById(user.id)
        if(!userFound)
            return res.status(401).json({message:"No autorizado"});
        try{
            const newAtencion = new Atencion({
                idDoctor:null,
                nombreDoctor:null,
                idPaciente:userFound._id,
                nombrePaciente:userFound.username,
                atendido:false,
                tipoatencion,
                meet:null,
                domicilio,
                celular,
                receta:null
            });
            await newAtencion.save();
            console.log(newAtencion._id);
            return res.status(200).json(
                {
                    id:newAtencion._id,
                    username:newAtencion.nombrePaciente,
                    celular: newAtencion.celular,
                }
            );
        }
        catch(error){
            console.log(error.message);
            return res.status(500).json({
                message: error.message
            });
        }
    });
}

export const obtenerAtencion = async(req, res)=>{
    const { token } = req.cookies;
    const { page = 1, limit = 5 } = req.query;


    if (!token)
        return res.status(401).json({ message: "No autorizado" });

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        const userFound = await User.findById(decoded.id);

        if (!userFound) {
            return res.status(401).json({ message: "No autorizado" });
        }

        const query = { idPaciente: userFound._id };
        const opciones = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            sort: { createdAt: -1 } // Ordena por fecha de creación descendente
        };

        const atenciones = await Atencion.paginate(query, opciones);

        if (!atenciones.docs.length) {
            return res.status(404).json({ message: "No se encontraron atenciones" });
        }

        return res.status(200).json(atenciones);

    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "No autorizado" });
        }

        console.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}


export const obtenerAtencionDoctor = async(req, res)=>{
    const { token } = req.cookies;
    const { page = 1, limit = 5, paciente } = req.query;
    if (!token)
        return res.status(401).json({ message: "No autorizado" });

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        const userFound = await User.findById(decoded.id);

        if (!userFound) {
            return res.status(401).json({ message: "No autorizado" });
        }

        const query = paciente?{ idDoctor: userFound._id, nombrePaciente: { $regex: paciente, $options: 'i' } }:{ idDoctor: userFound._id };

        const atenciones = await Atencion.paginate(query, {
            page,
            limit,
            sort: { createdAt: -1 }  // Ordenar por fecha de creación descendente (último primero)
        });        
        return res.status(200).json(atenciones);

    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "No autorizado" });
        }

        console.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}

export const registrarAtencionDoctor=async(req,res)=>{
    const {token}=req.cookies;
    const { id, enlace } = req.body;
    if(!token)
        return res.status(401).json({message:"No autorizado"});

    jwt.verify(token, TOKEN_SECRET, async (err, user)=>{
        if(err)
            return res.status(401).json({message:"No autorizado"});
        const userFound=await User.findById(user.id)
        if(!userFound)
            return res.status(401).json({message:"No autorizado"});
        /*verificar si la reserva ya esta ocupada*/
        const reserva=await Atencion.findById(id);
        if(!reserva.atendido){
            try{
                const atencionActualizada = await Atencion.findByIdAndUpdate(
                    id,
                    {
                        idDoctor:userFound._id,
                        nombreDoctor:userFound.username,
                        atendido:true,
                    },
                    { new: true }
                );
                return res.status(200).json({mensaje:'Excelente no tardes!!!'});
            }
            catch(error){
                console.log(error.message);
                return res.status(500).json({
                    message: error.message
                });
            }
        }
        else{
            return res.status(202).json({mensaje:'Ya fue atendido lo siento'});
        }
    });
}




export const registrarAtencionVirtualDoctor=async(req,res)=>{
    const { id, enlacereunion } = req.body;
    try{
        const atencionActualizada = await Atencion.findByIdAndUpdate(
            id,
            {
                meet:enlacereunion
            },
            { new: true }
        );
        return res.status(200).json({mensaje:'Registrado con exito'});
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}

export const registrarAtencionRecetaDoctor=async(req,res)=>{
    const { id, recetamedica } = req.body;
    try{
        const atencionActualizada = await Atencion.findByIdAndUpdate(
            id,
            {
                receta:recetamedica
            },
            { new: true }
        );
        return res.status(200).json({mensaje:'Registrado con exito'});
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}


/*

export const obtenerTelefonoPage = async(req, res)=>{
    const busquedatelefono=await Telefono.find();        
    return res.json(busquedatelefono);
}

export const eliminarTelefono=async (req,res)=>{
    const {_id}=req.params;

    try{
        const telefonobuscado = await Telefono.findById(_id);
        if(!telefonobuscado)
            return res.status(400).json(["El teléfono no existe"]);
        
        await Telefono.findByIdAndDelete(_id);
        
        return res.status(200).json({
            msg:"Eliminado con exito",
        });
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}

export const editarTelefono=async (req, res)=>{
    const {institucion,telefono}=req.body;
    const { _id } = req.params;
    try {
        if (!_id) {
            return res.status(400).json({ error: 'Falta el ID de la institución' });
        }
        const telefonoActualizado = await Telefono.findByIdAndUpdate(
            _id,
            {
                institucion,
                telefono,
            },
            { new: true }
        );

        if (!telefonoActualizado) {
            return res.status(404).json({ error: 'Linea Telefónica no encontrado' });
        }
        res.status(200).json({msg:"Linea Telefónica editada correctamente"});
    } catch (error) {
        console.error('Error al editar Linea Telefónica:', error);
        res.status(500).json({ error: 'Error del servidor al editar Linea Telefónica' });
    }
}*/