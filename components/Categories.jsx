import React,{useState,useEffect} from 'react'
import Link from 'next/link';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from 'axios';
const API=process.env.NEXT_PUBLIC_APP_API_URL

const Categories = () => {

    const [categories, setCategories] = useState([]); //for all categories


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

    //GET ALL CATEGORY FOR HOME PAGE
    const getAllCategory=async()=>{
        try {
            const {data}=await axios.get(`/api/getcategory`);
            if(data?.success){
                setCategories(data?.category);
            }
        } catch (error) {
        console.log(error);
        alert(error); 
        }
    } 

    useEffect(() => {
    getAllCategory();
    }, [])
    return (
        <>
            <div className="mt-[10px] md:mt-[10px] mb-[10px] md:mb-0">
                {/* <div className="text-2xl font-bold mb-5">You Might Also Like</div> */}
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
                        categories.map((cat, i) => {
                            
                            return (
                                <Link href={`/category/${cat.slug}`}  >
                                    <section key={i} className='relative transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer '>
                                        <img src={`${cat.url}`} alt={cat.name} className='h-[180px] w-[100%] md:h-[320px] md:w-[360px]' />
                                        <div className='absolute top-[75%] md:top-[82%] left-2 md:left-5 text-[12px] md:text-[18px] text-white drop-shadow-lg' >
                                            <p className='p-1 md:p-2 text-black text-shadow-lg bg-white rounded-lg duration-200'>{cat.name}</p>
                                        </div>
                                    </section>
                                </Link>
                            )
                        })
                    }
                </Carousel>
            </div>
        </>
    )
}

export default Categories;