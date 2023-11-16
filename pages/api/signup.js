import userModel from "@/Models/userModel";
import { hashPassword } from "@/middleware/authHelper";
import connectDB from "@/middleware/mongoose";

const handler=async(req,res)=>{
    if (req.method == 'POST') {
        const {name,email,password}=req.body;
        if(!name){
            return res.json({message:"Name is required"})
        }
        if(!email){
            return res.json({message:"Email is required"})
        }
        if(!password){
            return res.json({message:"Password is required"})
        }
       
    
        //check user
        const exisitingUser=await userModel.findOne({email});
        //exisiting user
        if(exisitingUser){
            return res.status(409).json({
                success:false,
                message:"User Already Register please login"
            })
        }
        //register user
        const hashedPassword=await hashPassword(password)
        const user=await new userModel({name:name,email,password:hashedPassword}).save();
        res.status(201).json({
            success:true,
            message:"User Register SuccessFully",
            user
        })
    
    }else{
        res.status(400).json({error:"This Method is not allowed"})
    }
        
}
export default connectDB(handler)