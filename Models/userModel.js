import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        default:0
    },
    otp:{
        type:String
    }
},{timestamps:true});
mongoose.models={}
export default mongoose.model('users',userSchema);