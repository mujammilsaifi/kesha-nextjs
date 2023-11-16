
import mongoose from "mongoose"

const connectDB=handler=> async(req,res)=>{
    
    try {
        if(mongoose.connections[0].readyState){
            return handler(req,res)
        }
        const conn=await mongoose.connect('mongodb+srv://digitalwhopper:digitalwhopper@cluster0.q705xgr.mongodb.net/keshajewellery');
        console.log(`Connected to mongoDB Database ${conn.connection.host}`);
        return handler(req,res)
    } catch (error) {
        console.log(`Error in MongoDb ${error}`);
    }
    
    
}

export default connectDB;