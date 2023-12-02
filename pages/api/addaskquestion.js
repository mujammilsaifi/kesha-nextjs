import contactFormModel from "@/Models/contactFormModel";
import connectDB from "@/middleware/mongoose";
const EMAIL=process.env.NEXT_PUBLIC_EMAIL
const PASSWORD=process.env.NEXT_PUBLIC_PASSWORD

import nodemailer from "nodemailer"
const handler=async(req,res)=>{
    if (req.method == 'POST') {
        const {askformData}=req.body;
        const {email,subject,message}=askformData;
        
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
        subject: "Ask Question From KeshaJewels",
        html: ` <table border="1">        
        
        <tr>
            <td>Customer Email</td>
            <td>${email}</td>
        </tr>
        <tr>
            <td>Subject</td>
            <td>${subject}</td>
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