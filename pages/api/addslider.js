import slider1Model from "@/Models/slider1Model";
import connectDB from "@/middleware/mongoose";
const CLOUD_NAME= 'dfa8inc1d'
const API_KEY= '241994482794814'
const API_SECRET= '57YXsYJP_CRvKN_lOXbhWyAQBX0'
import { v2 as cloudinary } from 'cloudinary';
import formidable from "formidable";
export const config = {
    api: {
      bodyParser: false, 
    },
};  
    
cloudinary.config({ 
  cloud_name: CLOUD_NAME, 
  api_key: API_KEY, 
  api_secret: API_SECRET 
});
           
const handler=async(req,res)=>{
    
    if (req.method === 'POST') {
        // const token = req.headers.authorization;
        // if(!token){
        //     return res.status(404).json({success:false,message:"UnAutherize Access"});
        // }
        const form = formidable({});
        let fields;
        let files;
        [fields, files] = await form.parse(req);
        const { name } = fields;
        const { image } = files;
        const filepath = image[0].filepath; 
        const imageUploadResult = await cloudinary.uploader.upload(filepath);
        const slide = new slider1Model({
            title:name[0],
            url:imageUploadResult?.secure_url,
            publicid:imageUploadResult?.public_id
          });
          
        await slide.save();     
        res.status(201).json({success:true, message: 'Slide created successfully',slide});          
    }else{
        res.status(400).json({error:"This Method is not allowed"})
    }
    
}
export default connectDB(handler)
