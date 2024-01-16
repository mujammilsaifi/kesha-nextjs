import crypto from 'crypto'
import axios from "axios";
const saltKey = "98ee057e-e30f-4017-903f-3ef3864aca34";
const saltIndex = 1;
const handler=async(req,res)=>{
    if (req.method === 'POST') {
        const payload = req.body; 
               
        const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');  
        const checksum = crypto
                .createHash('sha256')
                .update(base64Payload + "/pg/v1/pay" + saltKey)
                .digest('hex') + '###' + saltIndex;
            try {     
                                   
                const options = {
                  method: 'POST',
                  url: 'https://api.phonepe.com/apis/hermes/pg/v1/pay',
                  headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-VERIFY': checksum,
                  },
                  data: {
                    request: base64Payload,
                  },
                };
                const response = await axios.request(options);
                res.status(200).json(response.data); 
            }catch (error) {
                res.status(500).json({success:false, message: error.message });
            }            
    }else{
        res.status(400).json({error:"This Method is not allowed"})
    }
    
}
export default handler
