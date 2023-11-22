import orderModel from "@/Models/orderModel";
import connectDB from "@/middleware/mongoose";
          
const handler=async(req,res)=>{
    // const token = req.headers.authorization;
    //     if(!token){
    //         return res.status(404).json({success:false,message:"UnAutherize Access"});
    //     }
    const orders=await orderModel.find({})
    res.json({success:true,orders});          
}
export default connectDB(handler)