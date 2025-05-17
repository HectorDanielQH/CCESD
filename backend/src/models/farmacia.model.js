import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const horarioatencionSchema = new mongoose.Schema({
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
    turnonoche:{
        type: String,
        required: true,
        trim:true,
    },
});


const farmaciaSchema = new mongoose.Schema({
    farmacia:{
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
    horariosatencion:horarioatencionSchema,
},{
    timestamps:true
});

farmaciaSchema.plugin(mongoosePaginate);

export default mongoose.model('Farmacia', farmaciaSchema);
