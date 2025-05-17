import Telefono from '../models/telefono.model.js';

export const resgistrarTelefono = async (req,res)=>{
    const {institucion,telefono}=req.body;
    try{
        const newTelefono = new Telefono({
            institucion,
            telefono,
        });
        await newTelefono.save();
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

export const obtenerTelefono = async(req, res)=>{
    const {page=1, limit=5 , telefono} = req.query;
        
    const query = {};
    
    if (telefono) {
        query.telefono = { $regex: telefono, $options: 'i' };
    }
    const busquedatelefono=await Telefono.paginate(query,{page,limit});
    
    if(!busquedatelefono)
        return res.status(400).json({
            message:"Teléfonos no encontrados"
        });
        
    return res.json(busquedatelefono);
}


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
}