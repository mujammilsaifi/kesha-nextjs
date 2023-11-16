
import { useRouter } from 'next/router'
import Wrapper from '@/components/wrapper';
import ProductCard from '@/components/ProductCart';
import React, { useState, useEffect } from "react";
import axios from "axios";
const API = process.env.NEXT_PUBLIC_APP_API_URL;
export async function getServerSideProps({ req,query }) {
  const { slug } = query;
  
  try {
    const { data } = await axios.get(`${API}/api/category/${slug}`);
    if (data?.success) {
      return {
        props: {
          catProducts: data.products,
        },
      };
    }
  } catch (error) {
    console.error(error);
  }

  // Return an empty product if there's an error or the data doesn't exist
  return {
    props: {
      catProducts: null,
    },
  };
}
const category = ({catProducts}) => {
  const router = useRouter();
  const { slug } = router.query;

  

  return (
    <section className='mt-[120px]'>
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-10">
          <div className="text-[28px] uppercase  md:text-[34px] mb-5 font-semibold leading-tight">
            {slug}
          </div>
        </div>

        {/* products grid start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-14 px-0 md:px-0">
        {catProducts?.map((product) => (
          <ProductCard {...product} />
          ))}
         
        </div>
      </Wrapper>
    </section>
  )
}

export default category;