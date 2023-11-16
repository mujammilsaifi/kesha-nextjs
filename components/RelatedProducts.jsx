import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCart";
const API = process.env.NEXT_PUBLIC_APP_API_URL;
const RelatedProducts = ({products}) => {

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
    
    
    return (
        <div className="mt-[50px] md:mt-[100px] mb-[100px] md:mb-0">
            <div className="text-2xl font-bold mb-5">You Might Also Like</div>
            <Carousel
                responsive={responsive}
                containerclassName="mx-[10px]"
                itemclassName="px-[10px]"
            >
               
               { products?.map((product, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-14 px-0 md:px-0">
                    <ProductCard {...product} />
                    </div>
                ))}
               
                
                
            </Carousel>
        </div>
    );
};

export default RelatedProducts;