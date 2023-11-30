import orderModel from "@/Models/orderModel";
import connectDB from "@/middleware/mongoose";
          
const handler=async(req,res)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(404).json({success:false,message:"UnAutherize Access"});
    }
    const {orderid}=req.query
    const order=await orderModel.find({_id:orderid})
    res.json({success:true,order});          
}
export default connectDB(handler)