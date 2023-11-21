
import mongoose from "mongoose"

const connectDB=handler=> async(req,res)=>{
    
    try {
        if(mongoose.connections[0].readyState){
            return handler(req,res)
        }
        const conn=await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);
        console.log(`Connected to mongoDB Database ${conn.connection.host}`);
        return handler(req,res)
    } catch (error) {
        console.log(`Error in MongoDb ${error}`);
    }
    
    
}

export default connectDB;