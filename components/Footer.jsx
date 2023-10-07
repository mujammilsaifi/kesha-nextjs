import React from "react";
import Wrapper from "./wrapper";

import Link from "next/link";
import { SlSocialInstagram, SlSocialYoutube, SlSocialFacebook, SlSocialTwitter } from 'react-icons/sl'

const data = [
    {
        id: 1,
        link: "Home",
        url: "/",
    },
    {
        id: 1,
        link: "About",
        url: "/about",
    },
    {
        id: 1,
        link: "Privacy Policy",
        url: "/privacy",
    },
    {
        id: 1,
        link: " Terms Of Service",
        url: "/t&s",
    },
    {
        id: 1,
        link: "Contact Us",
        url: "/contact",
    },
]

const socialIcons = [
    {
        id: 1,
        icons: <SlSocialInstagram />,
        url: "https://www.instagram.com/"
    },
    {
        id: 2,
        icons: <SlSocialYoutube />,
        url: "https://www.instagram.com/"
    },
    {
        id: 3,
        icons: <SlSocialFacebook />,
        url: "https://www.instagram.com/"
    },
    {
        id: 4,
        icons: <SlSocialTwitter />,
        url: "https://www.instagram.com/"
    }
]

const Footer = () => {
    return (
        <footer className={`h-[100%] mt-[40px]`}>
            <Wrapper>
                <hr className="mb-[22px]" />
                <section className={`flex flex-col items-center justify-between md:flex-col lg:flex-row`}>
                    <section className="Quick-links">
                        <ul className="flex gap-5 md:gap-10">
                            {
                                data?.map((elm) => {
                                    return (
                                        <li key={elm.id} className="text-[14px] md:text-[18px] hover:text-black/[0.5]">
                                            <Link href={`${elm.url}`} >
                                                {elm.link}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </section>
                    <section>
                        <div className="social-icons flex items-center gap-6 my-[30px]">
                            {
                                socialIcons?.map((elm) => (
                                    <Link href={`${elm.url}`} className="h-[32px] md:h-[32px] min-w-[32px] md:min-w-[32px] rounded-full bg-black top-1 left-5 md:left-7 text-white text-[16px] md:text-[16px] flex justify-center items-center px-[2px] md:px-[5px] hover:bg-red-400 hover:text-black">
                                        {elm.icons}
                                    </Link>
                                ), [])
                            }
                        </div>
                    </section>
                </section>
                <div className="payment-img flex  flex-col justify-center items-center px-10 py-10 gap-4 pt-0">
                    <img src="/payment.webp" alt="" className="w-[520px]" />
                    <span className="text-black text-center">© 2023 kesha.com. All rights reserved.</span>
                </div>

            </Wrapper>
        </footer>
    )
};

export default Footer;
