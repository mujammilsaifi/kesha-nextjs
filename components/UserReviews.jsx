import axios from "axios";
import { useState ,useEffect} from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const UserReviews = () => {
    const [allreviews, setReview] = useState([])
const  reviews = async () => {
    try {
      const { data } = await axios.get(`/api/getreviews`);
      if (data?.success) {        
        setReview(data?.review);  
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    reviews()  
  }, []);
  return (
    <>
    <Carousel responsive={responsive} infinite={true} infiniteLoop={true} autoPlay={true} autoPlaySpeed={3000}>
        
    {allreviews?.map((re,i)=>(
        <figure key={i} className="max-w-screen-md mx-auto text-center">
              <svg className="w-10 h-10 mx-auto mb-3 text-black dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
              </svg>
              <blockquote>
                <p className="md:text-lg text-base italic font-medium text-black dark:text-black">{re?.review}</p>
              </blockquote>
              <figcaption className="flex items-center justify-center mt-6 space-x-3">
                <img className="w-6 h-6 rounded-full" src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png" alt="profile picture" />
                <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                  <h2 className="pr-3 text-lg font-bold text-black dark:text-black">{re?.name}</h2>                  
                </div>
              </figcaption>
            </figure>
    ))}       

        </Carousel>
            
        </>
  )
}

export default UserReviews