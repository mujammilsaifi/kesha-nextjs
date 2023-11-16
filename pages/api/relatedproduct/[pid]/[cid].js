import productModel from "@/Models/productModel";
import connectDB from "@/middleware/mongoose";


const handler=async(req,res)=>{
    const {pid,cid}=req.query
    const products=await productModel.find({
        category:cid,_id:{$ne:pid}
       }).limit(6)
       res.status(200).json({
        success:true,
        message:"related product successfully",
        products
       })
}
export default connectDB(handler)