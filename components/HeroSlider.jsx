import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { BiArrowBack } from "react-icons/bi";

const data = [
    {
        img: "/kesha-banner/1.png",
        text: "Anubis and Ankh Necklace",
        imgSec: "/category/1.png",
        btn: "Shop Now",
        rate: "99.00"
    },
    {
        img: "/kesha-banner/2.png",
        text: "Anubis and Ankh Necklace",
        imgSec: "/category/2.png",
        btn: "Shop Now",
        rate: "99.00"
    },
    {
        img: "/kesha-banner/3.png",
        text: "Anubis and Ankh Necklace",
        imgSec: "/category/3.png",
        btn: "Shop Now",
        rate: "99.00"
    },
    {
        img: "/kesha-banner/4.png",
        text: "Anubis and Ankh Necklace",
        imgSec: "/category/4.png",
        btn: "Shop Now",
        rate: "99.00"
    }
];

const HeroSlider = () => {
    return (
        // className={`px-5 py-5`}
        <div className="relative text-white text-[20px] w-full mx-auto ">
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                renderArrowPrev={(clickHandler, hasPrev) => (
                    <div
                        onClick={clickHandler}
                        className="absolute right-[30px] md:right-[51px] bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer border-1 border-white-500/100 hover:opacity-90"
                    >
                        <BiArrowBack className="text-sm md:text-lg" />
                    </div>
                )}
                renderArrowNext={(clickHandler, hasNext) => (
                    <div
                        onClick={clickHandler}
                        className="absolute right-0 bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer border-1 border-white-500/100 hover:opacity-90"
                    >
                        <BiArrowBack className="rotate-180 text-sm md:text-lg" />
                    </div>
                )}
            >
                {data.map((curEle, i) => {
                    const { img, text, imgSec, btn, rate, } = curEle;
                    return (
                        <div key={i}>
                            <img
                                src={img}
                                className="aspect-[16/10] md:aspect-auto object-cover"
                            />
                            <div className="h-[100%] w-[40%] absolute top-0 left-0 z-10 px-[5px] md:px-[10px] py-[5px] md:py-[25px] bg-black cursor-pointer transition ease-in-out duration-300 font-oswald font-medium p-8 opacity-80 hover:opacity-99">
                                <span className="text-[18px] md:text-[16px] lg:text-[32px]">{text}</span>
                                <img src={imgSec} alt="image" className="p-4 md:p-6 lg:p-8" />
                                <p className="text-[12px] md:text-[22px] lg:text-[32px]">&#8377;{rate}</p>
                                <button className="px-1 py-0 mx-0 my-0 md:px-2 md:py-2 md:my-4 lg:my-5 text-[12px] md:text-[32px] lg:text-[22px]  border-[1px] border-white-100/100 hover:text-[18px]">{btn}</button>
                            </div>
                        </div>
                    );
                })}
            </Carousel>
        </div>
    );
};

export default HeroSlider;
