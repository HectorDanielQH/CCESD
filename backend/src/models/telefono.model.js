import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const telefonoSchema = new mongoose.Schema({
    institucion:{
        type: String,
        required: true,
    },
    telefono:{
        type: String,
        required: true,
    },
},{
    timestamps:true
});

telefonoSchema.plugin(mongoosePaginate);

export default mongoose.model('Telefono', telefonoSchema);