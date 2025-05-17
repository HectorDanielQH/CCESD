import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

const atencionSchema = new mongoose.Schema({
    idDoctor:{
        type: Schema.Types.ObjectId,
        trim:true,
    },
    nombreDoctor:{
        type: String,
        trim:true,
    },
    idPaciente:{
        type: Schema.Types.ObjectId,
        trim:true,
    },
    nombrePaciente:{
        type: String,
        trim:true,
    },
    atendido:{
        type: Boolean,
        trim:true,
    },
    tipoatencion:{
        type: String,
        trim:true,
    },
    meet:{
        type: String,
        trim:true,
    },
    domicilio:{
        type: String,
        trim:true,
    },
    celular:{
        type: String,
        trim:true,
    },
    receta:{
        type: String,
    }
},{
    timestamps:true
});

atencionSchema.plugin(mongoosePaginate);

export default mongoose.model('Atencion', atencionSchema);