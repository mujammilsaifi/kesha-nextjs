import React, {useState, useEffect } from 'react'
import { useAuth } from '@/context/Auth';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from "next/link";
import { toast } from 'react-toastify';
const API=process.env.NEXT_PUBLIC_APP_API_URL
const Userprofile = () => {
    const [auth,setAuth]=useAuth();
    const _id=auth?.user?._id;
    const router = useRouter();
    const [order, setOrder] = useState([])
    useEffect(() => {
        if(!auth?.token){
          router.push("/signup")
        }      

    }, [auth,router])
    useEffect(() => {
      getOrder();
    }, [])
    const getOrder=async()=>{
      try {
        const {data}=await axios.get(`/api/order/userorder/${_id}`,{headers:{'Authorization':auth?.token}});
        if(data?.success)
          setOrder(data?.orders);
      } catch (error) {
        console.log(error);
      }
    }
    
    const handleLogout=()=>{
        setAuth({
          ...auth,
          user:null,
          token:''
        })
        localStorage.removeItem("auth");
        toast.success("User Logout Successfully");  
      }
  return (
    <>
   <div className="bg-gradient-to-br from-blue-100 to-purple-300  flex items-center justify-center p-4 mt-[100px]">
  <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col lg:flex-row lg:w-3/4 xl:w-1/2">
    <div className="w-full lg:w-1/2 ">
      
      <div className="w-full lg:w-1/2">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0m5Cy4lXCbuyG54L0vuo3i5-ALavHe9KmhWA_wDM&s"
          alt="User Profile"
          className="w-32 h-32 rounded-full mx-auto"
        />
      </div>
      <ul>
        <li className="mb-2 mt-4">
          <strong>Name:</strong> {auth?.user?.name}
        </li>
        <li className="mb-1">
          <strong>Email:</strong> {auth?.user?.email}
        </li>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover-bg-red-600 text-white font-bold py-2 px-4 rounded mt-8"
        >
          Logout
        </button>
      </ul>
    </div>
    <div className="w-full lg:w-1/2 overflow-y-auto">
      {order?.length <= 0 ? (
        <h2 className="text-2xl font-bold text-gray-800 text-center mt-4">You haven't Any Order</h2>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order History</h2>
          {order?.map((o) => (
            <div key={o?._id} className="mb-4">
              <div className="border border-gray-400 p-2">
                <strong>Order ID:</strong> {o?._id}
              </div>
              <div className="border border-gray-400 p-2">
                <strong>Product:</strong> <Link href={`/product/${o?.products[0]?.slug}`}>{o?.products[0]?.name}</Link>
              </div>
              <div className="border border-gray-400 p-2">
                <strong>Date:</strong> {o?.createdAt?.substring(0, 10)}
              </div>
              <div className="border border-gray-400 p-2">
                <strong>Total Amount:</strong> {o?.products[0]?.salePrice}
              </div>
              <div className="border border-gray-400 p-2">
                <strong>Payment Type:</strong> {o?.payment?.data?.paymentInstrument?.type}
              </div>
              <div className="border border-gray-400 p-2">
                <strong>Order Status:</strong> {o?.status}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  </div>
</div>

    </>
  )
}

export default Userprofile