import slider1Model from "@/Models/slider1Model";
import connectDB from "@/middleware/mongoose";
const CLOUD_NAME= 'dfa8inc1d'
const API_KEY= '241994482794814'
const API_SECRET= '57YXsYJP_CRvKN_lOXbhWyAQBX0'
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: CLOUD_NAME, 
  api_key: API_KEY, 
  api_secret: API_SECRET 
});          
const handler=async(req,res)=>{
    const {slideid}=req.query
    if(req.method=='DELETE'){
        const token = req.headers.authorization;
        if(!token){
            return res.status(404).json({success:false,message:"UnAutherize Access"});
        }
        const deleteSlide=await slider1Model.findByIdAndDelete(slideid);
        if(deleteSlide?.publicid) {
            const public_id=deleteSlide.publicid
            await cloudinary.uploader.destroy(public_id);
        }
        res.status(200).json({
            success:true,
            message:"Slide Deleted Successfully",            
        })
    }else{
        res.status(400).json({error:"This Method is not allowed"})
   }    
                   
}
export default connectDB(handler)