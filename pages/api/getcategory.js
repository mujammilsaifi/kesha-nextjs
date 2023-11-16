import categoryModel from "@/Models/categoryModel";
import connectDB from "@/middleware/mongoose";


const handler=async(req,res)=>{
    
    const category=await categoryModel.find({});
    res.status(201).send({
        success:true,
        message:"All Category Fetched Successfully",
        category
    }) 
    
}
export default connectDB(handler)