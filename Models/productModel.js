import mongoose from "mongoose";

const productModel=new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      slug:{
        type: String, 
      },
      description: {
        type: String,
      },
      setting: {
        type: String,
      },
      length: {
        type: Number,
      },
      width: {
        type: Number,
      },
      weight: {
        type: String,
      },
      tag: {
        type: String,
      },
      material: {
        type: String,
      },
      price: {
        type: Number,
        required: true,
      },
      sprice: {
        type: Number,
        default:0
      },
      gemstone: {
        type: String,
      },
      color: {
        type: String,
      },
      category: {
        type: String,
        
      },
      images: [
        {
          url:{
            type: String,
          },
          publicid:{
            type: String,
          }
          
        },
      ],
   

},{timestamps:true});
mongoose.models={}
export default mongoose.model("Products",productModel);
