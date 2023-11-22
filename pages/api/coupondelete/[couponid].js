import couponModel from "@/Models/couponModel";
import connectDB from "@/middleware/mongoose";
          
const handler=async(req,res)=>{
    if(req.method=='DELETE'){
        // const token = req.headers.authorization;
        // if(!token){
        //     return res.status(404).json({success:false,message:"UnAutherize Access"});
        // }
        const {couponid}=req.query
        await couponModel.findByIdAndDelete({_id:couponid});          
        res.json({ success: true, message: 'Coupon deleted successfully' })
    }else{
        res.status(400).json({error:"This Method is not allowed"})
   }    
                   
}
export default connectDB(handler)