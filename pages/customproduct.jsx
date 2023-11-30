import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Customproduct = () => {
    
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gemstone:'',
    occasion:'',
    type:'',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmit, setSubmit]=useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Check if fields are not empty and meet the required length
    for (const field in formData) {
      if (formData[field].trim() === '' || formData[field].length < 5) {
        newErrors[field] = `${field} is required`;
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      if (validateForm()) {
      const { data } = await axios.post(`/api/addcustomorder`, {formData});

      if (data?.success) {
        setSubmit(true);
        window.location.reload();
        toast.success('Form Submitted Successfully!');
      }
    }
    } catch (error) {
      console.log(error);
    } 
  };

  return (
    <section className="w-full mt-[130px] bg-cover bg-center bg-no-repeat">
      <section className="heading flex flex-col items-center justify-center">
        <h1 className="mb-4 text-4xl font-oswald leading-none tracking-tight text-black md:text-5xl lg:text-6xl dark:text-black text-center">
          Create your own unique style of jewellery
        </h1>
        <p className="text-center">Tell us about how you'd like to create your jewellery</p>
        <hr className="w-48 h-1 mx-auto my-1 bg-gray-500 border-0 rounded md:my-4 dark:bg-black" />
      </section>
      <section className="flex items-center justify-center">
        <form className=" flex flex-col items-center justify-center gap-5">
        <div className="w-[300px] md:w-[570px]">
        <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            className="block p-3 w-full text-sm text-black bg-white rounded-lg border border-black focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-black dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className='text-red-500'>{errors.name}</p>}
          </div>
          <div className=" w-full md:w-[570px]">
          <label>Email:</label>
          <input            
            type="email"
            name="email"
            placeholder="Enter Your Email"
            className="block p-3 w-full text-sm text-black bg-white rounded-lg border border-black focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-black dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className='text-red-500'>{errors.email}</p>}
          </div>
          <div className=" w-full md:w-[570px]">
          <label>Phone:</label>
          <input            
            type="text"
            name="phone"
            placeholder="Enter Your Phone"
            className="block p-3 w-full text-sm text-black bg-white rounded-lg border border-black focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-black dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className='text-red-500'>{errors.phone}</p>}
          </div>
          <div className=" w-full md:w-[570px]">
          <label>Choose jewellery type:</label>
          <select
            id="jewellery-type"
            className="bg-white border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-white dark:border-black dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChange}
            name='type'
          >            
            <option selected>Choose jewellery type:</option>
            <option value="Necklace">Necklace</option>
            <option value="Pendant">Pendant</option>
            <option value="Earrings">Earrings</option>
            <option value="Bangles">Bangles</option>
            <option value="Rings">Rings</option>
          </select>
          {errors.type && <p className='text-red-500'>{errors.type}</p>}
          </div>
          <div className=" w-full md:w-[570px]">
          <label>Choose Gemstone type:</label>
          <select            
            id="gemstone-type"
            className="bg-white border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-white dark:border-black dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChange}
            name='gemstone'
          >
            <option selected>Choose Gemstone type:</option>
            <option value="Precious colour stone">Precious colour stone</option>
            <option value="Semi-precious stone">Semi-precious stone</option>
            <option value="Diamonds">Diamonds</option>
            <option value="Rose-cut diamonds">Rose-cut diamonds</option>
          </select>
          {errors.gemstone && <p className='text-red-500'>{errors.gemstone}</p>}
          </div>
          <div className=" w-full md:w-[570px]">
          <label >Choose Occasion type:</label>
          <select
            id="occasion-type"
            onChange={handleChange}
            name='occasion'
            className="bg-white border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-white dark:border-black dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose Occasion type</option>
            <option value="Wedding">Wedding</option>
            <option value="Daily wear">Daily wear</option>
            <option value="Party wear">Party wear</option>
            <option value="Festive">Festive</option>
          </select>
          {errors.occasion && <p className='text-red-500'>{errors.occasion}</p>}
          </div>
          <div className=" w-full md:w-[570px]">
          <label >Message:</label>
          <textarea
            onChange={handleChange}
            name="message"
            id="description"
            rows="4"
            className="block p-3 w-full text-sm text-black bg-white rounded-lg border border-black focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-balck dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description here..."
          ></textarea>
          {errors.message && <p className='text-red-500'>{errors.message}</p>}
          </div>
          <p className={isSubmit ? 'text-center text-green-500' : 'hidden'}>
            Form Data Submit Successfully!
          </p>
          <button
            onClick={handleSubmit}
            className="bg-black text-white font-oswald hover:text-balck py-2 px-4 border border-black hover:border-transparent rounded mb-4"
          >
            Submit
          </button>
        </form>
      </section>
    </section>
  );
};

export default Customproduct;
