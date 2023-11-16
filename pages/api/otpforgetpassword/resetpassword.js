import userModel from "@/Models/userModel";
import { hashPassword } from "@/middleware/authHelper";
import connectDB from "@/middleware/mongoose";

const handler=async(req,res)=>{
    if (req.method == 'POST') {
        const {email,password}=req.body
        if(!email || !password){
            res.status(400).json("Email is required")
        }
        
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"Something went wrong"
            })
        }
        const newHashed= await hashPassword(password);
        await userModel.findByIdAndUpdate(user?._id,{password:newHashed},{new:true});
        res.status(200).json({
            success:true,
            message:"Password Reset Successfully"
        });
    }else{
        res.status(400).json({error:"This Method is not allowed"})
    }
        
}
export default connectDB(handler)
