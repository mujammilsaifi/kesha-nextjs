import userModel from "@/Models/userModel";
import { comparePassword } from "@/middleware/authHelper";
import connectDB from "@/middleware/mongoose";

const handler=async(req,res)=>{
    if (req.method == 'POST') {
        const {otp,email}=req.body
        if(!email || !otp){
            res.status(400).send("OTP is required")
        }
        //check
        const user=await userModel.findOne({email});
        
        const match= await comparePassword(otp,user.otp);  //here mathch the OTP from database
       
        if(match){
            return res.status(200).json({
                success:true,
                message:"OTP Accepted Successfully"
            });
        }
        res.status(200).json({
            success:false,
            message:"OTP Is Not Matched"
        });
    
    }else{
        res.status(400).json({error:"This Method is not allowed"})
    }
        
}
export default connectDB(handler)