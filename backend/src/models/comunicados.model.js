import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

const comunicadosSchema = new mongoose.Schema({
    imagen:{
        type: String,
        trim:true,
    },
    comunicado:{
        type: String,
        trim:true,
    },
},{
    timestamps:true
});

comunicadosSchema.plugin(mongoosePaginate);

export default mongoose.model('Comunicado', comunicadosSchema);