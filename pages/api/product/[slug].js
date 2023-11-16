import productModel from "@/Models/productModel";
import connectDB from "@/middleware/mongoose";


const handler=async(req,res)=>{
    const {slug}=req.query
    const product = await productModel
    .findOne({ slug })
    res.status(200).json({
        success:true,
        message:"Single Product fetched Successfully!",
        product,
    })
    
}
export default connectDB(handler)
  