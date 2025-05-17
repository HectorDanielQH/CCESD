import Farmacia from '../models/farmacia.model.js';

export const resgistrarFarmacia = async (req,res)=>{
    const {farmacia,ubicación,telefono,turnomañana,turnotarde,turnonoche}=req.body;
    try{
        const newFarmacia = new Farmacia({
            farmacia,
            ubicación,
            telefono,
            horariosatencion:{
                turnomañana, 
                turnotarde,
                turnonoche
            }
        });
        await newFarmacia.save();
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

export const obtenerFarmacia = async(req, res)=>{
    const {page=1, limit=5 , farmacia} = req.query;
        
    const query = {};
    
    if (farmacia) {
        query.farmacia = { $regex: farmacia, $options: 'i' };
    }
    const busquedafarmacia=await Farmacia.paginate(query,{page,limit});
    
    if(!busquedafarmacia)
        return res.status(400).json({
            message:"farmacias no encontradas"
        });
        
    return res.json(busquedafarmacia);
}


export const obtenerFarmaciaPage = async(req, res)=>{
    const busquedafarmacia=await Farmacia.find();        
    return res.json(busquedafarmacia);
}

export const eliminarFarmacia=async (req,res)=>{
    const {_id}=req.params;

    try{
        const farmaciabuscada = await Farmacia.findById(_id);
        if(!farmaciabuscada)
            return res.status(400).json(["La farmacia no existe"]);
        
        await Farmacia.findByIdAndDelete(_id);
        
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

export const editarFarmacia=async (req, res)=>{
    const {farmacia,ubicación,telefono,turnomañana,turnotarde,turnonoche}=req.body;
    const { _id } = req.params;
    try {
        if (!_id) {
            return res.status(400).json({ error: 'Falta el ID de la farmacia' });
        }
        const farmaciaActualizada = await Farmacia.findByIdAndUpdate(
            _id,
            {
                farmacia,
                ubicación,
                telefono,
                horariosatencion:{
                    turnomañana, 
                    turnotarde,
                    turnonoche
                },
            },
            { new: true }
        );

        if (!farmaciaActualizada) {
            return res.status(404).json({ error: 'Farmacia no encontrada' });
        }
        res.status(200).json({msg:"Farmacia editada correctamente"});
    } catch (error) {
        console.error('Error al editar Farmacia:', error);
        res.status(500).json({ error: 'Error del servidor al editar Farmacia' });
    }
}