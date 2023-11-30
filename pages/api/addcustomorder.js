import customorderModel from "@/Models/customorderModel";
import connectDB from "@/middleware/mongoose";
const EMAIL=process.env.EMAIL
const PASSWORD=process.env.PASSWORD

import nodemailer from "nodemailer"
const handler=async(req,res)=>{
    if (req.method == 'POST') {
        const {formData}=req.body;
        const {name,email,phone,gemstone,type,occasion,message}=formData;
        
        if(!name){
            return res.json({success:false,message:"Name is required"})
        }
        await new customorderModel({name,email,phone,gemstone,jewellerytype:type,occasion,message}).save();
        let config = {
            service : 'gmail',
            auth : {
                user: EMAIL,
                pass: PASSWORD
            }
        }

    let transporter = nodemailer.createTransport(config);
    let maildata = {
        from : EMAIL,
        to : "keshajewels@gmail.com",
        subject: "Custome Product Query",
        html: ` <table>
        
        <tr>
            <td>Customer Name</td>
            <td>${name}</td>
        </tr>
        <tr>
            <td>Customer Email</td>
            <td>${email}</td>
        </tr>
        <tr>
            <td>Customer Phone No</td>
            <td>${phone}</td>
        </tr>
        <tr>
            <td>Gemstone</td>
            <td>${gemstone}</td>
        </tr>
        <tr>
            <td>Jewellery Type</td>
            <td>${type}</td>
        </tr>
        <tr>
            <td>Occasion</td>
            <td>${occasion}</td>
        </tr>
        <tr>
            <td>Message</td>
            <td>${message}</td>
        </tr>
    </table>`
    }
    transporter.sendMail(maildata)
    res.status(201).send({
            success:true,
        })     
    }else{
        res.status(400).json({error:"This Method is not allowed"})
    }
        
}
export default connectDB(handler)
