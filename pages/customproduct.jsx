import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Customproduct = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gemstone, setGemstone] = useState('');
  const [occasion, setOccasion] = useState('');
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmit, setSubmit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/addcustomorder`, {
        name,
        email,
        phone,
        gemstone,
        occasion,
        type,
        message,
      });

      if (data?.success) {
        setSubmit(true);
        window.location.reload();
        toast.success('Form Submitted Successfully!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full mt-[120px] bg-cover bg-center bg-no-repeat">
      <section className="heading flex flex-col items-center justify-center">
        <h1 className="mb-4 text-4xl font-oswald leading-none tracking-tight text-black md:text-5xl lg:text-6xl dark:text-black text-center">
          Create your own unique style of jewellery
        </h1>
        <p className="text-center">Tell us about how you'd like to create your jewellery</p>
        <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-black" />
      </section>
      <section className="flex items-center justify-center">
        <form className="w-[90%] md:w-[40%] flex flex-col items-center justify-center gap-10">
          <input
            required
            type="text"
            name="name"
            placeholder="Enter Your Name"
            className="block p-5 w-full text-sm text-black bg-white rounded-lg border border-black focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-black dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Enter Your Email"
            className="block p-5 w-full text-sm text-black bg-white rounded-lg border border-black focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-black dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="text"
            name="phone"
            placeholder="Enter Your Phone"
            className="block p-5 w-full text-sm text-black bg-white rounded-lg border border-black focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-black dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setPhone(e.target.value)}
          />
          <select
            id="jewellery-type"
            className="bg-white border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-white dark:border-black dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setType(e.target.value)}
          >
            <option selected>Choose jewellery type</option>
            <option value="Necklace">Necklace</option>
            <option value="Pendant">Pendant</option>
            <option value="Earrings">Earrings</option>
            <option value="Bangles">Bangles</option>
            <option value="Rings">Rings</option>
          </select>

          <select
            required
            id="gemstone-type"
            className="bg-white border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-white dark:border-black dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setGemstone(e.target.value)}
          >
            <option selected>Choose Gemstone type</option>
            <option value="Precious colour stone">Precious colour stone</option>
            <option value="Semi-precious stone">Semi-precious stone</option>
            <option value="Diamonds">Diamonds</option>
            <option value="Rose-cut diamonds">Rose-cut diamonds</option>
          </select>

          <select
            id="occasion-type"
            onChange={(e) => setOccasion(e.target.value)}
            className="bg-white border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-white dark:border-black dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose Occasion type</option>
            <option value="Wedding">Wedding</option>
            <option value="Daily wear">Daily wear</option>
            <option value="Party wear">Party wear</option>
            <option value="Festive">Festive</option>
          </select>

          <textarea
            onChange={(e) => setMessage(e.target.value)}
            name="message"
            id="description"
            rows="4"
            className="block p-5 w-full text-sm text-black bg-white rounded-lg border border-black focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-balck dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description here..."
          ></textarea>
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
