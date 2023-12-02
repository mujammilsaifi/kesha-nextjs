import React from 'react';
import Link from 'next/link';
import { BsChevronDown } from 'react-icons/bs';

const data = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "About", url: "/about" },
    { id: 3, name: "Categories", subMenu: true },
    { id: 4, name: "Contact", url: "/contact" },
    { id: 5, name: "CustomProduct", url: "/customproduct" }
];


const Menu = ({ showCatMenu, setShowCatMenu,categories}) => {
   
    return (
        <ul className='hidden md:flex items-center lg:text-lg text-sm gap-4 lg:gap-8 font-semibold text-balck [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]'>
            {
                data.map((elm) => {
                    return (
                        <React.Fragment key={elm.id}>
                            {!!elm?.subMenu ? (
                                <li className='cursor-pointer lg:text-lg text-sm flex items-center gap-2 relative'
                                    onMouseEnter={() => setShowCatMenu(true)}
                                    onMouseLeave={() => setShowCatMenu(false)}
                                >
                                    {elm.name}
                                    <BsChevronDown size={14} />
                                    {
                                        showCatMenu && (
                                            <ul className='bg-white absolute top-6 left-0 min-w-[250px] px-1 py-1  shadow-lg rounded-md'>
                                                {categories?.map((subm) => {
                                                    return (
                                                        <Link key={subm.id} href={`/category/${subm.slug}`} onClick={() => setShowCatMenu(false)}>
                                                            <li className='h-12 flex justify-between items-center text-lg px-3 hover:bg-black/[0.03] rounded-md'>
                                                                {subm.name}
                                                                {/* <span className='opacity-50 text-sm'>{`(${subm.doc_count})`}</span> */}
                                                            </li>
                                                        </Link>
                                                    )
                                                })}
                                            </ul>
                                        )
                                    }
                                </li>
                            ) : (
                                <li className='cursor-pointer'>
                                    <Link href={`${elm.url}`}>
                                        {elm.name}
                                    </Link>
                                </li>
                            )}
                        </React.Fragment>
                    )
                })
            }
        </ul>
    )
}

export default Menu;