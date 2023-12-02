import reviewModel from "@/Models/reviewModel";
import connectDB from "@/middleware/mongoose";
          
const handler=async(req,res)=>{
    const review = await reviewModel.find({});        
    return res.status(200).json( {success:true,review});          
}
export default connectDB(handler)