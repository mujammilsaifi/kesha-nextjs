import React, {useState, useEffect } from 'react'
import { useAuth } from '@/context/Auth';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from "next/link";
import { toast } from 'react-toastify';

const Userprofile = () => {
    const [auth,setAuth]=useAuth();
    const _id=auth?.user?._id;
    const router = useRouter();
    
    useEffect(() => {
        if(!auth?.token){
          router.push("/signup")
        }      

    }, [auth,router])
     
    
    const handleLogout=()=>{
        setAuth({
          ...auth,
          user:null,
          token:''
        })
        localStorage.removeItem("auth");
        toast.success("User Logout Successfully",{toastId: 'logout'});  
      }
  return (
    <>
   <div className="bg-gradient-to-br from-blue-100 to-purple-300  flex items-center justify-center p-4 mt-[130px]">
    
  <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col lg:flex-row lg:w-3/4 xl:w-1/2">
  
    <div className="w-full lg:w-1/2 ">
      <ul>
        <li className="p-4 border border-gray-300 ">
          <strong>Name:</strong> {auth?.user?.name}
        </li>
        <li className="p-4 border border-gray-300 ">
          <strong>Email:</strong> {auth?.user?.email}
        </li>
        <li className="px-4 py-2 border border-gray-300  ">
        <Link href="/userorder" className="text-black shadow-md hover:bg-gray-200 font-bold py-2 px-4 rounded ">Orders</Link>
        </li>
        <li className="px-4 py-2 border border-gray-300 ">
        <button
          onClick={handleLogout}
          className="  text-black bg-red-500 shadow-md hover:bg-gray-200 font-bold py-2 px-4 rounded "
        >
          Logout
        </button>
        </li>
        
      </ul>
    </div>
   <div className="w-full lg:w-1/2 ">
    <h2 className='p-10 text-center'>Hello, {auth?.user?.name} (not {auth?.user?.name}? <span className='text-blue-400 cursor-pointer' onClick={handleLogout}>Log out)</span></h2>
   </div>
  </div>
</div>

    </>
  )
}

export default Userprofile