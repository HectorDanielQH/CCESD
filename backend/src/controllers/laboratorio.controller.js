import Laboratorio from '../models/laboratorio.model.js';

export const resgistrarLaboratorio = async (req,res)=>{
    const {laboratorio,ubicación,telefono,turnomañana,turnotarde,servicios}=req.body;
    try{
        const newLaboratorio = new Laboratorio({
            laboratorio,
            ubicación,
            telefono,
            horariosatención:{
                turnomañana, 
                turnotarde
            },
            servicios
        });
        await newLaboratorio.save();
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

export const obtenerLaboratorios = async(req, res)=>{
    const {page=1, limit=5 , laboratorio} = req.query;
    
    const query = {};
    
    if (laboratorio) {
        query.laboratorio = { $regex: laboratorio, $options: 'i' };
    }
    const busquedalaboratorio=await Laboratorio.paginate(query,{page,limit});

    if(!busquedalaboratorio)
        return res.status(400).json({
            message:"laboratorios no encontrados"
        });
        
    return res.json(busquedalaboratorio);
}

export const obtenerLaboratoriosPage = async(req, res)=>{
    const busquedalaboratorio=await Laboratorio.find();        
    return res.json(busquedalaboratorio);
}

export const eliminarLaboratorio=async (req,res)=>{
    const {_id}=req.params;
    
    try{
        const laboratoriobuscado = await Laboratorio.findById(_id);
        if(!laboratoriobuscado)
            return res.status(400).json(["El laboratorio no existe"]);
        
        await Laboratorio.findByIdAndDelete(_id);
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

export const editarLaboratorio=async (req, res)=>{
    const {laboratorio,ubicación,telefono,turnomañana,turnotarde,servicios}=req.body;
    const { _id } = req.params;
    try {
        if (!_id) {
            return res.status(400).json({ error: 'Falta el ID del usuario' });
        }
        const laboratorioActualizado = await Laboratorio.findByIdAndUpdate(
            _id,
            {
                laboratorio,
                ubicación,
                telefono,
                horariosatención:{
                    turnomañana, 
                    turnotarde
                },
                servicios
            },
            { new: true }
        );

        if (!laboratorioActualizado) {
            return res.status(404).json({ error: 'Laboratorio no encontrado' });
        }
        res.status(200).json({msg:"Laboratorio editado correctamente"});
    } catch (error) {
        console.error('Error al editar laboratorio:', error);
        res.status(500).json({ error: 'Error del servidor al editar laboratorio' });
    }
}