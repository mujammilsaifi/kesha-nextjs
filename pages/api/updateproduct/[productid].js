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
        const {productid}=req.query
        if(req.method=='PUT'){
          const token = req.headers.authorization;
          if(!token){
              return res.status(404).json({success:false,message:"UnAutherize Access"});
          }
            const updateProduct=await productModel.findOne({_id:productid});
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
            if(images?.length>0){
                for (const file of images) {
                    const result = await cloudinary.uploader.upload(file.filepath);
                    productImages.push({
                        url: result.secure_url,
                        publicid: result.public_id,
                    });
                }
                
                for (const img of updateProduct?.images) {
                    const public_id=img.publicid
                    await cloudinary.uploader.destroy(public_id);
                }
            }
            await productModel.findByIdAndUpdate(productid,{
                name:name?name:updateProduct?.name,
                description:description?description:updateProduct?.description,
                slug:name?slugify(name):updateProduct?.slug,
                price:price>0?price:updateProduct?.price,
                sprice:sprice>0?sprice:updateProduct?.sprice,
                length:length?length:updateProduct?.length,
                width:width?width:updateProduct?.width,
                weight:weight?weight:updateProduct?.weight,
                setting:setting?setting:updateProduct?.setting,
                material:material?material:updateProduct?.material,
                tag:tag?tag:updateProduct?.tag,
                gemstone:gemstone?gemstone:updateProduct?.gemstone,
                color:color?color:updateProduct?.color,
                category:category?category:updateProduct?.category,
                images:productImages.length > 0?productImages:updateProduct?.images, 
                },{new:true}
              );
              
              return res.status(201).json({
                success: true,
                message:"Product Updated Successfully"
              });
        }else{
             res.status(400).json({error:"This Method is not allowed"})
        }
    
}
export default connectDB(handler)