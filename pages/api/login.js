import userModel from "@/Models/userModel";
import { comparePassword } from "@/middleware/authHelper";
import connectDB from "@/middleware/mongoose";
import JWT from "jsonwebtoken";
const handler=async(req,res)=>{
    if (req.method == 'POST') {
        const {email,password}=req.body
        // validation
        if(!email || !password){
            return res.status(404).json({
                success:false,
                message:"Required Email or Password"
            })
        }
        //check user
        const user =await userModel.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"Invalid Credencial"
            })
        }
        const match= await comparePassword(password,user.password);
        if(!match){
            return res.status(200).json({
                success:false,
                message:"Invalid Credencial!"
            })
        }
        //token
        const token=await JWT.sign({_id:user._id},"jwtsecret",{expiresIn:"7d"});
        res.status(200).json({
            success:true,
            message:"Login Successfully",
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            },
            token
        });
    
    }else{
        res.status(400).json({error:"This Method is not allowed"})
    }
        
}
export default connectDB(handler)