import React,{useState,useEffect} from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-toastify";
const API=process.env.NEXT_PUBLIC_APP_API_URL

const HeroSlider = () => {
    const [slides, setSlide]= useState([]); //for all slides
   
     //GET ALL SLIDE FOR HERO SECTION
    const getAllSlide=async()=>{
       
        try {
            const {data}=await axios.get(`/api/getslider`);
            if(data?.success){
                setSlide(data.sliders);
            }
        } catch (error) {
        console.log(error);
        alert(error);
        }
    }

    useEffect(() => {
        getAllSlide();
    }, [])
    return (
        // className={`px-5 py-5`}
        <div className="relative text-white text-[20px] w-full mx-auto mt-[105px]">
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
                {slides.map((slide, i) => {
                    
                    return (
                        <div key={i}>
                            <img  src={`${slide.url}`} className="card-img-top p-image w-100" alt={slide.title} />         
                        </div>
                    );
                })}
            </Carousel>
        </div>
    );
};

export default HeroSlider;
