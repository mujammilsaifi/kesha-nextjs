import React, {useState, useEffect } from 'react'
import { useAuth } from '@/context/Auth';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from "next/link";


const UserOrder = () => {
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
        const {data}=await axios.get(`/api/order/userorder/${_id}`);
        if(data?.success)
          setOrder(data?.orders);
      } catch (error) {
        console.log(error);
      }
    }
    
    
  return (
    <>
   <div className="bg-gradient-to-br from-blue-100 to-purple-300  flex items-center justify-center p-4 mt-[130px]">
  <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col lg:flex-row lg:w-3/4 xl:w-1/2">
    
    <div className="w-full  overflow-y-auto">
      {order?.length <= 0 ? (
        <h2 className="text-2xl font-bold text-gray-800 text-center p-8 mt-4">You haven't Any Order</h2>
      ) : (
        <>
        <div className="flex">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 w-[50%]">Order History</h2>
          <Link href='/userprofile' className="text-sm text-end underline font-bold text-gray-800 mb-4 w-[50%]">Go Dashboard</Link>
        </div>
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

export default UserOrder