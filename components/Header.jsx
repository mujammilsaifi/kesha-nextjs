import Link from "next/link";
import React, { useState, useEffect } from "react";
import LoadingBar from 'react-top-loading-bar'
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { FaUser, FaSearch } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import { BiMenuAltRight } from "react-icons/bi";

import Menu from "./Menu";
import MobileMenu from "./MobileMenu";
import { useCart } from "@/context/Cart";
import axios from "axios";
import SearchPage from "./SearchPage ";
import { useTopLoadingBar } from "@/context/TopLoadingBar";
import { useRouter } from "next/router";
const API = process.env.NEXT_PUBLIC_APP_API_URL;

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Header = () => {
  const [loading,setTopLoading]=useTopLoadingBar();
  const router=useRouter()
  const [cart, setCart] = useCart();

  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [categories, setCategories] = useState([]); //for all categories

  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) {
        setShow("-translate-y-[90px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
      setMobileMenu(false)
    };
  }, [lastScrollY]);

  // backdrop-filter backdrop-blur-lg bg-opacity-5
  //GET ALL CATEGORY FOR HOME PAGE
  const getAllCategory = async () => {
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
    getAllCategory();
  }, []);
  
  // FOR TOP LOADING BAR
  useEffect(() => {
    router.events.on("routeChangeStart",()=>{
      setTopLoading(40)
    })
    router.events.on("routeChangeComplete",()=>{
      setTopLoading(100)
    })
    
  }, [])
  return (
    <>
      <LoadingBar
          color='rgb(200 132 162)'
          waitingTime={400}
          progress={loading}
        />
        
        <ToastContainer  
          position="top-right"
          autoClose={100}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          limit={1}          
          draggable
          />
      <header
        // backdrop-filter backdrop-blur-lg bg-opacity-30
        className={`w-full h-[80px] md:h-[130px] px-10 bg-white flex items-center justify-between z-20 fixed  top-0 transition-transform duration-300 drop-shadow-sm ${show}`}
      >
        <div className="h-[80%]">
          <Link href="/">
            <img src="/Kesha-logo.webp" alt="logo" className="h-[100%]" />
          </Link>
        </div>

        <Menu
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          categories={categories}
        />

        {mobileMenu && (
          <MobileMenu
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
            categories={categories}
          />
        )}

        <div className="text-black flex items-center justify-center">
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] hover:bg-blacl/[0.05] cursor-pointer relative">
            <FaSearch onClick={() => setShowSearch(true)} />
          </div>
          <Link href="/cart">
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-blacl/[0.05] cursor-pointer relative">
              <IoMdHeartEmpty className="text-[15px] md:text-[20px]" />
              {/* <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                
              </div> */}
            </div>
          </Link>

          <Link href="/cart">
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-blacl/[0.05] cursor-pointer relative">
              <BsCart className="text-[15px] md:text-[20px]" />
              <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                {cart?.length}
              </div>
            </div>
          </Link>

          <Link href={`/userprofile`}>
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-blacl/[0.05] cursor-pointer relative">
              <FaUser />
            </div>
          </Link>

          {/* mobileMenu */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] corsor-pointer relative -mr-2 md:hidden">
            {mobileMenu ? (
              <VscChromeClose
                className="text-[16px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[20px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
        </div>
      </header>
      {showSearch && <SearchPage setShowSearch={setShowSearch} />}
    </>
  );
};

export default Header;
