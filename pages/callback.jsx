import { useAuth } from "@/context/Auth";
import { useRouter } from "next/router";
import axios from "axios";
import React, {useEffect } from "react";
import { useCart } from "@/context/Cart";
import { toast } from "react-toastify";
const Callback = () => {
    const router = useRouter();
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const checkPayment = async () => {
        // const merchantTransactionId="MT1705408104831"       
        const merchantTransactionId=localStorage.getItem("mid")        
        try {
          const response = await fetch(`/api/payment/checkpaymentstatus`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Set the content type to JSON
            },
            body: JSON.stringify({merchantTransactionId }), // Convert object to JSON string
          });
          if (response.ok) {
            const result = await response.json();
            
            if (result?.data?.state==="COMPLETED") {
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

      useEffect(() => {
        checkPayment();
      }, [])


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
  return (
    <div>callback</div>
  )
}

export default Callback