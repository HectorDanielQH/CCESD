import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim:true
    },
    email:{
        type: String,
        required: true,
        trim:true,
        unique:true
    },
    rol:{
        type: String,
        required: true,
    },
    horarios:{
        type: String,
    },
    password:{
        type: String,
        required: true,
    }
},{
    timestamps:true
})

userSchema.plugin(mongoosePaginate);

export default mongoose.model('User', userSchema);
