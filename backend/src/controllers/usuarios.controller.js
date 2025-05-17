import { query } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const usuarios=async (req,res)=>{
    const {page=1, limit=5 , username} = req.query;
    const query = {};

    if (username) {
        query.username = { $regex: username, $options: 'i' };
    }
    const busquedausuarios=await User.paginate(query,{page,limit});
    if(!busquedausuarios)
        return res.status(400).json({
            message:"perfiles no encontrado"
        });
        
    return res.json(busquedausuarios);
}

export const registrarusuarios=async (req,res)=>{
    const {username, email, rol, password}=req.body;
    try{
        const usuariobuscado = await User.findOne({email});

        if(usuariobuscado)
            return res.status(400).json(["El correo ya existe"]);

        const passwordHash=await bcrypt.hash(password,10);
        const newUser = new User({
            username,
            email,
            rol,
            password:passwordHash
        });
        await newUser.save();
        res.status(200).json({
            msg:"Registrado con exito",
        });
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}


export const eliminarusuarios=async (req,res)=>{
    const {_id}=req.params;
    try{
        const usuariobuscado = await User.findById(_id);
        if(!usuariobuscado)
            return res.status(400).json(["El usuario no existe"]);
        
        await User.findByIdAndDelete(_id);
        res.status(200).json({
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

export const editarusuarios=async (req, res)=>{
    const { username, email, password, rol } = req.body;
    const { _id } = req.params;

    try {
        if (!_id) {
            return res.status(400).json({ error: 'Falta el ID del usuario' });
        }
        const passwordHash=await bcrypt.hash(password,10);
        const usuarioActualizado = await User.findByIdAndUpdate(
            _id,
            { username, email, password:passwordHash, rol },
            { new: true }
        );

        if(rol!=='Doctor'){
            const removerhorario = await User.findByIdAndUpdate(
                _id,
                { horarios:''},
                { new: true }
            );
        }

        if (!usuarioActualizado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({msg:"Usuario editado correctamente"});
    } catch (error) {
        console.error('Error al editar usuario:', error);
        res.status(500).json({ error: 'Error del servidor al editar usuario' });
    }
}