
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_APP_API_URL;
const ProductCard = ({_id,name,slug,price,sprice,images}) => {
   
    return (
        <Link
            href={`/product/${slug}`}
            className="transform overflow-hidden bg-white duration-200 rounded-md hover:scale-105 cursor-pointer p-2"
        >
            <img
                width={500}
                height={500}
                src={`${images[0]?.url}`}
                alt={`${name}`}
                className="rounded-md h-[320px] w-[360px]"
            />
            <div className="text-black/[0.9] mt-2">
                <h2 className="text-[16px] md:text-lg font-medium">{name.slice(0,64)}...</h2>
                <div className="flex items-center text-black/[0.5]">
                    <p className="mr-2 text-[16px] md:text-lg font-semibold">
                        {/* &#8377;{p.price} */}                       
                        &#8377;{price-sprice !=price ? sprice : price}
                    </p>
                    <p className="text-[16px] md:text-lg font-medium line-through">
                        {/* &#8377;{p.orignal_price} */}
                        {price-sprice !=price ? <span>&#8377;{price}</span> : null}
                    </p>
                    <p className="ml-auto text-[16px] md:text-lg font-medium text-green-500">
                   
                    { price - sprice !== price ? `${Math.round((price - sprice) / price * 100)} % off` : null}
                    </p>
                </div>
            </div>
        </Link>
    );
}; 

export default ProductCard;
