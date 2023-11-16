import productModel from "@/Models/productModel";
import connectDB from "@/middleware/mongoose";

const handler=async(req,res)=>{
    const {keyword}=req.query
    const results=await productModel.find({
            $or:[
                {name:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
    })
    res.json(results);
}
export default connectDB(handler)