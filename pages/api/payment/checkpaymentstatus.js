import crypto from 'crypto'
import axios from "axios";
const saltKey = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
const saltIndex = 1;
const handler=async(req,res)=>{
    if (req.method === 'POST') {
        const {merchantId,merchantTransactionId} = req.body;               
        const path = '/pg/v1/status/' + merchantId + '/' + merchantTransactionId;
        const inputString = path + saltKey;
        const hash = crypto.createHash('sha256').update(inputString).digest('hex');
        const checkSum = hash + '###' + saltIndex;
        
        try {
                        
             const options = {
              method: 'GET',
              url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
              headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checkSum,
                'X-MERCHANT-ID': 'MT7850590068188104'
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
