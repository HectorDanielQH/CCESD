import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res)=>{
    const {username, email, password}=req.body;
    
    try{
        const usuariobuscado = await User.findOne({email});

        if(usuariobuscado)
            return res.status(400).json(["El correo ya existe"]);

        const passwordHash=await bcrypt.hash(password,10);
        const newUser = new User({
            username,
            email,
            rol:'Paciente',
            password:passwordHash
        });
        const userSaved = await newUser.save();
        const token = await createAccessToken({id:userSaved._id});
        res.cookie('token',token);
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            rol: userSaved.rol,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
}
export const login = async (req, res)=>{
    const {email, password}=req.body;
    try{
        const busquedaUser=await User.findOne({email});
        if(!busquedaUser){
            return res.status(400).json({
                message:"Usuario no encontrado"
            })
        }
        const contraseñaLogin=await bcrypt.compare(password,busquedaUser.password);

        if(!contraseñaLogin){
            return res.status(400).json({
                message:"Contraseña invalida"
            })
        }

        const token = await createAccessToken({id:busquedaUser._id});
        
        res.cookie('token',token);

        res.json({
            id: busquedaUser._id,
            username: busquedaUser.username,
            email: busquedaUser.email,
            rol: busquedaUser.rol,
            createdAt: busquedaUser.createdAt,
            updatedAt: busquedaUser.updatedAt,
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
}
export const logout= (req, res)=>{
    res.cookie("token","",{
        expires: new Date(0)
    });
    return res.sendStatus(200);
}

export const profile=async (req,res)=>{
    const busquedausuario=await User.findById(req.user.id);

    if(!busquedausuario)
        return res.status(400).json({
            message:"perfil no encontrado"
        });
        
    return res.json(busquedausuario);
}


export const verifyToken=async (req, res)=>{
    const {token}=req.cookies;

    if(!token)
        return res.status(401).json({message:"No autorizado"});

    jwt.verify(token, TOKEN_SECRET, async (err, user)=>{
        if(err)
            return res.status(401).json({message:"No autorizado"});
        const userFound=await User.findById(user.id)
        if(!userFound)
            return res.status(401).json({message:"No autorizado"});

        return res.json(userFound);
    })
}