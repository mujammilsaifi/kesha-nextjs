import mongoose from "mongoose";
const contactFormSchema=new mongoose.Schema({
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
    message:{
        type:String,  
    }
},{timestamps:true});
mongoose.models={}
export default mongoose.model("ContactForm",contactFormSchema);