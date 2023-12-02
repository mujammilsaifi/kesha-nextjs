
import reviewModel from "@/Models/reviewModel";
import connectDB from "@/middleware/mongoose";
const handler=async(req,res)=>{
    if (req.method == 'POST') {
        const {formData}=req.body;
        const {name,review}=formData;        
        await new reviewModel({name,review}).save();    
        res.status(201).send({
            success:true,
        })
    }else{
        res.status(400).json({error:"This Method is not allowed"})
    }
        
}
export default connectDB(handler)