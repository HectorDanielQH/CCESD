import Archivo from '../models/archivos.model.js';

export const resgistrarArchivo= async (req,res)=>{
    const {razondeser}=req.body;
    try{
        const newArchivo = new Archivo({
            cabecera1: req.files.archivo[0].path,
            cabecera2: req.files.archivo2[0].path,
            cabecera3: req.files.archivo3[0].path,
            cabecera4: req.files.archivo4[0].path,
            cabecera5: req.files.archivo5[0].path,
            cabecera6: req.files.archivo6[0].path,
            razondeser,
            video: req.files.video[0].path,
            img1: req.files.servicios1[0].path,
            img2: req.files.servicios2[0].path,
        });
        await newArchivo.save();

        return res.status(200).json({
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


export const obtenerArchivos = async(req, res)=>{
    const busquedaarchivos=await Archivo.findOne().sort({ _id: -1 })        
    return res.json(busquedaarchivos);
}