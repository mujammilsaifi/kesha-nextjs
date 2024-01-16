import { useAuth } from "@/context/Auth";
import { useTotalPayment } from "@/context/TotalPayment";
import { useRouter } from "next/router";
import axios from "axios";
import React, { useState, useEffect } from "react";
import crypto from "crypto";
import { useCart } from "@/context/Cart";
import { toast } from "react-toastify";
const merchantId = "M1TUYKOET45D";
const saltKey = "98ee057e-e30f-4017-903f-3ef3864aca34";
const saltIndex = 1;
const indianStates = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Lakshadweep',
  'Puducherry',
];


const Checkout = () => {
  useEffect(() => {
    if (cart?.length <= 0) {
      router.push("/");
    }
  }, []);
  const generateUniqueTransactionId = () => {
    const timestamp = new Date().getTime();
    return `MT${timestamp}`;
  };
  
  const generateUniqueUserId = () => {
    const timestamp = new Date().getTime();
    return `MUID${timestamp}`;
  };
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const [totalPayment] = useTotalPayment();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const _id = auth?.user?._id;
  const [selectedGateway, setSelectedGateway] = useState("phonePe");
  const [merchantTransactionId, setMerchantTransactionId] = useState(generateUniqueTransactionId());
  const [merchantUserId, setMerchantUserId] = useState(generateUniqueUserId());
  const [redirectUrl] = useState("https://keshajewels.com/callback");
  const [redirectMode] = useState("REDIRECT");
  const [callbackUrl] = useState("https://keshajewels.com/callback");

  
  const initiatePayment = async () => {
    localStorage.setItem("mid",merchantTransactionId)
    const payload = {
      merchantId,
      merchantTransactionId,
      merchantUserId,
      amount: 1 * 100,
      redirectUrl,
      redirectMode,
      callbackUrl,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    // Convert the payload to a Base64 encoded string
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString(
      "base64"
    );

    // Calculate the X-VERIFY header
    const checksum =crypto.createHash("sha256").update(base64Payload + "/pg/v1/pay" + saltKey).digest("hex") +"###" +saltIndex;
    try {
      const response = await fetch(`/api/payment/initiatepayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        window.location.href = result.data.instrumentResponse.redirectInfo.url;
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  

  // Function to execute when PhonePe is selected
  const handlePhonePe = () => {
    if(validateForm()){
    initiatePayment();
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const orderPlace = async (paymentMethod) => {
    try {
      const { data } = await axios.post(`/api/order/placeorder`, {
        formData,
        products: cart,
        paymentMethod,
      },{headers:{'Authorization':auth?.token}});
      if (data?.success) {
        setCart([]);
        localStorage.removeItem("cart");
        toast.success("Order Placed Successfully");
      }
    } catch (error) {
      console.error("Error order place:", error);
    }
  };
  const [formData, setFormData] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    country: "",
    state: "",
    pincode: "",
    email: "",
    phone: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    setFormData({
      ...formData,
      userId: _id,
    });
  }, [_id]);
  // Function to handle the radio button selection
  const handleGatewaySelection = (event) => {
    setSelectedGateway(event.target.value);
  };

  // Function to execute when Cash On Delivery is selected
  const handleCashOnDelivery = () => {
    
    if(validateForm()){
    const method = {
      success: true,
      data: {
        amount: totalPayment,
        paymentInstrument: {
          type: "Cash On Delivery",
        },
      },
    };
    orderPlace(method);
    router.push("/paymentSuccess");
   }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};
    for (const field in formData) {
      if (formData[field].trim() === '' || formData[field].length < 3) {
        newErrors[field] = `${field} is required`;
        valid = false;
      }else if (field === 'email' && !formData[field].includes('@')) {
        newErrors[field] = `Enter a Valid Email!`;
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };
  return (
    <div className="w-full bg-gray-100 min-h-[100%] py-3 px-1  md:p-4 mt-[120px]">
     
        <div className="md:max-w-7xl w-full mx-auto flex flex-col sm:flex-row">
          {/* Billing Information */}
          <div className="md:w-2/3 w-[100%] p-2 md:p-4 bg-white rounded-lg shadow-md mt-3">
            <h1 className="text-2xl font-semibold mb-4">Billing Information</h1>
            <div className="flex flex-wrap -mx-2">
              <div className="w-1/2 px-2 mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  className="border border-gray-300 rounded-md py-2 px-4 block w-full focus:outline-none focus:ring focus:border-blue-300 transition duration-150 ease-in-out"
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleFormChange}
                />
                {errors.firstName && <p className='text-red-500'>{errors.firstName}</p>}
              </div>
              <div className="w-1/2 px-2 mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  className="border border-gray-300 rounded-md py-2 px-4 block w-full focus:outline-none focus:ring focus:border-blue-300 transition duration-150 ease-in-out"
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleFormChange}
                />
                {errors.lastName && <p className='text-red-500'>{errors.lastName}</p>}
              </div>

              <div className="w-1/2 px-2 mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  className="border border-gray-300 rounded-md py-2 px-4 block w-full focus:outline-none focus:ring focus:border-blue-300 transition duration-150 ease-in-out"
                  type="number"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                />
                {errors.phone && <p className='text-red-500'>{errors.phone}</p>}
              </div>
              <div className="w-1/2 px-2 mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="border border-gray-300 rounded-md py-2 px-4 block w-full focus:outline-none focus:ring focus:border-blue-300 transition duration-150 ease-in-out"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                />
                {errors.email && <p className='text-red-500'>{errors.email}</p>}
              </div>

              <div className="w-1/2 px-2 mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="country"
                >
                  Country
                </label>
                <select
                  id="country"
                  className="border border-gray-300 rounded-md py-2 px-4 block w-full focus:outline-none focus:ring focus:border-blue-300 transition duration-150 ease-in-out"
                  onChange={handleFormChange}
                  name="country"
                >       
                <option  defaultValue >Select Country --</option>     
                  <option value="India" >India</option>
                  
                </select>
                
                {errors.country && <p className='text-red-500'>{errors.country}</p>}
              </div>

              <div className="w-1/2 px-2 mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="state"
                >
                  State
                </label>
                <select
                  id="state"
                  className="border border-gray-300 rounded-md py-2 px-4 block w-full focus:outline-none focus:ring focus:border-blue-300 transition duration-150 ease-in-out"
                  onChange={handleFormChange}
                  name="state"
                >       
                <option  defaultValue >Select State --</option> 
                {indianStates?.map((st,i)=>(
                  <option key={i} value={st} >{st}</option>
                ))}    
                  
                  
                </select>
                
                {errors.state && <p className='text-red-500'>{errors.state}</p>}
              </div>

              <div className="w-1/2 px-2 mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="pincode"
                >
                  Pin Code
                </label>
                <input
                  className="border border-gray-300 rounded-md py-2 px-4 block w-full focus:outline-none focus:ring focus:border-blue-300 transition duration-150 ease-in-out"
                  type="number"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleFormChange}
                />
                {errors.pincode && <p className='text-red-500'>{errors.pincode}</p>}
              </div>

              <div className="w-1/2 px-2 mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  className="border border-gray-300 rounded-md py-2 px-4 block w-full focus:outline-none focus:ring focus:border-blue-300 transition duration-150 ease-in-out"
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleFormChange}
                />
                {errors.city && <p className='text-red-500'>{errors.city}</p>}
              </div>

              <div className="w-full px-2 mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  className="border border-gray-300 rounded-md py-2 px-4 block w-full focus:outline-none focus:ring focus:border-blue-300 transition duration-150 ease-in-out"
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                />
                {errors.address && <p className='text-red-500'>{errors.address}</p>}
              </div>
            </div>
            
          </div>

          {/* Cart Summary */}
          <div className="md:w-1/3 w-[100%] mt-2 p-4 bg-white rounded-lg shadow-md md:ml-4">
            <h2 className="text-xl font-semibold mb-2">Cart Summary</h2>
            <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
              <div className="flex justify-between">
                <div className="uppercase text-md md:text-lg font-medium text-black">
                  Subtotal
                </div>
                <div className="text-md md:text-lg font-medium text-black">
                  &#8377; {totalPayment}
                </div>
              </div>

              <div className="text-sm md:text-md py-5 border-t mt-5">
                The subtotal reflects the total price of your order, including
                duties and taxes, before any applicable discounts. It does not
                include delivery costs and international transaction fees.
              </div>
            </div>

            <div className=" mt-8">
              <h1 className="text-2xl font-semibold mb-4">
                Select Payment Gateway
              </h1>
              <div className="mb-4">
                <input
                  type="radio"
                  id="cashOnDelivery"
                  name="paymentGateway"
                  value="cashOnDelivery"
                  checked={selectedGateway === "cashOnDelivery"}
                  onChange={handleGatewaySelection}
                  className="mr-2 form-radio h-5 w-5 text-blue-600"                  
                />
                <label
                  htmlFor="cashOnDelivery"
                  className="text-gray-700 font-semibold cursor-pointer"
                >
                  Cash On Delivery
                </label>
              </div>
              <div className="mb-4">
                <input
                  type="radio"
                  id="phonePe"
                  name="paymentGateway"
                  value="phonePe"
                  checked={selectedGateway === "phonePe"}
                  onChange={handleGatewaySelection}
                  className="mr-2 form-radio h-5 w-5 text-blue-600"
                />
                <label
                  htmlFor="phonePe"
                  className="text-gray-700 font-semibold cursor-pointer"
                >
                  PhonePe
                </label>
              </div>
              <div></div>
            </div>
            <div className="mb-4">
              <button onClick={ () => selectedGateway === 'cashOnDelivery' ? handleCashOnDelivery() : handlePhonePe()  }
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full">
                Continue To Payment
              </button>
            </div>
          </div>
          
        </div>
    
    </div>
  );
};

export default Checkout;
