import orderModel from "@/Models/orderModel";
import connectDB from "@/middleware/mongoose";
        
const handler=async(req,res)=>{
    const {orderid}=req.query
    if (req.method == 'PUT') {
        const token = req.headers.authorization;
        if(!token){
            return res.status(404).json({success:false,message:"UnAutherize Access"});
        }
        const {value}=req.body
        const status=value;
        await orderModel.findByIdAndUpdate(orderid,{status},{new:true});
        res.json({success:true});        
    }else{
        res.status(400).json({error:"This Method is not allowed"})
    }
        
}
export default connectDB(handler)