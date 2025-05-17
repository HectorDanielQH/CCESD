import Comunicado from "../models/comunicados.model.js";

export const comunicadopagina = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    
    // Convertir `limit` y `page` a enteros
    const limitInt = parseInt(limit);
    const pageInt = parseInt(page);

    // Obtener comunicados en orden descendente
    const comunicados = await Comunicado.find()
        .sort({ fecha: -1 })
        .limit(limitInt)
        .skip((pageInt - 1) * limitInt);

    if (!comunicados.length) {
        return res.status(400).json({
            message: "comunicados no encontrados"
        });
    }

    return res.json(comunicados);
};

export const obtenerComunicados = async(req,res)=>{
    const {page=1, limit=5} = req.query;

    const query = {};
    const busquedacomunicado=await Comunicado.paginate(query,{page,limit});

    if(!busquedacomunicado)
        return res.status(400).json({
            message:"hospitales no encontrados"
        });
        
    return res.json(busquedacomunicado);
}

export const registrarComunicado = async(req,res)=>{
    const {comunicado}=req.body;
    try{
        const newComunicado = new Comunicado({
            imagen:req.files.imagen[0].path,
            comunicado,
        });
        await newComunicado.save();
        res.status(201).json(newComunicado);
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}

export const editarComunicado = async(req,res)=>{
    const {_id}=req.params;
    const {comunicado}=req.body;
    try{
        const comunicadoActualizado = await Comunicado.findByIdAndUpdate(_id,{
            imagen:req.files.imagen[0].path,
            comunicado
        },{new:true});
        if(!comunicadoActualizado)
            return res.status(404).json({
                message:"Comunicado no encontrado"
            });
            
        res.json(comunicadoActualizado);
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
} 

export const eliminarComunicado = async(req,res)=>{
    const {_id}=req.params;
    console.log(req.params);
    try{
        const comunicadoBorrado = await Comunicado.findByIdAndDelete(_id);
        if(!comunicadoBorrado)
            return res.status(404).json({
                message:"Comunicado no encontrado"
            });
            
        res.json(comunicadoBorrado);
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}