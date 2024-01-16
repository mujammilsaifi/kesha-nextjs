import crypto from 'crypto'
import axios from "axios";
const saltKey = "98ee057e-e30f-4017-903f-3ef3864aca34";
const merchantId = "M1TUYKOET45D";
const saltIndex = 1;
const handler=async(req,res)=>{
    if (req.method === 'POST') {
        const {merchantTransactionId} = req.body;               
        const path = '/pg/v1/status/' + merchantId + '/' + merchantTransactionId;
        const inputString = path + saltKey;
        const hash = crypto.createHash('sha256').update(inputString).digest('hex');
        const checkSum = hash + '###' + saltIndex;
        
        try {                        
             const options = {
              method: 'GET',
              url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
              headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checkSum,
                'X-MERCHANT-ID': merchantId
              }
            };            
            const response = await axios.request(options);
            res.status(200).json(response.data);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }        
    }else{
        res.status(400).json({error:"This Method is not allowed"})
    }
    
}
export default handler
