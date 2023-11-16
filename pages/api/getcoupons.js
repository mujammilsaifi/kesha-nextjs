
import couponModel from "@/Models/couponModel";
import connectDB from "@/middleware/mongoose";
          
const handler=async(req,res)=>{
    const coupons = await couponModel.find({});        
    return res.status(200).json( {success:true,coupons});          
}
export default connectDB(handler)