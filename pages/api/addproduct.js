import productModel from "@/Models/productModel";
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
            const name = fields?.name?.[0];
            const description = fields?.description?.[0];
            const price = fields?.price?.[0];
            const sprice = fields?.sprice?.[0];
            const setting = fields?.setting?.[0];
            const material = fields?.material?.[0];
            const length = fields?.length?.[0];
            const width = fields?.width?.[0];
            const weight = fields?.weight?.[0];
            const tag = fields?.tag?.[0];
            const gemstone = fields?.gemstone?.[0];
            const color = fields?.color?.[0];
            const category = fields?.category?.[0];

            const { images } = files;
            
            
            const productImages=[]
            for (const file of images) {
                  console.log(file.filepath)
                  const result = await cloudinary.uploader.upload(file.filepath);
                  productImages.push({
                    url: result.secure_url,
                    publicid: result.public_id,
                });
            }
            const product = new productModel({
                name,
                description,
                slug:slugify(name),
                price,
                sprice,
                length,width,
                weight,
                setting,
                material,
                tag,
                gemstone,
                color,
                category,
                images:productImages
              });
              
              await product.save();
              return res.status(201).json({
                success: true,
                product,
              });
        }else{
             res.status(400).json({error:"This Method is not allowed"})
        }
    
}
export default connectDB(handler)