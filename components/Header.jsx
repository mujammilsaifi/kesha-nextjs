import Link from "next/link";
import React, { useState, useEffect } from "react";

import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { FaUser, FaSearch } from "react-icons/fa";
import { VscChromeClose } from 'react-icons/vsc';
import { BiMenuAltRight } from 'react-icons/bi';

import Menu from "./Menu";
import MobileMenu from "./MobileMenu";

const Header = () => {

  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);

  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) {
        setShow("-translate-y-[80px]");
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
    };
  }, [lastScrollY]);

  return (
    <header
      className={`w-full h-[50px] md:h-[80px] px-4 bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 drop-shadow-sm ${show}`}
    >
      <div className="h-[50px] flex justify-between items-center">
        <Link href="/">
          <img
            src="/logo.jpeg"
            alt="logo"
            className="w-[130px] md:w-[200px] lg:w-[235px]"
          />
        </Link>
      </div>

      <Menu
        showCatMenu={showCatMenu}
        setShowCatMenu={setShowCatMenu}
      />

      {
        mobileMenu &&
        <MobileMenu
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          setMobileMenu={setMobileMenu}
        />
      }

      <div className=" text-black flex items-center justify-center">
        <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-blacl/[0.05] cursor-pointer relative">
          <FaSearch />
        </div>
        <Link href="/cart">
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-blacl/[0.05] cursor-pointer relative">
            <IoMdHeartEmpty className="text-[15px] md:text-[20px]" />
            <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">5</div>
          </div>
        </Link>

        <Link href="/cart">
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-blacl/[0.05] cursor-pointer relative" >
            <BsCart className="text-[15px] md:text-[20px]" />
            <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">5</div>
          </div>
        </Link>

        <Link href={`/profile`}>
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-blacl/[0.05] cursor-pointer relative">
            <FaUser />
          </div>
        </Link>

        {/* mobileMenu */}
        <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] corsor-pointer relative -mr-2 md:hidden">
          {mobileMenu ? (
            <VscChromeClose className="text-[16px]" onClick={() => setMobileMenu(false)} />
          ) : (
            <BiMenuAltRight className="text-[20px]" onClick={() => setMobileMenu(true)} />
          )}
        </div>

      </div>
    </header >
  );
};

export default Header;
