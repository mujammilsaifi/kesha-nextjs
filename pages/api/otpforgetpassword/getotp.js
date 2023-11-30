import userModel from "@/Models/userModel";
import { hashPassword } from "@/middleware/authHelper";
import connectDB from "@/middleware/mongoose";
const EMAIL=process.env.NEXT_PUBLIC_EMAIL
const PASSWORD=process.env.NEXT_PUBLIC_PASSWORD
// const EMAIL="mujammilkhan00738@gmail.com"
// const PASSWORD="jcwcsupgsokmttyu"
import nodemailer from "nodemailer"
const handler=async(req,res)=>{
    if (req.method == 'POST') {
        const {email}=req.body
        if(!email){
            res.status(400).json("Email is required")
        }
        
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"Wrong Email"
            })
        }
        const OTP = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        let config = {
            service : 'gmail',
            auth : {
                user: EMAIL,
                pass: PASSWORD
            }
        }

    let transporter = nodemailer.createTransport(config);

    let message = {
        from : EMAIL,
        to : user?.email,
        subject: "Reset Password OTP",
        html: `Your OTP for password reset is: ${OTP}`
    }
    transporter.sendMail(message)
    const hashedOTP=await hashPassword(OTP.toString())
    
    const data=await userModel.findByIdAndUpdate(user._id,{otp:hashedOTP},{new:true});
        res.status(200).json({
            success:true,
            message:"OTP Send on Your Email Successfully",
        });
    
    }else{
        res.status(400).json({error:"This Method is not allowed"})
    }
        
}
export default connectDB(handler)