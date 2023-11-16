import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
const API=process.env.NEXT_PUBLIC_APP_API_URL

const SearchPage = ({ setShowSearch }) => {
  const [keyword, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async(event) => {
    setSearchTerm(event.target.value);
    try {
        const {data}=await axios.get(`/api/searchproduct/${keyword}`);
        if(data)
          setSearchResults(data)
      } catch (error) {
        console.log(error);
      }
  };
  return (
    <div className="h-[100vh] w-[100%] mx-auto p-4 fixed top-0 z-[9999] bg-white">
      <AiFillCloseCircle
        className="text-[22px] md:text-[32px] cursor-pointer absolute left-[95%]"
        onClick={() => setShowSearch(false)}
      />
      <div className="flex items-center justify-center my-4">
        <input
          className="border border-gray-300 rounded-l py-2 px-4 w-1/2"
          type="text"
          placeholder="Search products"
          value={keyword}
          onChange={handleSearch}
        />
        <button className="bg-black text-white font-bold py-2 px-4 rounded-r">
          Search
        </button>
      </div>
      <div>
        {searchResults?.length > 0 ? (
          <ul className="">
            {searchResults?.map((product, i) => (
              <Link href={`/product/${product?.slug}`} key={i}>
                <li
                  className="py-2 md:py-4 flex items-center justify-center"
                  onClick={() => setShowSearch(false)}
                >
                  <div className="flex w-[100%] md:w-[50%] md:py-5 gap-3 md:gap-5 border-b">
                    {/* IMAGE START */}
                    <div className="w-[50px] md:w-[120px]">
                      <img
                        src={`${product?.images[0]?.url}`}
                        alt={"sub"}
                        width={120}
                        height={120}
                      />
                    </div>
                    {/* IMAGE END */}

                    <div className="w-full flex flex-col">
                      <div className="">
                        {/* flex flex-col md:flex-row justify-between */}
                        {/* PRODUCT TITLE */}
                        <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
                          {`${product.name}`}
                        </div>

                        {/* PRODUCT PRICE */}
                        <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
                          MRP : {product?.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 my-4">No products found</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
