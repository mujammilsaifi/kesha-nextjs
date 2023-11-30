import orderModel from "@/Models/orderModel";
import connectDB from "@/middleware/mongoose";
const EMAIL=process.env.NEXT_PUBLIC_EMAIL
const PASSWORD=process.env.NEXT_PUBLIC_PASSWORD
import nodemailer from "nodemailer"
const handler=async(req,res)=>{
    if(req.method=='POST'){ 
        const token = req.headers.authorization;
        if(!token){
            return res.status(404).json({success:false,message:"UnAutherize Access"});
        }
        const {formData,products,paymentMethod} = req.body;
        const {userId,firstName,lastName,email,phone,city,country,state,pincode,address,address1}=formData;
        const [{ salePrice, qty, psize, category, color, material }] = products;
       
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
            to : EMAIL,
            subject: "Order Placed Check Details",
            html: `<table border="1">
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>First Name</td>
                <td>${firstName}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>${lastName}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>${email}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>${phone}</td>
              </tr>
              <tr>
                <td>City</td>
                <td>${city}</td>
              </tr>
              <tr>
                <td>Country</td>
                <td>${country}</td>
              </tr>
              <tr>
                <td>State</td>
                <td>${state}</td>
              </tr>
              <tr>
                <td>Pincode</td>
                <td>${pincode}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>${address}</td>
              </tr>
              <tr>
                <td>Sale Price</td>
                <td>${salePrice}</td>
              </tr>
              <tr>
                <td>Quantity</td>
                <td>${qty}</td>
              </tr>
              <tr>
                <td>Product Size</td>
                <td>${psize}</td>
              </tr>
              <tr>
                <td>Category</td>
                <td>${category}</td>
              </tr>
              <tr>
                <td>Color</td>
                <td>${color}</td>
              </tr>
              <tr>
                <td>Material</td>
                <td>${material}</td>
              </tr>
            </tbody>
          </table>`
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