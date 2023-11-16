import mongoose from "mongoose";
const slider1Schema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    url:{
        type:String,  
    },
    publicid:{
        type:String,  
    }
});
mongoose.models={}
export default mongoose.model("Slider1",slider1Schema);