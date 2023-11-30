import contactFormModel from "@/Models/contactFormModel";
import connectDB from "@/middleware/mongoose";
// const EMAIL=process.env.EMAIL
// const PASSWORD=process.env.PASSWORD
const EMAIL="mujammilkhan00738@gmail.com"
const PASSWORD="jcwcsupgsokmttyu"
import nodemailer from "nodemailer"
const handler=async(req,res)=>{
    if (req.method == 'POST') {
        const {formData}=req.body;
        const {name,email,phone,message}=formData;
        console.log(name)
        await new contactFormModel({name,email,phone,message}).save();
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
        subject: "Contact Request Here",
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