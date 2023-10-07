import React from 'react';
import Link from 'next/link';
import { BsChevronDown } from 'react-icons/bs';

const data = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "About", url: "/about" },
    { id: 3, name: "Categories", subMenu: true },
    { id: 4, name: "Contact", url: "/contact" },
];

const subMenuData = [
    { id: 1, name: "Rings", doc_count: 11 },
    { id: 2, name: "Necklaces", doc_count: 8 },
    { id: 3, name: "Earings", doc_count: 64 },
    { id: 4, name: "Best collection", doc_count: 107 },
];

const Menu = ({ showCatMenu, setShowCatMenu }) => {
    return (
        <ul className='hidden md:flex items-center gap-8 font-semibold text-black'>
            {
                data.map((elm) => {
                    return (
                        <React.Fragment key={elm.id}>
                            {!!elm?.subMenu ? (
                                <li className='cursor-pointer flex items-center gap-2 relative'
                                    onMouseEnter={() => setShowCatMenu(true)}
                                    onMouseLeave={() => setShowCatMenu(false)}
                                >
                                    {elm.name}
                                    <BsChevronDown size={14} />
                                    {
                                        showCatMenu && (
                                            <ul className='bg-white absolute top-6 left-0 min-w-[250px] px-1 py-1 text-black shadow-lg rounded-md'>
                                                {subMenuData?.map((subm) => {
                                                    return (
                                                        <Link key={subm.id} href={`/category/${subm.name}`} onClick={() => setShowCatMenu(false)}>
                                                            <li className='h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md'>
                                                                {subm.name}
                                                                <span className='opacity-50 text-sm'>{`(${subm.doc_count})`}</span>
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