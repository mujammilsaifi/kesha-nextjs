import React from 'react';
import { useRouter } from 'next/router'
import Wrapper from '@/components/wrapper';
import ProductCard from '@/components/ProductCart';

const category = () => {
  const rout = useRouter();
  const { slug } = rout.query;

  return (
    <section className=''>
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-10">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {slug}
          </div>
        </div>

        {/* products grid start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Wrapper>
    </section>
  )
}

export default category;