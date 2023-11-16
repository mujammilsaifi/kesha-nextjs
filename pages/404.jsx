import Wrapper from '@/components/wrapper';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Custom404 = () => {

    const data = [
        {
            img: '/category/1.png',
            text: "Rings",
            btn: "View All",
            url: "/category/"
        },
        {
            img: '/category/2.png',
            text: "Necklaces",
            btn: "View All",
            url: "/category/"
        },
        {
            img: '/category/3.png',
            text: "Earings",
            btn: "View All",
            url: "/category/"
        },
        {
            img: '/category/4.png',
            text: "Best Collection",
            btn: "View All",
            url: "/category/"
        },
        {
            img: '/category/5.png',
            text: "Earings",
            btn: "View All",
            url: "/category/"
        },
        {
            img: '/category/1.png',
            text: "Rings",
            btn: "View All",
            url: "/category/"
        },
        {
            img: '/category/2.png',
            text: "Necklaces",
            btn: "View All",
            url: "/category/"
        },
        {
            img: '/category/3.png',
            text: "Earings",
            btn: "View All",
            url: "/category/"
        },
        {
            img: '/category/4.png',
            text: "Best Collection",
            btn: "View All",
            url: "/category/"
        },
        {
            img: '/category/5.png',
            text: "Earings",
            btn: "View All",
            url: "/category/"
        }
    ]

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


    return (
        <section className='mt-5 md:mt-[100px]'>
            <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
                <Image
                    src="/empty-cart.jpg"
                    width={300}
                    height={300}
                    className="w-[220px] md:w-[300px]"
                />
                <span className="text-xl font-bold">Page Not Found</span>
                <span className="text-center mt-4 p-5">
                    Looks like you have search something wrong !.
                    <br />
                    Explore top categories.
                </span>
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
                                data.map((elm, i) => {
                                    const { img, text, btn, url } = elm;

                                    return (
                                        <Link href={`/category/${elm.text}`}  >
                                            <section key={i} className='relative transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer '>
                                                <img src={img} alt="img" />
                                                <div className='absolute top-[70%] md:top-[75%] left-2 md:left-5 text-[12px] md:text-[18px] text-white drop-shadow-lg' >
                                                    <p className='p-1 md:p-2 text-black text-shadow-lg bg-white rounded-lg duration-200'>{text}</p>
                                                </div>
                                            </section>
                                        </Link>
                                    )
                                })
                            }
                        </Carousel>
                    </div>
                </Wrapper>

                <Link
                    href="/"
                    className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
                >
                    Continue Shopping
                </Link>
            </div>
        </section>
    )
}

export default Custom404;