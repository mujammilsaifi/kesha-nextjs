import productModel from "@/Models/productModel";
import connectDB from "@/middleware/mongoose";


const handler=async(req,res)=>{
    
        const products = await productModel.find({})
        res.status(200).json({
        success: true,
        totalProduct: products?.length,
        message: "All products fetched successfully",
        products,
        });
    
}
export default connectDB(handler)
  