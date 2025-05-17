import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const laboratoriovisitaSchema = new mongoose.Schema({
    turnomañana:{
        type: String,
        required: true,
        trim:true,
    },
    turnotarde:{
        type: String,
        required: true,
        trim:true,
    },
});


const laboratorioSchema = new mongoose.Schema({
    laboratorio:{
        type: String,
        required: true,
        trim:true,
    },
    ubicación:{
        type: Array,
        required: true,
    },
    telefono:{
        type: String,
        required: true,
        trim:true,
    },
    horariosatención:laboratoriovisitaSchema,
    servicios:{
        type: String,
        required: true,
        trim:true,
    },
},{
    timestamps:true
});

laboratorioSchema.plugin(mongoosePaginate);

export default mongoose.model('Laboratorio', laboratorioSchema);