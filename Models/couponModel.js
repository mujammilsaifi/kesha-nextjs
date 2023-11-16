import mongoose from "mongoose";

const couponSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    discount:{
        type:Number
    },
    date:{
        type:String,
        required:true,
    }
    
},{timestamps:true});
mongoose.models={}
export default mongoose.model('Coupon',couponSchema);