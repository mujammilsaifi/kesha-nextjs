import { useState,useEffect } from 'react';
import ProductCard from './ProductCart';
import axios from 'axios';

const API=process.env.NEXT_PUBLIC_APP_API_URL
const FilterProducts = () => {
    const [categories, setCategories] = useState([]); //for all categories
    const [data, setAllProducs] = useState([]); //for all products
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    //GET ALL CATEGORY FOR ADMIN 
    const getAllCategory=async()=>{
        try {
            const {data}=await axios.get(`/api/getcategory`);
            if(data?.success){
                setCategories(data?.category);
            }
        } catch (error) {
        console.log(error);
        alert(error);
        }
    }
      //GET ALL PRODUCTS FOR ADMIN
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(`${API}/api/getproduct`);
      if (data?.success) {
        setAllProducs(data?.products);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  useEffect(() => {
    getAllCategory();
    getAllProduct();
  }, [])
    // Placeholder data for colors, sizes, categories, and styles
    const colors = ['Red', 'Blue', 'Green'];
    const sizes = ['Small', 'Medium', 'Large'];
    

    const handleFilter = (filterType) => {
        if (filterType === 'All') {
            setFilteredData(data);
        } else {
            const filtered = data?.filter((item) => item.name.includes(filterType));
            setFilteredData(filtered);
        }
    };

    return (
        <>
            <section className='flex flex-col items-center justify-center'>
                <div>
                    <h1 className="mb-4 uppercase font-oswald font-bold leading-none tracking-tight text-gray-900 text-[2rem] md:text-2xl lg:text-4xl dark:text-black">Product Filtering</h1>
                </div>
                <section className='flex justify-center items-center flex-wrap gap-2 my-6'>
                    {
                        categories?.map((elm, i) => {
                            return (
                                <button
                                    key={i}
                                    className="text-black font-oswald md:py-2 md:px-4 border rounded-lg uppercase text-1xl md:text-2xl block p-2 md:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-black hover:text-white transition duration-300"
                                    onClick={() => handleFilter(elm.name)}
                                >
                                    {elm?.name}
                                </button>
                            )
                        })
                    }
                </section>
                <div className="flex items-center justify-center flex-wrap gap-2 md:gap-4 mb-6 w-[90%]">
                    <div className="md:w-48">
                        <label className="block text-sm font-medium text-gray-700">Filter by Color:</label>
                        <select
                            value={selectedColor}
                            onChange={() => handleFilter(selectedColor)}
                            // className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            className="text-black font-oswald md:py-2 md:px-4 border rounded-lg uppercase text-1xl md:text-2xl block p-2 md:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-black hover:text-white transition duration-300"
                        >
                            <option value="">All Colors</option>
                            {colors.map((color, index) => (
                                <option key={index} value={color}>
                                    {color}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="md:w-48">
                        <label className="block text-sm font-medium text-gray-700">Filter by Size:</label>
                        <select
                            value={selectedSize}
                            onChange={() => handleFilter(selectedSize)}
                            // className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            className="text-black font-oswald md:py-2 md:px-4 border rounded-lg uppercase text-1xl md:text-2xl block p-2 md:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-black hover:text-white transition duration-300"
                        >
                            <option value="">All Sizes</option>
                            {sizes.map((size, index) => (
                                <option key={index} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="md:w-48">
                        <label className="block text-sm font-medium text-gray-700">Filter by Category:</label>
                        <select
                            value={selectedCategory}
                            onChange={() => handleFilter(selectedCategory)}
                            // className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            className="text-black font-oswald md:py-2 md:px-4 border rounded-lg uppercase text-1xl md:text-2xl block p-2 md:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-black hover:text-white transition duration-300"
                        >
                            <option value="">All Categories</option>
                            {categories?.map((category, index) => (
                                <option key={index} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </section>
            <section className='flex items-cnter justify-center'>
                <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-2 overflow-hidden md:px-8">
                    {
                        filteredData?.map((elm,i) => <ProductCard key={i} {...elm} />)
                    }
                    
                </section>
            </section>
        </>
    );
};

export default FilterProducts;