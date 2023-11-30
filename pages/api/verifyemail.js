
const EMAIL=process.env.NEXT_PUBLIC_EMAIL
const PASSWORD=process.env.NEXT_PUBLIC_PASSWORD

import nodemailer from "nodemailer"
const handler=async(req,res)=>{
    if (req.method == 'POST') {
        const {otp,email}=req.body
        if(!otp){
            res.status(400).json("OTP is required")
        }
        
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
        to : email,
        subject: "verify your Email OTP",
        html: `OTP for verify email is: ${otp}`
    }
    transporter.sendMail(message)
    
    res.status(200).json({
        success:true,
        message:"OTP Send on Your Email Successfully",
    });
    
    }else{
        res.status(400).json({error:"This Method is not allowed"})
    }
        
}
export default handler