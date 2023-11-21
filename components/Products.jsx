
import React, { useState, useEffect } from "react";
import axios from "axios";
const API = process.env.NEXT_PUBLIC_APP_API_URL;
import Link from "next/link";
import { toast } from "react-toastify";

const Products = ({category}) => {
  const name=category?.name;
  const slug=category?.slug;
  const [products, setAllProducs] = useState([]); //for all products
 
  //GET ALL PRODUCTS FOR ADMIN
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(`/api/category/${slug}`);
      if (data?.success) {
        setAllProducs(data?.products);  
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
      getAllProduct();
   
  }, []);
  return (
    <section className="overflow-hidden">
    <section className='h-[100px] w-[full] flex flex-col justify-center items-center gap-3'>
        <h1 className='text-[28px] text-black font-oswald font-bold md:text-[32px]'>{name}</h1>
        <p className='text-[16px] md:font-medium text-center'>{` ${name} In the Good Vibes`}</p>
    </section>
    <section className='flex items-cnter justify-center'>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 px-2 overflow-hidden md:px-8">
          {products?.map((product,index)=>(
             <Link key={index}
             href={`/product/${product?.slug}`}
             className="transform overflow-hidden bg-white duration-200 rounded-md hover:scale-105 cursor-pointer p-2"
         >
             <img
                 width={500}
                 height={500}
                 src={`${product?.images[0]?.url}`}
                 alt={`hero-1.jpg`}
                 className="rounded-md md:h-[320px] md:w-[360px] w-[360px]"
             />
             <div className="text-black/[0.9] mt-2">
                 <h2 className="text-[13px] md:text-[16px] font-medium">{product?.name.slice(0,65)}...</h2>
                 <div className="flex items-center text-black/[0.5]">
                 MRP: <p className="mr-2 text-[16px] md:text-lg font-bold">
                         {/* &#8377;{p.price} */}
                        
                         &#8377;{product?.price-product?.sprice !=product?.price ? product?.sprice : product?.price}
                     </p>
                     <p className="text-[16px] md:text-lg font-medium line-through">
                         {/* &#8377;{p.orignal_price} */}
                         {product?.price-product?.sprice !=product?.price ? <span>&#8377;{product?.price}</span> : null}
                     </p>
                     <p className="ml-auto text-[16px] md:text-lg font-medium text-green-500">
                    
                     { product?.price - product?.sprice !== product?.price ? `${Math.round((product?.price - product?.sprice) / product?.price * 100)} % off` : null}
                     </p>
                 </div>
             </div>
         </Link>
          ))}
           
          
            
        </section>
    </section>
</section>
  );
};

export default Products;
