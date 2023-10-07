import React from 'react';
import { useRouter } from 'next/router'
import ReactMarkdown from "react-markdown";
import Wrapper from '@/components/wrapper';
import ProductDetailsCarousel from '@/components/ProductDetailsCarousel';

import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { FaUser, FaSearch } from "react-icons/fa";
import { VscChromeClose } from 'react-icons/vsc';
import { BiMenuAltRight } from 'react-icons/bi';

const product = () => {
  const rout = useRouter();
  const { slug } = rout.query;

  return (
    <section className='w-full py-5 md:py-20'>
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          {/* left column start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductDetailsCarousel />
          </div>
          {/* left column end */}

          {/* right column start */}
          <div className="flex-[1] py-3">
            {/* PRODUCT TITLE */}
            <div className="text-[34px] font-semibold mb-2 leading-tight">
              {slug}
            </div>

            {/* PRODUCT SUBTITLE */}
            <div className="text-lg font-semibold mb-5">{`Product Subtitle`}</div>

            {/* PRODUCT PRICE */}
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">
                MRP : &#8377;{`99.00`}
              </p>
              <p className="text-base  font-medium line-through">
                &#8377;{`99.00`}
              </p>
              <p className="ml-auto text-base font-medium text-green-500">
                10%
                off
              </p>
            </div>

            <div className="text-md font-medium text-black/[0.5]">
              incl. of taxes
            </div>
            <div className="text-md font-medium text-black/[0.5] mb-20">
              {`(Also includes all applicable duties)`}
            </div>

            {/* PRODUCT SIZE RANGE START */}
            <div className="mb-10">
              {/* HEADING START */}
              <div className="flex justify-between mb-2">
                <div className="text-md font-semibold">Select Size</div>
                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                  Select Guide
                </div>
              </div>
              {/* HEADING END */}

              {/* SIZE START */}
              <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                <div
                  className={`border rounded-md text-center py-3 font-medium cursor-not-allowed bg-black/[0.1] opacity-50`}
                  onClick={() => {
                    setSelectedSize(item.size);
                    setShowError(false);
                  }}
                >
                  {`item size`}
                </div>
                {/* ))} */}
              </div>
              {/* SIZE END */}

              {/* SHOW ERROR START */}
              {/* SHOW ERROR END */}
            </div>
            {/* PRODUCT SIZE RANGE END */}

            {/* ADD TO CART BUTTON START */}
            <button
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
            >
              Add to Cart
            </button>
            {/* ADD TO CART BUTTON END */}

            {/* WHISHLIST BUTTON START */}
            <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
              Whishlist
              <IoMdHeartEmpty size={20} />
            </button>
            {/* WHISHLIST BUTTON END */}

            <div>
              <div className="text-lg font-bold mb-5">Product Details</div>
              <div className="markdown text-md mb-5">
                <ReactMarkdown>{`product discription : Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, voluptatem doloribus a assumenda maxime exercitationem ducimus repellat nulla qui illo. Possimus consectetur illo qui sunt fugiat exercitationem maxime ducimus iusto!`}</ReactMarkdown>
              </div>
            </div>
          </div>
          {/* right column end */}
        </div>
      </Wrapper>
    </section>
  )
}

export default product;