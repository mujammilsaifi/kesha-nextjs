import couponModel from "@/Models/couponModel";
import connectDB from "@/middleware/mongoose";
    
const handler=async(req,res)=>{
    
    if (req.method === 'POST') {
        const token = req.headers.authorization;
        if(!token){
            return res.status(404).json({success:false,message:"UnAutherize Access"});
        }
        const { couponcode,coupondiscount,coupondate} = req.body;
        const coupon = new couponModel({ title:couponcode, discount:coupondiscount, date:coupondate });
        
        await coupon.save();
        res.status(201).json({success:true,coupon});         
                   
    }else{
        res.status(400).json({error:"This Method is not allowed"})
    }
    
}
export default connectDB(handler)
