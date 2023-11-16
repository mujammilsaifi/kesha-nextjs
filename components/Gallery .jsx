import React from 'react'

const Gallery = () => {

    const gallery = [
        {
            img: '/gallery/g1.jpg',
        },
        {
            img: '/gallery/g2.jpg',
        },
        {
            img: '/gallery/g3.jpg',
        },
        {
            img: '/gallery/g4.jpg',
        },
        {
            img: '/gallery/g5.jpg',
        },
        {
            img: '/gallery/g6.jpg',
        }
    ]

    return (
        <section className='w-[100%] flex flex-col items-center justify-center'>
            <section className='flex items-center justify-center m-10'>
                <h1 className='text-[28px] text-black font-oswald font-bold md:text-[32px]' >Product Gallery</h1>
            </section>
            <section>
                <div className="container mx-auto px-5 py-2 lg:px-32">
                    <div className="-m-1 flex flex-wrap md:-m-2">
                        {
                            gallery.map(({ img }, i) => {
                                return (
                                    <div className="flex w-1/3 flex-wrap" key={i}>
                                        <div className="w-full p-1 md:p-2">
                                            <img
                                                alt="gallery"
                                                className="block h-full w-full rounded-lg object-cover object-center"
                                                src={img} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </section >
    )
}

export default Gallery
