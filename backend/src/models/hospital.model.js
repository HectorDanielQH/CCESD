import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const horariovisitaSchema = new mongoose.Schema({
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


const hospitalSchema = new mongoose.Schema({
    hospital:{
        type: String,
        required: true,
        trim:true,
    },
    nivel:{
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
    horariosvisita:horariovisitaSchema,
    servicios:{
        type: String,
        required: true,
        trim:true,
    },
},{
    timestamps:true
});

hospitalSchema.plugin(mongoosePaginate);

export default mongoose.model('Hospital', hospitalSchema);
