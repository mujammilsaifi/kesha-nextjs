import mongoose from "mongoose";
const customJewellerySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },    
    email:{
        type:String,
    },
    phone:{
        type:String,
    },
    jewellerytype:{
        type:String,  
    },
    gemstone:{
        type:String,  
    },
    occasion:{
        type:String,  
    },
    message:{
        type:String,  
    }
},{timestamps:true});
export default mongoose.model("CoustomJewellery",customJewellerySchema);