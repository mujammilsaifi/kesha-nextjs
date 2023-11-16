
import { useRouter } from 'next/router'
import ReactMarkdown from "react-markdown";
import Wrapper from '@/components/wrapper';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Carousels from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IoMdHeartEmpty } from "react-icons/io";
const API=process.env.NEXT_PUBLIC_APP_API_URL
import React, { useState, useEffect } from "react";
import axios from "axios";

import Link from "next/link";
import { useCart } from '@/context/Cart';
import { toast } from 'react-toastify';
export async function getServerSideProps({ req,query }) {
  const { slug } = query;
  
  try {
    const { data } = await axios.get(`${API}/api/product/${slug}`);
    if (data?.success) {
      return {
        props: {
          product: data.product,
        },
      };
    }
  } catch (error) {
    console.error(error);
  }

  // Return an empty product if there's an error or the data doesn't exist
  return {
    props: {
      product: null,
    },
  };
}


const product = ({ product }) => {
  const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1023, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 767, min: 0 },
        items: 1,
    },
};
  const DetailsSection = [
    {
      name: "Description"
    },
    {
      name: "Reviews"
    },
    {
      name: "shipping & Delivery"
    },
    {
      name: "Refund policy & Exchanges"
    },
    {
      name: "Ask Question"
    }
  ]
  const [cart,setCart] =useCart();
  const router = useRouter();
  
  const [products, setRelatedProducs] = useState([]); //for related products
  const [productSec, setProductSec] = useState(1);
  const [psize, setSize] = useState(11);
  
  
  const handleShow = (no) => {
    setProductSec(no)
  }
  const size = [6, 7, 8, 9, 10, 11, 12, 13, 14];
  const handleSizeOfProduct=(e)=>{
    let size=e.target.value;
    setSize(size);
  }
  

//GET RELATED PRODUCTS 
const relatedProduct = async (pid,cid) => {
  try {
    const { data } = await axios.get(`/api/relatedproduct/${pid}/${cid}`);
    if (data?.success) {
      setRelatedProducs(data?.products);  
    }
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  relatedProduct(product?._id,product?.category)  
}, [product]);

  const itemExists = cart.some((p) => p._id ===product?._id);
  
  return (
    <section className='w-full py-5 md:py-20 mt-[60px] md:mt-[100px]'>
      <Wrapper className={`w-[1600px]`}>
        <div className="flex flex-col lg:flex-row md:px-4 gap-[10px]: md:gap-[20px] lg:gap-[100px]">
          {/* left column start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
          <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
            <Carousel
                infiniteLoop={true}
                showIndicators={false}
                showStatus={false}
                thumbWidth={60}
                className="productCarousel"
            >
              
            {product?.images?.map((img)=>(
              <img src={img?.url} alt="" /> 
            ))}
                
            </Carousel>
        </div>
          </div>
          {/* left column end */}

          {/* right column start */}
          <div className="flex-[1] py-3">
            {/* PRODUCT TITLE */}
            <div className="text-[18px] md:text-[22px] font-semibold mb-2 leading-tight">
              {product?.name}
            </div>

           
            {/* PRODUCT PRICE */}
            <div className="flex items-center mu-2">
              <p className="mr-2 text-lg font-semibold">
                MRP : &#8377;{product?.price-product?.sprice !=product?.price ? product?.sprice : product?.price}
              </p>
              <p className="text-base  font-medium line-through">
                {product?.price-product?.sprice !=product?.price ? <span>&#8377;{product?.price}</span> : null}
              </p>
              <p className="ml-auto text-base font-medium text-green-500">
              { product?.price - product?.sprice !== product?.price ? `${Math.round((product?.price - product?.sprice) / product?.price * 100)} % off` : null}
              </p>
            </div>

            {/* product details */}
            <div className="text-md font-medium text-black my-4">
              <ul className='list-disc list-inside'>
                <li><span>Material : </span>{`${product?.material}`}</li>
                <li><span>Total Weight: </span>{`${product?.weight}`}</li>
                <li><span>Ring Diameter : </span>{`${product?.length} cm (${product?.width} inch)`}</li>
                <li><span>Settings : </span>{`${product?.setting}`}</li>
                <li><span>Color: </span>{`${product?.color}`}</li>
                
              </ul>
            </div>

            {/* PRODUCT SIZE RANGE START */}
            

              {/* SIZE START */}
              <div className="mb-10">

              {/* SIZE START */}
              <div>
                <select id="size" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-2.5  dark:bg-black dark:border-black dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleSizeOfProduct}>
                  <option selected >Select Size</option>
                  {
                    size.map((size, i) => {
                      return (
                        <option value={size} key={i}>{size}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
            {/* PRODUCT SIZE RANGE END */}

            {/* ADD TO CART BUTTON START */}
            
            <button
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75" onClick={() => {
                if (!itemExists) {
                  const salePrice=product?.price-product?.sprice !=product?.price ? product?.sprice : product?.price;
                  const cartItem = { ...product,psize,qty:1,salePrice};
                  setCart([...cart, cartItem]);
                  localStorage.setItem("cart", JSON.stringify([...cart,cartItem]));
                  toast.success("Item Added Successfully");
                } else {
                  router.push('/cart');
                }
              }}
              
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
                <ReactMarkdown>{`${product?.description?.substring(0, 200)}...`}</ReactMarkdown>
              </div>
            </div>
          </div>
          {/* right column end */}
        </div>

        <hr className='w-full h-[2px] mx-auto mt-5 bg-gray-100 border-0 rounded md:mt-5 dark:bg-gray-700' />
        <section className='productData flex flex-col md:flex-row items-start md:items-center justify-around my-4'>
          {
            DetailsSection.map((item, i) => {
              return (
                <>
                  <span className='text-black text-[18px] font-oswald font-bold hover:underline cursor-pointer' onClick={() => handleShow(i)}>{item.name}</span>
                  <hr className='w-full h-[2px] mx-auto mt-5 bg-gray-100 border-0 rounded md:mt-5 dark:bg-gray-700 md:hidden' />
                </>
              )
            })
          }
        </section>

        <section className={productSec === 0 ? `decription h-[100%] w-[100%] p-5` : "hidden"}>
          <h1>
            {`Decription`}
          </h1>
          <p>{
            `${product?.description}
            `
          }
          </p>
          </section>
          <section className={productSec === 1 ? 'Reviews flex flex-col md:flex-row items-center justify-around' : "hidden"}>
          <section className='userReviews'>
            <figure className="max-w-screen-md mx-auto text-center">
              <svg className="w-10 h-10 mx-auto mb-3 text-black dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
              </svg>
              <blockquote>
                <p className="text-2xl italic font-medium text-black dark:text-black">"Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application."</p>
              </blockquote>
              <figcaption className="flex items-center justify-center mt-6 space-x-3">
                <img className="w-6 h-6 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png" alt="profile picture" />
                <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                  <cite className="pr-3 font-medium text-black dark:text-black">Micheal Gough</cite>
                  <cite className="pl-3 text-sm text-black dark:text-black">CEO at Google</cite>
                </div>
              </figcaption>
            </figure>
          </section>
          {/* reviwe form */}

          <section className='review form'>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white">
              <div className="flex-auto p-5 lg:p-10">
                <h4 className="text-2xl mb-4 text-black font-semibold">Have a Review?</h4>
                <form id="feedbackForm" action method>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="email">Email</label><input type="email" name="email" id="email" className="border-0 px-3 py-3 rounded text-sm shadow w-full
              bg-gray-300 placeholder-black text-gray-800 outline-none focus:bg-gray-400" placeholder=" " style={{ transition: 'all 0.15s ease 0s' }} required />
                  </div>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="message">Review</label><textarea maxLength={300} name="feedback" id="feedback" rows={4} cols={80} className="border-0 px-3 py-3 bg-gray-300 placeholder-black text-gray-800 rounded text-sm shadow focus:outline-none w-full" placeholder required defaultValue={""} />
                  </div>
                  <div className="text-center mt-6">
                    <button id="feedbackBtn" className="bg-black text-white text-center mx-auto active:bg-yellow-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="submit" style={{ transition: 'all 0.15s ease 0s' }}>Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </section>
        <section className={productSec === 2 ? 'shipping flex items-center justify-around' : "hidden"}>
          <ul className='list-disc list-inside'>
            <li>We provide worldwide free shipping</li>
            <li>We do not provide any service to India, China, and Brazil because of border regulation</li>
            <li>Most orders require 24 to 48 hours for dispatch</li>
            <li>The customer may check the delivery status on Bysilverstone&gt;My Account section</li>
            <li>Our shipping partners are DHL, FedEx, TNT, and UPS</li>
            <li>The customer also may check the delivery status on the shipping company's website with the tracking number</li>
            <li>U.S.A &amp; Canada - The shipping process can take 3 - 5 business days after dispatch</li>
            <li>Europe &amp; United Kingdom - The shipping process can take 1 - 3 business days after dispatch</li>
            <li>Rest of World - - The shipping process can take 5 - 7 business days after dispatch</li>
            <li>Due to additional quarantine measures, the shipping processes can take longer than expected.</li>
            <li>There is no shipment made from Bysilverstone at the weekends</li>
            <li>Bysilverstone makes all shipments fully insured at no extra cost to customers.</li
            ><li>If the shipping company fails to deliver, the customers do not suffer from any loss.</li>
            <li>The customer accepting the delivery should not accept deliveries where the box or packaging has been damaged or if the box is empty.</li>
            <li>BySilverstone will not be responsible for lost and stolen packages or any damages to the package after being left at the customer's address by the shipping agency.</li>
            <li>Click Return or Refund Policy</li></ul>

        </section>

        <section className={productSec === 3 ? 'Refund' : "hidden"}>
          <p>
            If for any reason you are not completely satisfied with your purchase, we gladly accept your return request within 14 days of purchase but also we provide cancellation of the order if the customers request within one hour of purchase
          </p>

          <ul className='list-disc list-inside my-6'>
            <li>
              The customers have to contact us within the first 14 days of purchase and have to declare the reason for the return
            </li>
            <li>
              The products have to be unused and in the original condition for returns
            </li>
            <li>
              The products have to be sent in original package
            </li>
            <li>
              The customers are responsible to pay the shipping fees for returns.
            </li>
            <li>
              When we receive a returned product in declared conditions, we make a full refund on the same day.
            </li>
            <li>
              The funds are being credited to your original payment method.
            </li>
            <li>
              The refunding process with Paypal is credited in 1 business day.
            </li>
            <li>
              The refunding process with the credit card is credited in between 3-10 business days.
            </li>
          </ul>

          <p className='m-2'>
            We do not accept exchanges. If the customer completely wants to exchange, customers can request a refund and make another purchase when the process is completed.
          </p>
          <p className='m-2'>
            Due to additional quarantine measures, we can apply extra days for the returning process. The customers have to inform us.
            We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.
          </p>
          <p className='m-2'>
            To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.
          </p>
          <p className='m-2'>
            To start a return, you can contact us at customer@.com. If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.
          </p>
          <p className='m-2'>
            You can always contact us for any return questions at customer@kesha.com.
          </p>

          <div className='m-2'>
            <p>
              Damages and issues
            </p>
            Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item so that we can evaluate the issue and make it right.
          </div>

          <div className='m-2'>
            <p>
              Exceptions / non-returnable items
            </p>
            Certain types of items cannot be returned, like perishable goods (such as food, flowers, or plants), custom products (such as special orders or personalized items), and personal care goods (such as beauty products). We also do not accept returns for hazardous materials, flammable liquids, or gases. Please get in touch if you have questions or concerns about your specific item.
          </div>
          <p className='m-2'>
            Unfortunately, we cannot accept returns on sale items or gift cards.
          </p>

          <div className='m-2'>
            <h1>
              Exchanges
            </h1>
            The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
          </div>

          <div className='m-2'>
            <h1>
              Refunds
            </h1>
            We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund too.
          </div>

          <span>
            customer@kesha.com
          </span>
        </section>

        <section className={productSec === 4 ? 'Question flex items-center justify-center' : "hidden"}>
          <form action="#" className="space-y-8 w-[60%] my-10">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-black dark:text-black">Your email</label>
              <input type="email" id="email" className="shadow-sm bg-white border border-white text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-white dark:border-black dark:placeholder-black dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-black dark:text-black">Subject</label>
              <input type="email" id="subject" className="shadow-sm bg-white border border-white text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-white dark:border-black dark:placeholder-black dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-black dark:text-black">Your message</label>
              <textarea id="message" rows={6} className="block p-2.5 w-full text-sm text-black bg-white rounded-lg shadow-sm border border-gray-300  dark:bg-white dark:border-black dark:placeholder-black dark:text-black" placeholder="Leave a comment..." defaultValue={""} />
            </div>
            <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-black sm:w-fit focus:ring-4 focus:outline-none ">Send message</button>
          </form>
        </section>
        
        <div className="mt-[50px] md:mt-[100px] mb-[100px] md:mb-0">
            <div className="text-2xl font-bold mb-5">You Might Also Like</div>
            <Carousels
                responsive={responsive}
                containerClass="-mx-[10px]"
                itemClass="px-[10px]"
            >
               
               { products?.map((product, index) => (
                    <Link
                    href={`/product/${product?.slug}`}
                    className="transform overflow-hidden bg-white duration-200 rounded-md hover:scale-105 cursor-pointer p-4"
                >
                    <img
                        width={500}
                        height={500}
                        src={`${product?.images[0]?.url}`}
                        alt={`hero-1.jpg`}
                        className="rounded-md w-[300px]"
                    />
                    <div className="text-black/[0.9] mt-2">
                        <h2 className="text-[16px] md:text-lg font-medium">{product?.name}</h2>
                        <div className="flex items-center text-black/[0.5]">
                            <p className="mr-2 text-[16px] md:text-lg font-semibold">
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
               
                
                
            </Carousels>
        </div>
      </Wrapper>
    </section>
  )
}

export default product;