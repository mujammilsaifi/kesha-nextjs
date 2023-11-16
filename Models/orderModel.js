import mongoose from "mongoose";
const orderSchema=new mongoose.Schema({
    buyer:{
        type:String,
        required:true,
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
    },
    email:{
        type:String,
        required:true,
    },
    products:[{}]
    ,
    payment:{},
    status:{
        type:String,
        default:"Processing",
    },
    phone:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        
    },
    pincode:{
        type:String,
        
    },
    state:{
        type:String,
        
    },
    country:{
        type:String,
       
    },
    address:{
        type:String,
    },
    address1:{
        type:String,
    }
},{timestamps:true});
mongoose.models={}
export default mongoose.model("Order",orderSchema);