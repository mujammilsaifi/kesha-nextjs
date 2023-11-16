import Image from "next/image";
import React, { useState,useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCart } from "@/context/Cart";
import { toast } from "react-toastify";
const API=process.env.NEXT_PUBLIC_APP_API_URL
const CartItem = ({product,totalPrice}) => {
    const {_id,name,price,sprice,images,psize, salePrice}=product;
    const [cart,setCart] =useCart()
    const [qty, setQty] = useState(1)
    
    const handleQty=(e)=>{ 
        let qty=e.target.value;
        setQty(qty);
      }
    useEffect(() => {
        totalPrice(_id,qty);
        updateQty();
        updateSalePrice();
    }, [qty])
    
    const updateSalePrice=()=>{
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const productIndex = existingCart.findIndex((item) =>
            item._id === _id 
        );
        if (productIndex !== -1) {
            let newprice=price-sprice!==price?sprice:price
            existingCart[productIndex].salePrice = newprice*qty;
            setCart(existingCart)
            localStorage.setItem("cart", JSON.stringify(existingCart));            
        }
    } 
 useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = existingCart.findIndex((item) =>
        item._id === _id 
    );
    if (productIndex !== -1) {
        existingCart[productIndex].salePrice = price-sprice !=price ? sprice : price;;
        setCart(existingCart)
        localStorage.setItem("cart", JSON.stringify(existingCart));
    }
   
    
 }, [])
   const updateQty=()=>{
    
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = existingCart.findIndex((item) =>
        item._id === _id 
    );
    if (productIndex !== -1) {
        existingCart[productIndex].qty = qty;
        setCart(existingCart)
        localStorage.setItem("cart", JSON.stringify(existingCart));
      }
   } 
    //REMOVE ITEM FROM CART
  const removeCartItem=(pid)=>{
    toast.success("Item Removed")
    try {
        
       let myCart =[...cart];
       let index=myCart.findIndex((item)=>item._id===pid);
       myCart.splice(index,1);
       localStorage.setItem("cart",JSON.stringify(myCart));
       setCart(myCart);
    } catch (error) {
        console.log(error);
    }
}

    return (
        <div className="flex py-2 gap-3 md:gap-5 border-b">
            {/* IMAGE START */}
            <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
                <img
                    src={`${images[0].url}`}
                    alt={'sub'}
                    width={120}
                    height={120}
                />
            </div>
            {/* IMAGE END */}

            <div className="w-full flex flex-col">
                <div className="flex flex-col md:flex-row justify-between">
                    {/* PRODUCT TITLE */}
                    <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
                        {`${name}`}
                    </div>

                    {/* PRODUCT PRICE */}
                    <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
                        MRP : &#8377;{salePrice}
                    </div>
                </div>

                {/* PRODUCT SUBTITLE */}
                <div className="text-md font-medium text-black/[0.5] hidden md:block">
                    {/* {p.subtitle}  */}
                    Subtitle
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
                        <div className="flex items-center gap-1">
                            <div className="font-semibold">Size:{psize}</div>
                            
                        </div>

                        <div className="flex items-center gap-1">
                           
                            <div className="font-semibold">Quantity:</div>
                            <select
                                className="hover:text-black"
                                onChange={handleQty}
                            >
                                <option value="1" selected>1</option>
                                <option value="2" >2</option>
                                <option value="3" >3</option>
                                <option value="4" >4</option>
                            </select>
                        </div>
                    </div>
                    <RiDeleteBin6Line
                        className="cursor-pointer text-black/[0.5] hover:text-black text-[13px] md:text-[20px]" onClick={e=>{removeCartItem(_id)}}
                    />
                </div>
            </div>
        </div>
    );
};

export default CartItem;
