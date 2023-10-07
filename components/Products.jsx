import React from 'react';
import ProductCard from './ProductCart';

const Products = () => {
    return (
        <section className="overflow-hidden">
            <div className="my-0 md:my-4">
                <img src="/product-banner.jpg" alt="product-banner" />
            </div>
            <section className='flex items-cnter justify-center'>
                <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 px-2 overflow-hidden md:px-8">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </section>
            </section>
        </section>
    )
}

export default Products;