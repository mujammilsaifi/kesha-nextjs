import orderModel from "@/Models/orderModel";
import connectDB from "@/middleware/mongoose";
const EMAIL="mujammilkhan00738@gmail.com"
const PASSWORD="jcwcsupgsokmttyu"
import nodemailer from "nodemailer"
const handler=async(req,res)=>{
    if(req.method=='POST'){ 
        // const token = req.headers.authorization;
        // if(!token){
        //     return res.status(404).json({success:false,message:"UnAutherize Access"});
        // }
        const {formData,products,paymentMethod} = req.body;
        const {userId,firstName,lastName,email,phone,city,country,state,pincode,address,address1}=formData;
        const order=  new orderModel({
                buyer:userId,
                products:products,
                payment:paymentMethod,
                firstname:firstName ,
                lastname:lastName ,
                phone:phone  ,
                email:email ,
                city:city, 
                state:state,
                pincode:pincode,
                country:country,
                address1:address1,
                address: address 
            }).save()

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
            to : "kmujammil02@gmail.com",
            subject: "Order Placed Check Details",
            html: `Order Placed on kesha jewellery`
        }
        transporter.sendMail(message)
        res.status(201).json({
            success:true,
            message:"Order Placed Successfully",
            order
        })
        }else{
            res.status(400).json({error:"This Method is not allowed"})
        }
    
}
export default connectDB(handler)