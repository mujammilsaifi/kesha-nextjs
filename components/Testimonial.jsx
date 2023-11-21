import React, { useCallback, useRef } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const Testimonial = () => {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const data = [
    {
      image: "/review/1.png",
      reviewAlt: "lineicon",
      details:
      "I couldn't be happier with the jewelry I purchased from kesha jewellery. The quality and craftsmanship are outstanding, and the customer service was top-notch. I'll definitely be coming back for more.",
      name: "Sonali Tripathi",
      position: "Chief Executive Officer.",
    },
    {
      image: "/review/2.png",
      reviewAlt: "lineicon",
      details:
      "One of the things I love about kesha jewellery is the unique and exquisite jewelry designs. I always find something special that I can't find anywhere else. It's the perfect place to find one-of-a-kind pieces.",
      name: "Poonam Aggrawal",
      position: "Chief Executive Officer.",
    },
    {
      image: "/review/3.png",
      reviewAlt: "lineicon",
      details:
      "The staff at kesha jewellery made my jewelry shopping experience truly exceptional. They took the time to understand my preferences and helped me find the perfect piece. The personalized service is unmatched.",
      name: "Saloni Rajut",
      position: "Chief Executive Officer.",
    },
    {
      image: "/review/4.png",
      reviewAlt: "lineicon",
      details:
      "I've purchased several pieces from kesha jewellery, and they have all maintained their beauty and quality over the years. The durability of their jewelry is impressive.",
      position: "Chief Executive Officer.",
      name: "Rekha Singh",
    },
  ];

  return (
    <>
      <section className="pt-20 pb-0 lg:pt-[120px] lg:pb-[10px]">
        <h1 className="mb-4 text-center font-oswald font-bold leading-none tracking-tight text-gray-900 text-1xl md:text-2xl lg:text-4xl dark:text-black">
          Testimonials
        </h1>
        <p className="mb-4 text-center dark:text-black">
        Hear from Our Happy Customers
        </p>
        <div className="container mx-auto relative">
          <Swiper slidesPerView={1} ref={sliderRef}>
            {data.map((elm, i) => {
              const { image, details, name } = elm;
              return (
                
                  <SwiperSlide key={i}>
                    {/* single post s*/}

                    <div className="flex justify-center">
                      <div className="relative w-full md:w-11/12 lg:w-10/12 xl:w-8/12 p-10 bg-white rounded-lg border shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                        <div className="w-full items-center md:flex">
                          {" "}
                          <div className="relative mb-12 w-full max-w-[310px] md:mr-12 md:mb-0 md:max-w-[250px] lg:mr-14 lg:max-w-[280px] 2xl:mr-16">
                            {" "}
                            <img
                              src={image}
                              alt="image"
                              className="w-full rounded-lg"
                            />
                            <span className="absolute -bottom-6 -right-6 z-[-1]">
                              {" "}
                              <svg
                                width="64"
                                height="64"
                                viewBox="0 0 64 64"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3 32C3 15.9837 15.9837 3 32 3C48.0163 2.99999 61 15.9837 61 32C61 48.0163 48.0163 61 32 61C15.9837 61 3 48.0163 3 32Z"
                                  stroke="#13C296"
                                  strokeWidth="6"
                                />
                              </svg>
                            </span>
                          </div>
                          <div className="w-full">
                            <div>
                              <p className="text-body-color mb-11 text-base font-medium italic sm:text-lg">
                                {`${details}`}
                              </p>
                              <h4 className="text-dark text-xl font-semibold">
                                {name}
                              </h4>
                              
                              {/* button s*/}
                              <div className="relative flex items-center pt-4">
                                <div
                                  className="prev-arrow cursor-pointer"
                                  onClick={handlePrev}
                                >
                                  <button className="text-primary hover:bg-primary shadow-input mx-1 flex h-12 w-12 items-center justify-center rounded-full bg-white border shadow-2xl">
                                    <svg
                                      width="15"
                                      height="13"
                                      viewBox="0 0 15 13"
                                      className="fill-current"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M5.24264 11.8033L0.46967 7.03037C0.176777 6.73748 0.176777 6.2626 0.46967 5.96971L5.24264 1.19674C5.53553 0.903845 6.01041 0.903845 6.3033 1.19674C6.59619 1.48963 6.59619 1.96451 6.3033 2.2574L2.81066 5.75004H14C14.4142 5.75004 14.75 6.08583 14.75 6.50004C14.75 6.91425 14.4142 7.25004 14 7.25004H2.81066L6.3033 10.7427C6.59619 11.0356 6.59619 11.5104 6.3033 11.8033C6.01041 12.0962 5.53553 12.0962 5.24264 11.8033Z"
                                      ></path>
                                    </svg>
                                  </button>
                                </div>
                                <div
                                  className="next-arrow cursor-pointer"
                                  onClick={handleNext}
                                >
                                  <button className="text-primary hover:bg-primary shadow-input mx-1 flex h-12 w-12 items-center justify-center rounded-full bg-white border shadow-2xl">
                                    <svg
                                      width="15"
                                      height="13"
                                      viewBox="0 0 15 13"
                                      className="fill-current"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M9.75736 11.8033L14.5303 7.03037C14.8232 6.73748 14.8232 6.2626 14.5303 5.96971L9.75736 1.19674C9.46447 0.903845 8.98959 0.903845 8.6967 1.19674C8.40381 1.48963 8.40381 1.96451 8.6967 2.2574L12.1893 5.75004H1C0.585786 5.75004 0.25 6.08583 0.25 6.50004C0.25 6.91425 0.585786 7.25004 1 7.25004H12.1893L8.6967 10.7427C8.40381 11.0356 8.40381 11.5104 8.6967 11.8033C8.98959 12.0962 9.46447 12.0962 9.75736 11.8033Z"
                                      ></path>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                              {/* button e */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* single post e*/}
                  </SwiperSlide>
                
              );
            })}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Testimonial;
