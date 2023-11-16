
import slider1Model from "@/Models/slider1Model";
import connectDB from "@/middleware/mongoose";


const handler=async(req,res)=>{
    
    const sliders = await slider1Model.find();
    res.status(201).json({
      success:true,
      message:"All Slide Fetched Successfully",
      sliders
  }) 
    
}
export default connectDB(handler)
  