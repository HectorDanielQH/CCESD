import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const archivoSchema = new mongoose.Schema({
    cabecera1:{
        type: String,
        required: true,
    },
    cabecera2:{
        type: String,
        required: true,
    },
    cabecera3:{
        type: String,
        required: true,
    },
    cabecera4:{
        type: String,
        required: true,
    },
    cabecera5:{
        type: String,
        required: true,
    },
    cabecera6:{
        type: String,
        required: true,
    },
    razondeser:{
        type: String,
        required: true,
    },
    video:{
        type: String,
        required: true,
    },
    img1:{
        type: String,
        required: true,
    },
    img2:{
        type: String,
        required: true,
    },
},{
    timestamps:true
});

archivoSchema.plugin(mongoosePaginate);

export default mongoose.model('Archivo', archivoSchema);
