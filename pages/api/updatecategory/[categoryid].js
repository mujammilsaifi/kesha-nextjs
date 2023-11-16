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
    const {categoryid}=req.query
    let url='';
    let publicid='';
    if(req.method=='PUT'){ 
        const token = req.headers.authorization;
        if(!token){
            return res.status(404).json({success:false,message:"UnAutherize Access"});
        }
        const form = formidable({});
        let fields;
        let files;
        [fields, files] = await form.parse(req);
        const  name  = fields?.name?.[0];
        const { image } = files;
        const filepath = image[0].filepath; 
        const exisitingCategory= await categoryModel.findOne({_id:categoryid});
        if(exisitingCategory?.name===name){
            return res.status(200).json({
                success:false,
                message:"Category Already Exisits"
            })
        }
        const public_id=exisitingCategory.publicid
        if(filepath){
            const result=await cloudinary.uploader.upload(filepath);
            url= result.secure_url
            publicid=result.public_id
            await cloudinary.uploader.destroy(public_id);
        }
        await categoryModel.findByIdAndUpdate(categoryid,{
            name:name ? name : exisitingCategory?.name,
            slug:name ? slugify(name): exisitingCategory?.slug,
            url: url ? url : exisitingCategory?.url,
            publicid: publicid ? publicid : exisitingCategory?.publicid
            },{new:true});
        res.status(201).json({
            success:true,
            message:"Category Update Successfully",
        })
        }else{
             res.status(400).json({error:"This Method is not allowed"})
        }
    
}
export default connectDB(handler)