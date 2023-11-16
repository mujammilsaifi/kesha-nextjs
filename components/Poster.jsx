import React from 'react'

const Poster = ({poster}) => {
    return (
        <section className=''>
            <div className="my-2 md:my-4">
                {poster}
                <img src={poster} alt="product-banner" />
            </div>
        </section>
    )
}

export default Poster;