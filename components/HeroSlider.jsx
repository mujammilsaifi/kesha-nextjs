import React,{useState,useEffect} from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import axios from "axios";
const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
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
        
        }
    }

    useEffect(() => {
        getAllSlide();
    }, [])
    return (
        
        <div className="relative text-white text-[20px] w-full mx-auto md:mt-[130px] mt-[100px]">
            <Carousel responsive={responsive} infinite={true} infiniteLoop={true} autoPlay={true} autoPlaySpeed={3000}>
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
