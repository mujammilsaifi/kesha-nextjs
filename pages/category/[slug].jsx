
import { useRouter } from 'next/router'
import Wrapper from '@/components/wrapper';
import ProductCard from '@/components/ProductCart';
import React from "react";
import mongoose from "mongoose"
import productModel from '@/Models/productModel';
import categoryModel from '@/Models/categoryModel';

export async function getServerSideProps({ query }) {
  const { slug } = query;  
  try {
    if(!mongoose.connections[0].readyState){
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);
    }
    const category = await categoryModel.findOne({ slug })
    const products=await productModel.find({category:category.name});
    return {
        props: {
          catProducts: JSON.parse(JSON.stringify(products)),
        },
    };
  } catch (error) {
    console.log(error);
  }

  // Return an empty product if there's an error or the data doesn't exist
  return {
    props: {
      catProducts: null,
    },
  };
}
const Category = ({catProducts}) => {
  const router=useRouter()
  const {slug}=router.query;
  return (
    <section className='mt-[140px]'>
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-2 md:mt-1">
          <div className="text-[28px] uppercase  md:text-[34px] mb-2 font-semibold leading-tight">
            {slug}
          </div>
        </div>

        {/* products grid start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-8 px-0 md:px-0">
        {catProducts?.map((product, i) => (
          <ProductCard key={i} {...product} />
          ))}
         
        </div>
      </Wrapper>
    </section>
  )
}

export default Category;