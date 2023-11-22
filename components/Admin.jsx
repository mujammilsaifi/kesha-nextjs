import { useAuth } from '@/context/Auth';
import { useTopLoadingBar } from '@/context/TopLoadingBar';
import axios from 'axios';
import React,{ useState, useEffect,useRef} from 'react'
import { toast } from 'react-toastify';
import StaticalPage from './StaticalPage';
const API=process.env.NEXT_PUBLIC_APP_API_URL

const email="mujammilkhan00738@gmail.com"
const password="Muj@1234"

const Admin = () => {
    const[loading,setTopLoading] =useTopLoadingBar();
    const [auth,setAuth]=useAuth();
    const token=auth?.token;
    const [section, setSection] = useState(0);
    const [orders, setOrders] = useState([])
    const [orderstatus]=useState(["Processing","Shipped","Delivered","Cancel"]);
    const [slides, setSlide]= useState([]); //for all slides
    const [categories, setCategories] = useState([]); //for all categories
    const [products, setAllProducs] = useState([]); //for all products
    const [cid, setCatID] = useState(''); //for Update Category
    const [pid, setProductID] = useState(''); //for Update Product
    const [orderDetail, setOrderDetails] = useState(null); //for order details
    const [couponcode, setCouponCode] = useState(''); 
    const [coupondiscount, setCouponDiscount] = useState('');
    const [coupondate, setCouponDate] = useState('');
    const [coupons, setCoupons] = useState([]);
    const [toggle, setToggle] = useState(true)
    const componentRef = useRef(null);

  const requestData = {
      order_id: orderDetail?._id,
      order_date:orderDetail?.createdAt,
      pickup_location: 'warehouse',
      channel_id: '4404791',
      comment: orderDetail?.description,
      billing_customer_name: orderDetail?.firstname,
      billing_last_name: orderDetail?.lastname,
      billing_address: orderDetail?.address,
      billing_address_2: '',
      billing_city: orderDetail?.city,
      billing_pincode: orderDetail?.pincode,
      billing_state: orderDetail?.state,
      billing_country: orderDetail?.country,
      billing_email: orderDetail?.email,
      billing_phone: orderDetail?.phone,
      shipping_is_billing: true,
      shipping_customer_name: '',
      shipping_last_name: '',
      shipping_address: '',
      shipping_address_2: '',
      shipping_city: '',
      shipping_pincode: '',
      shipping_country: '',
      shipping_state: '',
      shipping_email: 'test@gmail.com',
      shipping_phone: '1234567890',
      order_items: orderDetail?.products?.map((product) => ({
        name: product?.name,
        sku: product?.salePrice,
        units: product?.qty,
        selling_price: product?.salePrice,
        discount: '',
        tax: '',
        hsn: 441122,
      })), 
      payment_method: orderDetail?.payment?.data?.paymentInstrument?.type,
      shipping_charges: 0,
      giftwrap_charges: 0,
      transaction_charges: 0,
      total_discount: 0,
      sub_total: orderDetail?.payment?.data?.amount,
      length: 10,
      breadth: 15,
      height: 20,
      weight: 2.5,
    };
   
 
   
    // HERE CREATE PRODUCT DATA SET
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        sprice: 0,
        length:0,
        width:0,
        weight:'',
        gemstone: '',
        tag: '',
        material: '',
        setting: '',
        color: '',
        category: '',
        images: [],
      });

    // HERE CREATE CATEGORY DATA SET
    const [catData, setCatData] = useState({
        name: '',
        image: [],
    });
      
    const handleCatInputChange = (e) => {
        const { name, value } = e.target;
        setCatData({
          ...catData,
          [name]: value,
        });
    };
    const handleCatImageChange = (e) => {
        const image = Array.from(e.target.files);
        setCatData({
          ...catData,
          image,
        });
      };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };
    const handleImageChange = (e) => {
        const images = Array.from(e.target.files);
        setFormData({
          ...formData,
          images,
        });
      };
      
    
    //HANDLE CREATE PRODUCT
    const handleCreateProduct = async () => {
      setTopLoading(40);
        try {
          const formDataToSend = new FormData();
          for (const key in formData) {
            if (key === 'images') {
              formData.images.forEach((image) => {
                formDataToSend.append('images', image);
              });
            } else {
              formDataToSend.append(key, formData[key]);
            }
          }
    
          const {data}=await axios.post(`/api/addproduct`,formDataToSend);
          
          if (data?.success) {
            setTopLoading(100)
            toast.success("Product Created Successfully")
          } else {
            // Handle errors
            const data = await response.json();
            toast.error(data?.message)
            setTopLoading(100)
          }
        } catch (error) {
          console.error('Error creating product:', error);
        }
    }
    //HERE CALL FUNCTION TO CREATE PRODUCT
    const CreateProduct=()=>{
      getAllCategory();
      setSection(1);
  }
    //HANDLE UPDATE PRODUCT
    const handleUpdateProduct = async () => {
      const productid=pid
      setTopLoading(40)
        try {
          const formDataToSend = new FormData();
          for (const key in formData) {
            if (key === 'images') {
              formData.images.forEach((image) => {
                formDataToSend.append('images', image);
              });
            } else {
              formDataToSend.append(key, formData[key]);
            }
          }
    
          const {data}=await axios.put(`/api/updateproduct/${productid}`,formDataToSend);
          
          if (data?.success) {
            setTopLoading(100)
            toast.success(data?.message);
          } else {
            setTopLoading(100)
            toast.error("Error")          
          }
        } catch (error) {
          console.error('Error update product:', error);
        }
    }
    //HERE CALL FUNCTION FOR UPDATE PRODUCT
    const updateProduct=(id)=>{
      setSection(6);
      setProductID(id);
      getAllCategory();
    }
    const DeleteProduct= async(productid)=>{
      alert("Do you want to Delete Product!")
      setTopLoading(40)
      try {
          const {data}=await axios.delete(`/api/deleteproduct/${productid}`);
          if(data?.success){
            setTopLoading(100)
            toast.success(data?.message)
          }
      } catch (error) {
          toast.error(error);
      }
  }

  //GET ALL PRODUCTS FOR ADMIN
const getAllProduct = async () => {
  setTopLoading(40)
  try {
    const { data } = await axios.get(`/api/getproducts`);
    if (data?.success) {
      setAllProducs(data?.products);
      setTopLoading(100)
    }
  } catch (error) {
    console.log(error);
    setTopLoading(100)
    toast.error(error)
  }
};
//HERE CALL FUNCTION TO GET ALL PRODUCTS
  const handleShowAllProduct=()=>{
      setSection(2);
      getAllProduct();
  }
    //HANDLE CREATE CATEGORY
    const handleCreateCategory = async () => {
      setTopLoading(40)
        try {
            const formDataToSend = new FormData();
            for (const key in catData) {
              if (key === 'image') {
                catData.image.forEach((image) => {
                  formDataToSend.append('image', image);
                });
              } else {
                formDataToSend.append(key, catData[key]);
              }
            }
            const {data} = await axios.post('/api/addcategory', formDataToSend);

            if (data?.success) {
              setTopLoading(100)
              toast.success('Category created with ID:');
              
            } else {
              setTopLoading(100)
              toast.error(data?.message)
            }
        } catch (error) {
          console.log('Error creating product:', error);
        }
    }
    //HANDLE UPDATE CATEGORY
    const handleUpdateCategory = async () => {
      const categoryid=cid;
      setTopLoading(40)
        try {
            const formDataToSend = new FormData();
            for (const key in catData) {
              if (key === 'image') {
                catData.image.forEach((image) => {
                  formDataToSend.append('image', image);
                });
              } else {
                formDataToSend.append(key, catData[key]);
              }
            }
          const {data}=await axios.put(`/api/updatecategory/${categoryid}`);
          
          if (data?.success) {
            toast.success('Category updated successfully');
            setTopLoading(100)
             
          } else {
            setTopLoading(100)
            const data = await response.json();
            toast.error('Error updating category:', data.error);
          }
        } catch (error) {
          console.log('Error updating category:', error);
        }
    }
    const updateCat=(id)=>{
        setSection(5);
        setCatID(id);
    }
    
     //GET ALL CATEGORY FOR ADMIN 
    const getAllCategory=async()=>{
      setTopLoading(40)
        try {
            const {data}=await axios.get(`/api/getcategory`);
            if(data?.success){
              setTopLoading(100)
              setCategories(data?.category);
            }
        } catch (error) {
          setTopLoading(100)
          toast.error(error);
        }
    }
    
    const showCategory=()=>{
        setSection(4);
        getAllCategory();
       
    }
    const Deletecategory= async(categoryid)=>{
        alert("Do you want to Delete Category!")
        setTopLoading(40)
        try {
            const {data}=await axios.delete(`/api/deletecategory/${categoryid}`);
            if(data?.success){
              setTopLoading(100)
              toast.success("Category Deleted!")
            }
        } catch (error) {
            setTopLoading(100)
            toast.error(error);
            
        }
    }
    


    // HANDLE CREATE SLIDE
const handleCreateSlide = async () => {
  setTopLoading(40)
  const formDataToSend = new FormData();
            for (const key in catData) {
              if (key === 'image') {
                catData.image.forEach((image) => {
                  formDataToSend.append('image', image);
                });
              } else {
                formDataToSend.append(key, catData[key]);
              }
          }

  try {
    const {data} = await axios.post('/api/addslider', formDataToSend);
    if (data?.success) {
      toast.success(data?.message);
      setTopLoading(100)
    } else {
      setTopLoading(100)
      toast.error('Error creating slide');      
    }
  } catch (error) {
    console.error('Error:', error);
    
  }
};

  //GET ALL SLIDE FOR ADMIN
    const getAllSlide=async()=>{
      setTopLoading(40)
        try {
            const {data}=await axios.get(`/api/getslider`);
            if(data?.success){
                setSlide(data.sliders);
                setTopLoading(100)
            }
        } catch (error) {
          setTopLoading(100)
          toast.error(error)
        }
    }
    const showSlide=()=>{
      setSection(8);
      getAllSlide();
    }
    //UPDATE SLIDE HANDLE
    const updateSlide=(id)=>{
      setSection(13);
      setProductID(id); 
    }

    //HANDLE UPDATE SLIDE
    const handleupdateSlide= async()=>{
      const slideid=pid
      setTopLoading(40)
      const formDataToSend = new FormData();
            for (const key in catData) {
              if (key === 'image') {
                catData.image.forEach((image) => {
                  formDataToSend.append('image', image);
                });
              } else {
                formDataToSend.append(key, catData[key]);
              }
            }
      try {
          const {data}=await axios.put(`/api/updateslide/${slideid}`,formDataToSend);
          if(data?.success){
            setTopLoading(100)
            toast.success(data?.message)
          }
      } catch (error) {
          setTopLoading(100)
          toast.error(error);
      }
  }
  //HANDLE DELETE SLIDE
  const deleteSlide= async(slideid)=>{
       
        setTopLoading(40)
        try {
            const {data}=await axios.delete(`/api/deleteslide/${slideid}`);
            if(data?.success){
               toast.success(data?.message)
               setTopLoading(100)
            }
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }

  //HANDLE GET ALL ORDERS    
  const getOrders=async()=>{
      setTopLoading(40)
      try {
        const {data}=await axios.get(`/api/order/getallorder`);
        if(data?.success)
        setTopLoading(100)
        setOrders(data?.orders);
        
      } catch (error) {
        console.log(error);
      }
    }
    const showAllOrders=async()=>{
      setSection(9)
      getOrders()
    }

    //HANDLE UPDATE ORDER STATUS HERE
    const updateStatus=async(orderid,value)=>{
      setTopLoading(40)
      try {
        await axios.put(`/api/order/orderstatus/${orderid}`,{value});
        getOrders();
        setTopLoading(100)               
      } catch (error) {
        setTopLoading(100)
        console.log(error);
      }
    }
  const getOrderDetails=async(orderid)=>{
      setSection(10)
      setTopLoading(40)
      try {
        const {data}=await axios.get(`/api/order/getsingle/${orderid}`);
        if(data?.success){
          setTopLoading(100)
          setOrderDetails(data?.order[0])
                                 
        }
             
      } catch (error) {
        console.log(error);
      }
    }


  // HERE TAKE TOKEN FROM SHIPROCKET
  const orderShip=async()=>{
    setTopLoading(40)
      try {
        const {data}=await axios.post(`https://apiv2.shiprocket.in/v1/external/auth/login`,{email,password})
        if(data?.token){
          setTopLoading(100)
          createOrderShipping(data?.token);
        }
        
      } catch (error) {
        toast.error(error)
        setTopLoading(100)
      }
    }

    //AFTER TAKE TOKEN PUSH TO ORDER SHIPROCKET
    const createOrderShipping=async(token)=>{
      setTopLoading(40)
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      try {
        const {data}=await axios.post(`https://apiv2.shiprocket.in/v1/external/orders/create/adhoc`,requestData, { headers })
        if(data?.order_id){
          setTopLoading(100)
          setOrderId(data)
        }       
        
      } catch (error) {
        toast.error(error)
      }
    }
  //HANDLE CREATE COUPON
  const createCoupon = async () => {
      setTopLoading(40)
      try {
        const {data}=await axios.post(`/api/addcoupon`,{couponcode,coupondiscount,coupondate});
        
        if (data?.success) {
          setTopLoading(100)
          setCouponCode("")
          setCouponDiscount("")
          setCouponDate("")
        } else {
          toast.error('Error creating product:', data?.message);
        }
      } catch (error) {
        console.log('Error creating product:', error);
      }
    }
    const deleteCoupon= async(couponid)=>{
      setTopLoading(40)
      try {
          const {data}=await axios.delete(`/api/coupondelete/${couponid}`);
          if(data?.success){
            setTopLoading(100)
            toast.success("Coupon Deleted!")   
          }
      } catch (error) {
        setTopLoading(100)
        toast.error(error);
      }
    }
  //GET ALL COUPON FOR ADMIN
  const getAllCoupon=async()=>{
        setSection(12)
        setTopLoading(40)
    try {
        const {data}=await axios.get(`/api/getcoupons`);
        if(data?.success){
          setTopLoading(100)
          setCoupons(data.coupons);  
        }else{
          setTopLoading(100)
        }
    } catch (error) {
    console.log(error);
    toast.error(error);
    }
  }

// -------------------mobile responsive------------------------
  const handleClickOutside = (event) => {
      setToggle(true);
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    useEffect(() => {
      const handleScroll = () => {
        // Check if the page has been scrolled, e.g., if the vertical scroll position is greater than 0
        const scrolled = window.scrollY > 0;
  
        // Update the state based on the scroll position
        setToggle(true);
      };
  
      // Attach the event listener when the component mounts
      window.addEventListener('scroll', handleScroll);
  
      // Detach the event listener when the component unmounts
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []); 
  return (
    <>
    
    <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="ml-3 inline-flex items-center p-2 mt-[100px] ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={e=>setToggle(false)}>

      <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
      </svg>
    </button>
    <aside id="default-sidebar"  className={toggle?"fixed h-[100%] z-40 top-[100px] left-0  w-63 transition-transform -translate-x-full sm:translate-x-0":"fixed z-40 top-[100px]  left-0  w-63 transition-transform  sm:translate-x-0"} aria-label="Sidebar">
   <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800 text-white">
   <nav className="w-1/5 bg-gray-800 text-white pl-3 ">
      <ul>
        <li className="mb-4"> <h1 className="text-3xl font-bold mb-4 mt-4">Dashboard </h1></li>
        <li className="mb-4">
            <button className="bg-blue-500 w-[200px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={CreateProduct}>Create Product </button>
        </li>
        
        <li className="mb-4">
            <button className="bg-blue-500 w-[200px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={e=>setSection(3)}>Create Category </button>
        </li>
        <li className="mb-4">
            <button className="bg-blue-500 w-[200px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={e=>setSection(7)}>Create Slide </button>
        </li>
        <li className="mb-4">
            <button className="bg-blue-500 w-[200px]  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={showCategory}>Show Category </button>
        </li>
        
        <li className="mb-4">
            <button className="bg-blue-500 w-[200px]  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleShowAllProduct}>Show Product </button>
        </li>
        <li className="mb-4">
            <button className="bg-blue-500 w-[200px]  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={showSlide}>Show Slides </button>
        </li>
        <li className="mb-4">
            <button onClick={showAllOrders} className="bg-blue-500 w-[200px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Show All Orders </button>
        </li>
        <li className="mb-4">
            <button onClick={e=>setSection(11)} className="bg-blue-500 w-[200px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Create Coupon </button>
        </li>
        <li className="mb-4">
            <button onClick={getAllCoupon} className="bg-blue-500 w-[200px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Show All Coupon </button>
        </li>
        
       
      </ul>
    </nav>
   </div>
</aside>
<div ref={componentRef} className="p-2 sm:ml-64">
   <div className=" border-2 border-gray-200  rounded-lg dark:border-gray-700 md:mt-[120px]">
    {/* Admin welcome Area */}
    <main className={section === 0 ? " h-[100%] flex-1 bg-gray-200 p-4" : "hidden"}>
    <div className="w-[100%] mx-auto text-center">
        <StaticalPage/>
    </div>
    </main>
    {/* Create Product Area */}
    <main className={section===1?"flex-1 bg-gray-200 p-4":"hidden"}>
        <div className="md:w-2/3  mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Create Product</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" enctype="multipart/form-data" method="post">
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Product Name
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                name="name"
                type="text"
                placeholder="Enter Product Name"
                value={formData.name}
                onChange={handleInputChange}
            />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                    Category
                </label>
                <select
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    id="category"
                    name="category"
                    onChange={handleInputChange}
                >
                    <option value="">Select a Category</option>
                    {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                        {category.name}
                    </option>
                    ))}
                </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Product Description
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        name="description"
                        placeholder="Enter Product Description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                    Regular Price
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Enter Product Price"
                    value={formData.price}
                    onChange={handleInputChange}
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                    Sale Price
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="sprice"
                    name="sprice"
                    type="number"
                    placeholder="Enter Product Sale Price"
                    value={formData.sprice}
                    onChange={handleInputChange}
                />
                </div>
                <div className="mb-4 ">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="length">
                        Enter Product Lenght
                </label>
                <input
                    className="shadow appearance-none border rounded w-[40] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="length"
                    name="length"
                    type="number"
                    placeholder="Enter Product Length"
                    value={formData.length}
                    onChange={handleInputChange}
                />
               
                </div>
                <div className="mb-4 ">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="width">
                        Enter Product Width
                </label>
                <input
                    className="shadow appearance-none border rounded w-[40] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id='width'
                    name="width"
                    type="number"
                    placeholder="Enter Product Width"
                    value={formData.width}
                    onChange={handleInputChange}
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
                    Enter Product Weight
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="weight"
                    name="weight"
                    type="text"
                    placeholder="Enter Product Weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                />
                
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="material">
                   Product Material
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="material"
                    name="material"
                    type="text"
                    placeholder="Enter Product Material"
                    value={formData.material}
                    onChange={handleInputChange}
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tag">
                   Enter Product Tag
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="tag"
                    name="tag"
                    type="text"
                    placeholder="Enter Product Tag"
                    value={formData.tag}
                    onChange={handleInputChange}
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="setting">
                   Setting
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="setting"
                    name="setting"
                    type="text"
                    placeholder="Enter Product Setting"
                    value={formData.setting}
                    onChange={handleInputChange}
                />
                </div>

                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gemstone">
                    Gemstone
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="gemstone"
                    name="gemstone"
                    type="text"
                    placeholder="Enter Gemstone"
                    value={formData.gemstone}
                    onChange={handleInputChange}
                />
                </div>

                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
                    Color
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="color"
                    name="color"
                    type="text"
                    placeholder="Enter Color"
                    value={formData.color}
                    onChange={handleInputChange}
                />
                </div>

                

            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
                Product Images
            </label>
            <input
                className="block text-gray-700 text-sm font-bold"
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
            />
            </div>
            <div className="flex items-center justify-between">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleCreateProduct}
            >
                Create Product
            </button>
            
            </div>
        </form>
        </div>
    </main>
     {/* update Product Area */}
     <main className={section===6?"flex-1 bg-gray-200 p-4":"hidden"}>
        <div className="md:w-2/3  mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Update Product</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" enctype="multipart/form-data" method="post">
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Product Name
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                name="name"
                type="text"
                placeholder="Enter Product Name"
                value={formData.name}
                onChange={handleInputChange}
            />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                    Category
                </label>
                <select
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    id="category"
                    name="category"
                    onChange={handleInputChange}
                >
                    <option value="">Select a Category</option>
                    {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                        {category.name}
                    </option>
                    ))}
                </select>
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Product Description
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    name="description"
                    placeholder="Enter Product Description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
                </div>

                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                    Regular Price
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Enter Product Price"
                    value={formData.price}
                    onChange={handleInputChange}
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                    Sale Price
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="sprice"
                    name="sprice"
                    type="number"
                    placeholder="Enter Product Sale Price"
                    value={formData.sprice}
                    onChange={handleInputChange}
                />
                </div>
                <div className="mb-4 ">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="length">
                        Enter Product Lenght
                </label>
                <input
                    className="shadow appearance-none border rounded w-[40] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="length"
                    name="length"
                    type="number"
                    placeholder="Enter Product Length"
                    value={formData.length}
                    onChange={handleInputChange}
                />
               
                </div>
                <div className="mb-4 ">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="width">
                        Enter Product Width
                </label>
                <input
                    className="shadow appearance-none border rounded w-[40] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id='width'
                    name="width"
                    type="number"
                    placeholder="Enter Product Width"
                    value={formData.width}
                    onChange={handleInputChange}
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
                    Enter Product Weight
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="weight"
                    name="weight"
                    type="text"
                    placeholder="Enter Product Weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                />
                
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="material">
                   Product Material
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="material"
                    name="material"
                    type="text"
                    placeholder="Enter Product Material"
                    value={formData.material}
                    onChange={handleInputChange}
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tag">
                   Enter Product Tag
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="tag"
                    name="tag"
                    type="text"
                    placeholder="Enter Product Tag"
                    value={formData.tag}
                    onChange={handleInputChange}
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="setting">
                   Setting
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="setting"
                    name="setting"
                    type="text"
                    placeholder="Enter Product Setting"
                    value={formData.setting}
                    onChange={handleInputChange}
                />
                </div>

                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gemstone">
                    Gemstone
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="gemstone"
                    name="gemstone"
                    type="text"
                    placeholder="Enter Gemstone"
                    value={formData.gemstone}
                    onChange={handleInputChange}
                />
                </div>

                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
                    Color
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="color"
                    name="color"
                    type="text"
                    placeholder="Enter Color"
                    value={formData.color}
                    onChange={handleInputChange}
                />
                </div>

                

            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
                Product Images
            </label>
            <input
                className="block text-gray-700 text-sm font-bold"
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
            />
            </div>
            <div className="flex items-center justify-between">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleUpdateProduct}
            >
                update
            </button>
            </div>
        </form>
        </div>
    </main>

    {/* Show All Product Area */}
    <main className={section===2?"w-[100vw] flex-1 bg-gray-200 p-4":"hidden"}>
    <div className="relative overflow-x-auto">
    <table className="w-[100%] divide-y divide-gray-200 overflow-x-scroll">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sale Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Gemstone
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Color
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Images
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Edit
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Delete
            </th>
            {/* Add more table headers for additional details */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products?.map((product) => (
            <tr key={product._id}>
              <td className="w-[200px] px-6 py-4 border border-gray-300 whitespace-wrap">
                <div className=" text-sm font-medium text-gray-900">{product.name}</div>
              </td>
              <td className="w-[200px] px-6 py-4 border border-gray-300 whitespace-wrap">
                <div className=" text-sm text-gray-900">{product?.description?.substring(0, 50)}</div>
              </td>
              <td className="px-6 py-4 border border-gray-300 whitespace-wrap">
                <div className="text-sm text-gray-900"> &#8377; {product.price}</div>
              </td>
              <td className="px-6 py-4 border border-gray-300 whitespace-wrap">
                <div className="text-sm text-gray-900"> &#8377; {product.sprice}</div>
              </td>
              <td className="px-6 py-4 border border-gray-300 whitespace-wrap">
                <div className="text-sm text-gray-900">{product.gemstone}</div>
              </td>
              <td className="px-6 py-4 border border-gray-300 whitespace-wrap">
                <div className="text-sm text-gray-900">{product.color}</div>
              </td>
              <td className="px-6 py-4 border border-gray-300 whitespace-wrap">
                <div className="text-sm text-gray-900">{product?.category}</div>
              </td>
               
              <td className=" px-2 py-2 border border-gray-300 whitespace-wrap">
                <div className="w-[100px] text-sm text-gray-900">
                {product?.images?.map((photo, index) => (
                    <img key={index}
                    src={`${photo.url}`}
                    alt={`Product  ${index}`}
                    className='w-[100%]'
                  />
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 border border-gray-300 whitespace-wrap">
                <div className="text-sm text-gray-900"><button className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={e=>updateProduct(product?._id)}>Edit</button></div>
              </td>
              <td className="px-6 py-4 border border-gray-300 whitespace-wrap">
                <div className="text-sm text-gray-900"><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={e=>DeleteProduct(product?._id)}>Delete </button></div>
              </td>
              {/* Add more table cells for additional details */}
            </tr>
          ))}
        </tbody>
      </table> 
      </div>
    </main>


     {/* Create update category Area */}
     <main className={section===3?"flex-1 bg-gray-200 p-4":"hidden"}>
        <div className="md:w-2/3  mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Update Category</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" enctype="multipart/form-data" method="post">
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="catName">
                Category Name
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="catName"
                name="name"
                type="text"
                placeholder="Enter Category Name"
                value={catData.name}
                onChange={handleCatInputChange}
            />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
                Category Image
            </label>
            <input
                className="block text-gray-700 text-sm font-bold"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleCatImageChange}
            />
            </div>
            <div className="flex items-center justify-between">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleCreateCategory}
            >
                Create 
            </button>
            </div>
        </form>
        </div>
    </main>
    {/* Create category Area */}
    <main className={section===5?"flex-1 bg-gray-200 p-4":"hidden"}>
        <div className="md:w-2/3  mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Create Category</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" enctype="multipart/form-data" method="post">
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="catName">
                Category Name
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="catName"
                name="name"
                type="text"
                placeholder="Enter Category Name"
                value={catData.name}
                onChange={handleCatInputChange}
            />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
                Category Image
            </label>
            <input
                className="block text-gray-700 text-sm font-bold"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleCatImageChange}
            />
            </div>
            <div className="flex items-center justify-between">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleUpdateCategory}
            >
                update
            </button>
            </div>
        </form>
        </div>
    </main>

      {/* Show All Category Area */}
      <main className={section===4?" flex-1 bg-gray-200 p-4":"hidden"}>
      <div class="relative overflow-x-auto">
    <table className="w-[80%] divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
             Category Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category Images
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Edit
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
              Delete
            </th>
            {/* Add more table headers for additional details */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {categories?.map((cat) => (
            <tr key={cat._id}>
              <td className="w-[200px] px-6 py-4 border border-gray-300 whitespace-wrap">
                <div className=" text-sm font-medium text-gray-900">{cat.name}</div>
              </td>
              
               
              <td className="w-[20%] px-6 py-4 border border-gray-300 whitespace-wrap">
                <div className=" text-sm text-gray-900">
                    <img className='w-[100%]'
                    src={`${cat.url}`}
                    alt={`Product Photo ${cat.name}`}
                  />                 
                </div>
              </td>
              <td className="px-6 py-4 border border-gray-300 whitespace-wrap">
                <div className="text-sm text-gray-900"><button className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={e=>updateCat(cat._id)}>Edit</button></div>
              </td>
              <td className="px-6 py-4 border border-gray-300 whitespace-wrap">
                <div className="text-sm text-gray-900"><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={e=> Deletecategory(cat._id)}>Delete </button></div>
              </td>
              {/* Add more table cells for additional details */}
            </tr>
          ))}
        </tbody>
      </table> 
      </div>
    </main>
    {/* Create Slide Area */}
    <main className={section===7?"flex-1 bg-gray-200 p-4":"hidden"}>
        <div className="md:w-2/3  mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Create Slide</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" enctype="multipart/form-data" method="post">
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="catName">
                slide title
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="catName"
                name="name"
                type="text"
                placeholder="Enter Category Name"
                value={catData.name}
                onChange={handleCatInputChange}
            />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
                Slide Image
            </label>
            <input
                className="block text-gray-700 text-sm font-bold"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleCatImageChange}
            />
            </div>
            <div className="flex items-center justify-between">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleCreateSlide}
            >
                Create
            </button>
            </div>
        </form>
        </div>
    </main>
    {/* update Slide Area */}
    <main className={section===13?"flex-1 bg-gray-200 p-4":"hidden"}>
        <div className="md:w-2/3  mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Update Slide</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" enctype="multipart/form-data" method="post">
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="catName">
                slide title
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="catName"
                name="name"
                type="text"
                placeholder="Enter Category Name"
                value={catData.name}
                onChange={handleCatInputChange}
            />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
                Slide Image
            </label>
            <input
                className="block text-gray-700 text-sm font-bold"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleCatImageChange}
            />
            </div>
            <div className="flex items-center justify-between">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleupdateSlide}
            >
                Update Slide
            </button>
            </div>
        </form>
        </div>
    </main>
    {/* Show All Slide Area */}
    <main className={section===8?"flex-1 bg-gray-200 p-4":"hidden"}>
    <div class="relative overflow-x-auto">
    <table className="w-[80%] divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
             Slide title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Slide Images
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Edit
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
              Delete
            </th>
            {/* Add more table headers for additional details */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {slides?.map((slide) => (
            <tr key={slide._id}>
              <td className="w-[200px] px-6 py-4 border border-gray-300 whitespace-wrap">
                <div className=" text-sm font-medium text-gray-900">{slide.title}</div>
              </td>
              
               
              <td className="w-[20%] px-6 py-4 border border-gray-300 whitespace-wrap">
                <div className=" text-sm text-gray-900">
                    <img className='w-[100%]'
                    src={`${slide.url}`}
                    alt={`Product Photo ${slide.title}`}
                  />                 
                </div>
              </td>
              <td className="px-6 py-4 border border-gray-300 whitespace-wrap">
                <div className="text-sm text-gray-900"><button className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={e=>updateSlide(slide._id)}>Edit</button></div>
              </td>
              <td className="px-6 py-4 border border-gray-300 whitespace-wrap">
                <div className="text-sm text-gray-900"><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={e=> deleteSlide(slide._id)}>Delete </button></div>
              </td>
              {/* Add more table cells for additional details */}
            </tr>
          ))}
        </tbody>
      </table> 
      </div>
    </main>
    {/* Show All Orders */}
    <main className={section===9?" flex-1 bg-gray-200 p-4":"hidden"}>
    <div class="relative overflow-x-auto">
    <table className="w-[100%] divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
             Order-Id
            </th>
            <th scope="col" className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product Details
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Amount
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
              Payment Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
              Status
            </th>
            
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders?.map((o,i) => (
            <tr key={i}>
              <td className="w-[100px] px-2 py-2 border border-gray-300 whitespace-wrap">
                <button className=" text-sm font-medium text-gray-900" onClick={e=>getOrderDetails(o?._id)}>{o?._id}</button>
              </td>

              <td className=" px-6 py-4 border border-gray-300 whitespace-wrap">
                <div className="w-[250px] text-sm text-gray-900">                    
               {o?.products?.map((product)=>(
                <>
                  <h2>Name: {product?.name}</h2>
                  <h2>Size: {product?.psize}</h2>
                  <h2>Color: {product?.color}</h2>
                  <h2>Color: {product?.salePrice}</h2>
                  <h2 className='border-b border-solid border-black'>Qty: {product?.qty}</h2> </>
               ))}
                   
                 
                </div>
              </td>
              <td className="px-6 py-4 border border-gray-300 whitespace-wrap">
                <div className="text-sm text-gray-900"><h2 >{o?.payment?.data?.amount}</h2></div>
              </td>
              <td className="px-6 py-4 border border-gray-300 whitespace-wrap">
                <div className="text-sm text-gray-900"><h2 >{o?.createdAt?.substring(0, 10)}</h2></div>
              </td>
              <td className="px-6 py-4 border border-gray-300 whitespace-wrap">
                <div className="text-sm text-gray-900"><h2>{o?.payment?.data?.paymentInstrument?.type}</h2></div>
              </td>
              <td className="px-6 py-4 border border-gray-300 whitespace-wrap">
                  <select className='border border-gray-300 rounded p-2' bordered={false} onChange={(e) => updateStatus(o?._id, e.target.value)} defaultValue={o?.status}>
                                {orderstatus.map((s,j)=>(
                                <option key={j} value={s}>{s}</option>
                                ))}
                  </select>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table> 
      </div>
    </main>

     {/* Create Coupon */}
     <main className={section===11?"flex-1 bg-gray-200 p-4":"hidden"}>
        <div className="md:w-2/3  mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Create Coupon</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" enctype="multipart/form-data" method="post">
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="catName">
                Coupon Code
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="catName"
                name="couponcode"
                type="text"
                placeholder="Enter Coupon Code"
                value={couponcode}
                onChange={e=>setCouponCode(e.target.value)}
            />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="catName">
                Coupon Discount %
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="catName"
                name="coupondiscount"
                type="text"
                placeholder="Enter Coupon Discount %"
                value={coupondiscount}
                onChange={e=>setCouponDiscount(e.target.value)}
            />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="catName">
                Coupon Date
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="catName"
                name="coupondate"
                type="date"
                placeholder="Enter Coupon Date"
                value={coupondate}
                onChange={e=>setCouponDate(e.target.value)}
            />
            </div>

            
            <div className="flex items-center justify-between">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={createCoupon}
            >
                Create Coupon
            </button>
            </div>
        </form>
        </div>
    </main>
  {/* Show All Coupon*/}
  <main className={section===12?" flex-1  bg-gray-200 p-4":"hidden"}>
    <div className="relative overflow-x-auto">
      <table className="w-[60%] divide-y divide-gray-200 mx-auto">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Coupon Code
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coupon Discount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                Delete
              </th>
              {/* Add more table headers for additional details */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {coupons?.map((coupon) => (
              <tr key={coupon?._id}>
                <td className="w-[200px] px-6 py-4 border border-gray-300 whitespace-wrap">
                  <div className=" text-sm font-medium text-gray-900">{coupon?.title}</div>
                </td>              
                
                <td className="w-[200px] px-6 py-4 border border-gray-300 whitespace-wrap">
                  <div className=" text-sm font-medium text-gray-900">{coupon?.discount}</div>
                </td>
              
                <td className="px-6 py-4 border border-gray-300 whitespace-wrap">
                  <div className="text-sm text-gray-900"><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={e=> deleteCoupon(coupon._id)}>Delete </button></div>
                </td>
                {/* Add more table cells for additional details */}
              </tr>
            ))}
          </tbody>
        </table> 
        </div>
      </main>
        
    {/*Orders Details */}
    <main className={section===10?" flex-1 bg-gray-200 p-4":"hidden"}>    
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
             User Address
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
             User Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
             User Mobile No.
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product Details
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Amount
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
              Payment Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
              Status
            </th>
            
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="w-[100px] px-2 py-2 border border-gray-300 whitespace-wrap">
                <div className=" text-sm font-medium text-gray-900">{orderDetail?.firstname} {orderDetail?.lastname}
                <button className="bg-yellow-300 hover:bg-yellow-500 text-white font-bold py-2 mt-4 px-2 rounded" onClick={orderShip}>Push to Shiprocket </button>
                </div>
              </td>
              <td className=" px-2 py-2 border border-gray-300 whitespace-wrap">              
                <div className="w-[200px] text-sm font-medium text-gray-900">{orderDetail?.address}</div>
              </td>
              <td className=" px-2 py-2 border border-gray-300 whitespace-wrap">
                <div className=" text-sm font-medium text-gray-900">{orderDetail?.email}</div>
              </td>
              <td className="w-[150px] px-2 py-2 border border-gray-300 whitespace-wrap">
                <div className=" text-sm font-medium text-gray-900">{orderDetail?.phone}</div>
              </td>

              <td className=" px-2 py-2 border border-gray-300 whitespace-wrap">
                <div className="w-[200px] text-sm text-gray-900">                    
               
                  {orderDetail?.products?.map((product)=>(
                    <>
                    <h2>Name: {product?.name}</h2>
                    <h2>Size: {product?.psize}</h2>
                    <h2>Color: {product?.color}</h2>
                    <h2>Item Price: {product?.salePrice}</h2>
                    <h2 className='border-b border-solid border-black'>Qty: {product?.qty}</h2>
                    </>
                  ))}
                     
                
                </div>
              </td>
              <td className="px-2 py-2 border border-gray-300 whitespace-wrap">
                <div className="text-sm text-gray-900"><h2 >{orderDetail?.payment?.data?.amount} {orderDetail?.payment?.data?.state}</h2></div>
              </td>
              <td className="px-2 py-2 border border-gray-300 whitespace-wrap">
                <div className="text-sm text-gray-900"><h2 >{orderDetail?.createdAt?.substring(0, 10)}</h2></div>
              </td>
              <td className="px-2 py-2 border border-gray-300 whitespace-wrap">
                <div className="text-sm text-gray-900"><h2>{orderDetail?.payment?.data?.paymentInstrument?.type}</h2></div>
              </td>
              <td className="px-2 py-2 border border-gray-300 whitespace-wrap">
              <div className="text-sm text-gray-900"><h2>{orderDetail?.status}</h2></div>
              </td>
              
            </tr>
         
        </tbody>
    </table>
    </div>

    </main>
</div>
  </div>
  </>
  )
}

export default Admin;