import couponModel from "@/Models/couponModel";
import connectDB from "@/middleware/mongoose";
          
const handler=async(req,res)=>{
    const {coupontitle}=req.query
    const coupon = await couponModel.find({title:coupontitle});
        if(coupon.length!==0){
            return res.json( {success:true,coupon});
        }else{
            return res.json( {success:false});
        }
            
}
export default connectDB(handler)