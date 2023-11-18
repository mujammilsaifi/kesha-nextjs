import productModel from "@/Models/productModel";
import connectDB from "@/middleware/mongoose";
import categoryModel from "@/Models/categoryModel";

const handler=async(req,res)=>{
    const {slug}=req.query
        const category=await categoryModel.findOne({slug});
        const products=await productModel.find({category});
        res.status(200).send({
            success:true,
            totalProduct: products.length,
            message:"products by category successfully",
            products
           })
}
export default connectDB(handler)