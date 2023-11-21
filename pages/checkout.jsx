import { useAuth } from "@/context/Auth";
import { useTotalPayment } from "@/context/TotalPayment";
import { useRouter } from "next/router";
import axios from "axios";
import React, { useState, useEffect } from "react";
const API = process.env.NEXT_PUBLIC_APP_API_URL;
import crypto from "crypto";
import { useCart } from "@/context/Cart";
import { toast } from "react-toastify";
import Wrapper from "@/components/wrapper";
const merchantId = "PGTESTPAYUAT";
const saltKey = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
const saltIndex = 1;
const Checkout = () => {
  useEffect(() => {
    if (cart?.length <= 0) {
      router.push("/");
    }
  }, []);
  const router = useRouter();
  const [totalPayment] = useTotalPayment();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const _id = auth?.user?._id;
  const [selectedGateway, setSelectedGateway] = useState("");
  const [merchantTransactionId, setMerchantTransactionId] =
    useState("MT7850590068188104");
  const [merchantUserId, setMerchantUserId] = useState("MUID123");
  const [redirectUrl] = useState("http://localhost:3000/checkout");
  const [redirectMode] = useState("REDIRECT");
  const [callbackUrl] = useState("http://localhost:3000/paymentSuccess");

  const initiatePayment = async () => {
    const payload = {
      merchantId,
      merchantTransactionId,
      merchantUserId,
      amount: totalPayment * 100,
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
    const checksum =
      crypto
        .createHash("sha256")
        .update(base64Payload + "/pg/v1/pay" + saltKey)
        .digest("hex") +
      "###" +
      saltIndex;

    try {
      const response = await fetch(`${API}/api/payment/initiatepayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        // Redirect the user to the PhonePe payment page
        window.location.href = result.data.instrumentResponse.redirectInfo.url;
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  const checkPayment = async () => {
    try {
      const response = await fetch(`/api/payment/checkpaymentstatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify({ merchantId, merchantTransactionId }), // Convert object to JSON string
      });
      if (response.ok) {
        const result = await response.json();
        if (result?.success) {
          orderPlace(result);
          router.push("/paymentSuccess");
        } else {
          router.push("/paymentFaild");
        }
      }
    } catch (error) {
      console.error("ErrorCheck Payment:", error);
    }
  };

  // Function to execute when PhonePe is selected
  const handlePhonePe = () => {
    initiatePayment();
    checkPayment();
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
  };

  function isFormEmpty(formData) {
    for (const key in formData) {
      if (formData[key] === "") {
        return true; // If any field is empty, return true
      }
    }
    return false; // All fields are filled
  }
  return (
    <div className="w-full bg-gray-100 min-h-[100%] p-4 mt-[120px]">
      <Wrapper>
        <div className="md:max-w-7xl mx-auto flex flex-col sm:flex-row">
          {/* Billing Information */}
          <div className="md:w-2/3 p-4 bg-white rounded-lg shadow-md">
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
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                />
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
              </div>

              <div className="w-1/2 px-2 mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="country"
                >
                  Country
                </label>
                <input
                  className="border border-gray-300 rounded-md py-2 px-4 block w-full focus:outline-none focus:ring focus:border-blue-300 transition duration-150 ease-in-out"
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleFormChange}
                />
              </div>

              <div className="w-1/2 px-2 mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="state"
                >
                  State
                </label>
                <input
                  className="border border-gray-300 rounded-md py-2 px-4 block w-full focus:outline-none focus:ring focus:border-blue-300 transition duration-150 ease-in-out"
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleFormChange}
                />
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
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleFormChange}
                />
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
              </div>
            </div>
            <div className="mb-4">
            {isFormEmpty(formData) && <h3 className="block text-red-700 text-sm font-bold mb-2">Please Fill All Details Before Continue To Payment</h3>}
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
                  value="CashOnDelivery"
                  checked={true}
                  // checked={selectedGateway === "CashOnDelivery"}
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
                  disabled
                  type="radio"
                  id="phonePe"
                  name="paymentGateway"
                  value="PhonePe"
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
              <button onClick={ () => selectedGateway === 'CashOnDelivery' ? handlePhonePe() :handleCashOnDelivery() }
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full" disabled={isFormEmpty(formData)}>
                Continue To Payment
              </button>
            </div>
          </div>
          
        </div>
      </Wrapper>
    </div>
  );
};

export default Checkout;
