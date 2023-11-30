
import axios from 'axios';
import Link from 'next/link';
import React,{useState, useEffect} from 'react';
import { toast } from 'react-toastify';

const Gallery = () => { 
  const [products, setAllProducs] = useState([]); //for all products
 
  //GET ALL PRODUCTS FOR ADMIN
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(`/api/getproducts`);
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
    <section className='w-[100%] flex flex-col items-center justify-center'>
      <section className='flex items-center justify-center m-10'>
        <h1 className='text-[28px] text-black font-oswald font-bold md:text-[32px]'>
          Product Gallery
        </h1>
      </section>
      <section>
  <div className='container mx-auto px-5 py-2 lg:px-32 mb-4'>
    <div className='-m-1 flex flex-wrap md:-m-2'>
      {products?.slice(0, 6).map((item, i) => (
        <Link key={i} href={`/product/${item?.slug}`} className='flex w-full sm:w-1/2 md:w-1/2 lg:w-1/3'>
          <div className='w-full p-1 md:p-2'>
            <img
              width={500}
              height={500}
              alt='gallery'
              className='block h-[340px] w-[380px]  rounded-lg object-cover object-center'
              src={`${item?.images[0]?.url}`}
            />
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>


    </section>
  );
};

export default Gallery;
