import Hospital from '../models/hospital.model.js'

export const resgistrarHospital = async (req,res)=>{
    const {hospital,nivel,ubicación,telefono,turnomañana,turnotarde,servicios}=req.body;
    try{
        const newHospital = new Hospital({
            hospital,
            nivel,
            ubicación,
            telefono,
            horariosvisita:{
                turnomañana, 
                turnotarde
            },
            servicios
        });
        await newHospital.save();
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

export const obtenerHospitales = async(req, res)=>{
    const {page=1, limit=5 , hospital} = req.query;
    
    const query = {};
    
    if (hospital) {
        query.hospital = { $regex: hospital, $options: 'i' };
    }
    const busquedahospital=await Hospital.paginate(query,{page,limit});

    if(!busquedahospital)
        return res.status(400).json({
            message:"hospitales no encontrados"
        });
        
    return res.json(busquedahospital);
}


export const obtenerHospitalesPage = async(req, res)=>{
    const busquedahospital=await Hospital.find();        
    return res.json(busquedahospital);
}

export const eliminarHospital=async (req,res)=>{
    const {_id}=req.params;
    
    try{
        const hospitalbuscado = await Hospital.findById(_id);
        if(!hospitalbuscado)
            return res.status(400).json(["El Hospital no existe"]);
        
        await Hospital.findByIdAndDelete(_id);
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

export const editarHospital=async (req, res)=>{
    const {hospital,nivel,ubicación,telefono,turnomañana,turnotarde,servicios}=req.body;
    const { _id } = req.params;
    try {
        if (!_id) {
            return res.status(400).json({ error: 'Falta el ID del usuario' });
        }
        const hospitalActualizado = await Hospital.findByIdAndUpdate(
            _id,
            {
                hospital,
                nivel,
                ubicación,
                telefono,
                horariosvisita:{
                    turnomañana, 
                    turnotarde
                },
                servicios
            },
            { new: true }
        );

        if (!hospitalActualizado) {
            return res.status(404).json({ error: 'Hospital no encontrado' });
        }
        res.status(200).json({msg:"Hospital editado correctamente"});
    } catch (error) {
        console.error('Error al editar hospital:', error);
        res.status(500).json({ error: 'Error del servidor al editar hospital' });
    }
}