import categoryModel from "@/Models/categoryModel";
import connectDB from "@/middleware/mongoose";
import slugify from "slugify";
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
    if(req.method=='POST'){ 
        const token = req.headers.authorization;
        if(!token){
            return res.status(404).json({success:false,message:"UnAutherize Access"});
        }
        const form = formidable({});
        let fields;
        let files;
        [fields, files] = await form.parse(req);
        const { name } = fields;
        const { image } = files;
        const filepath = image[0].filepath; 
        if(!name[0]){
            return res.status(401).json({message:"Name is Required"});
        }
        const exisitingCategory= await categoryModel.findOne({name:name[0]});
        if(exisitingCategory){
            return res.status(200).json({
                success:false,
                message:"Category Already Exisits"
            })
        }
        const imageUploadResult = await cloudinary.uploader.upload(filepath);
        const category=new categoryModel({name:name[0],slug:slugify(name[0]),url:imageUploadResult?.secure_url,publicid:imageUploadResult?.public_id});
        await category.save();
        res.status(201).json({
            success:true,
            message:"New Category Created Successfully",
            category
        })
        }else{
             res.status(400).json({error:"This Method is not allowed"})
        }
    
}
export default connectDB(handler)