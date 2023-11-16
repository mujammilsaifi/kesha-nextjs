import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/wrapper";
import CartItem from "@/components/CartItem";
import { useCart } from "@/context/Cart";
import { useAuth } from "@/context/Auth";
import { useState,useEffect } from "react";
import axios from "axios";
import { useTotalPayment } from "@/context/TotalPayment";
const API=process.env.NEXT_PUBLIC_APP_API_URL
const Cart = () => {
  const [totalPayment, setTotalPayment]=useTotalPayment()
  const [auth]=useAuth()
  const [cart,setCart] =useCart()
  const [subTotal,setSubTotal]=useState(0);
  const [qty,setQty]=useState(1);

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [newTotal, setNewTotal] = useState(0);
  
  
  // Your salt key and salt index
 useEffect(() => {
 setTotalPayment(subTotal)
 localStorage.setItem("totalPayment", JSON.stringify(subTotal));
 }, [subTotal])
  const applyCoupon =async () => {
    const coupontitle=couponCode;
    const {data}=await axios.get(`/api/singlecoupon/${coupontitle}`)
   
    if(data?.success){
     const arr=data?.coupon[0]
     const dis=arr?.discount/100*subTotal;
      setDiscount(dis);
      setNewTotal(subTotal-dis)
      setTotalPayment(subTotal-dis);
      localStorage.setItem("totalPayment", JSON.stringify(subTotal-dis));
      setAppliedCoupon(arr?.title)

      if(appliedCoupon===null){
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      existingCart?.map((item,i)=>{
        item.salePrice=item.salePrice-(arr?.discount/100*item.salePrice)
      })
      setCart(existingCart)
      localStorage.setItem("cart", JSON.stringify(existingCart));
      }
    }
  };


  //CALCULATE TOTAL CART ITEM PRICE
  const totalPrice=(id,qty)=>{
      setQty(qty)
      let total=0;
      {cart?.map((item)=>{
        let price=item?.price-item?.sprice!==item.price?item.sprice:item.price
        if(item?._id===id){
          price=price*qty
        }
        total=total+price;
      })}
      setSubTotal(total);
      setTotalPayment(total);
      localStorage.setItem("totalPayment", JSON.stringify(total));
  }
 


  return (
    <div className="w-full md:py-20 mt-[100px]">
      <Wrapper>
        {cart.length>0?(
          <>
            {/* HEADING AND PARAGRAPH START */}
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
              <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                Shopping Cart
              </div>
            </div>
            {/* HEADING AND PARAGRAPH END */}

            {/* CART CONTENT START */}
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              {/* CART ITEMS START */}
              <div className="flex-[2]">
                <div className="text-lg font-bold">Cart Items</div>
                {cart.map((product,i)=>(
                  <CartItem  product={product} totalPrice={totalPrice}/>
                ))}
                  
              </div>
              {/* CART ITEMS END */}

              {/* SUMMARY START */}
              <div className="flex-[1]">
                <div className="text-lg font-bold">Summary</div>

                <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                  <div className="flex justify-between">
                    <div className="uppercase text-md md:text-lg font-medium text-black">
                      Subtotal
                    </div>
                    <div className="text-md md:text-lg font-medium text-black">
                      &#8377; {subTotal}
                    </div>
                  </div>
                  {appliedCoupon && (
                    <>
                    <div className="flex justify-between">
                    <div className=" text-md md:text-lg font-medium text-black">
                      Coupon Discount
                    </div>
                    <div className="text-md md:text-lg font-medium text-black">
                      -{discount}
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 ">
                    <div className="uppercase text-md md:text-lg font-medium text-black">
                      Total
                    </div>
                    <div className="text-md md:text-lg font-medium text-black">
                      &#8377; {newTotal}
                    </div>
                  </div>
                  </>
                  )}
                  <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="couponCode">
        Coupon Code
        </label>
        <div className="flex">
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="couponCode"
            type="text"
            placeholder="Enter your coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded ml-2"
            onClick={applyCoupon}
          >
            Apply
          </button>
        </div>
      </div>

      {appliedCoupon && (
        <div className="bg-green-200 border-l-4 border-green-500 text-green-700 p-4 mb-4">
          Coupon "{appliedCoupon}" applied successfully!
        </div>
      )}

                  <div className="text-sm md:text-md py-5 border-t mt-5">
                    The subtotal reflects the total price of your order,
                    including duties and taxes, before any applicable discounts.
                    It does not include delivery costs and international
                    transaction fees.
                  </div>
                </div>

                {/* BUTTON START */}
                <Link  href={auth?.token ? '/checkout' : '/signup'}>
                <button
                  className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center" 
                >
                  Checkout
                  {/* {loading && <img src="/spinner.svg" />} */}
                </button>
                </Link>
                {/* BUTTON END */}
              </div>
              {/* SUMMARY END */}
            </div>
            {/* CART CONTENT END */}
          </>
        ):(
          <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
            <Image
              src="/empty-cart.jpg"
              width={300}
              height={300}
              className="w-[300px] md:w-[400px]"
            />
            <span className="text-xl font-bold">Your cart is empty</span>
            <span className="text-center mt-4">
              Looks like you have not added anything in your cart.
              <br />
              Go ahead and explore top categories.
            </span>
            <Link
              href="/"
              className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Cart;
