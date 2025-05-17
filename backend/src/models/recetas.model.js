import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const recetaSchema = new mongoose.Schema({
    idDoctor:{
        type: Schema.Types.ObjectId,
        required:true,
        trim:true,
    },
    idPaciente:{
        type: Schema.Types.ObjectId,
        trim:true,
        required:true,
    },
    receta:{
        type: String,
        required:true,
        trim:true,
    },
},{
    timestamps:true
});

recetaSchema.plugin(mongoosePaginate);

export default mongoose.model('Receta', recetaSchema);