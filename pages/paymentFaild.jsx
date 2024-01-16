import Wrapper from '@/components/wrapper';
import React,{useState,useEffect} from 'react';
import Link from 'next/link';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
const API = process.env.NEXT_PUBLIC_APP_API_URL;
const PaymentFaild = () => {
    
    const [categories, setCategories] = useState([]); //for all category
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1023, min: 464 },
            items: 3,
        },
        mobile: {
            breakpoint: { max: 767, min: 0 },
            items: 2,
        },
    };
    
    const getCategory = async () => {
        try {
          const { data } = await axios.get(`/api/getcategory`);
          if (data?.success) {
            setCategories(data?.category);
          }
        } catch (error) {
          console.log(error);
          alert(error);
        }
      };
      useEffect(() => {
        getCategory();
      }, []);
    return (
        <div className="min-h-[650px] flex items-center mt-[100px]">
            <Wrapper>
                <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
                    <div className="text-2xl font-bold text-red-500">Payment failed!</div>
                    <div className="text-base mt-5">
                        For any product related query, drop an email to
                    </div>
                    <div className="underline">keshajewels@gmail.com</div>

                    <Link href="/" className="font-bold mt-5">
                        Continue Shopping
                    </Link>
                </div>
                <Wrapper className={`mt-5 md:mt-5`}>
                    <div className="mt-[10px] md:mt-[10px] mb-[10px] md:mb-0">
                        <Carousel
                            responsive={responsive}
                            containerClass="-mx-[10px]"
                            itemClass="px-[5px] md:px-[10px]"
                            autoPlay
                            autoPlaySpeed={2000}
                            infinite
                            className='-mx-0'
                        >
                            {
                                categories?.map((elm, i) => {
                                    
                                    return (
                                        <Link key={i} href={`/category/${elm.slug}`}  >
                                            <section  className='relative transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer '>
                                                <img src={`${elm.url}`} alt="img" className='h-[180px] w-[100%] md:h-[320px] md:w-[360px]'/>
                                                <div className='absolute top-[70%] md:top-[75%] left-2 md:left-5 text-[12px] md:text-[18px] text-white drop-shadow-lg' >
                                                    <p className='p-1 md:p-2 text-black text-shadow-lg bg-white rounded-lg duration-200'>{elm.name}</p>
                                                </div>
                                            </section>
                                        </Link>
                                    )
                                })
                            }
                        </Carousel>
                    </div>
                </Wrapper>
            </Wrapper>
        </div>

    );
};


export default PaymentFaild