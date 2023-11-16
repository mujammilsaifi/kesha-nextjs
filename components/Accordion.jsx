import React, { useState } from "react";
import SingleAccordion from "./SingleAccordion";

const Accordion = () => {
  const [accordions, setAccordion] = useState([
    {
      key: 1,
      title: "How do I determine my ring size when shopping online?",
      data: `We provide a comprehensive ring size guide on our website to help you accurately measure your ring size at home. Additionally, we offer a complimentary ring sizer upon request to ensure a perfect fit for your purchase.`,
      isOpen: false,
    },
    {
      key: 2,
      title: "What materials are used in your jewelry pieces?",
      data: `Our jewelry pieces are crafted with the finest materials, including high-quality precious metals such as gold, silver, and platinum. We also use authentic gemstones sourced from trusted suppliers to ensure the highest standards of quality and authenticity.`,
      isOpen: false,
    },
    {
      key: 3,
      title: "Do you offer custom jewelry designs?",
      data: `Yes, we offer personalized and custom jewelry design services to bring your unique vision to life. Our experienced craftsmen work closely with you to create one-of-a-kind pieces that reflect your individual style and preferences.`,
      isOpen: false,
    },
    {
      key: 4,
      title:
        "How can I care for and maintain my jewelry to ensure its longevity?",
      data: `We provide comprehensive care instructions for each type of jewelry on our website. Additionally, we offer tips on cleaning and storing your jewelry properly to maintain its brilliance and luster over time.`,
      isOpen: false,
    },
    {
      key: 5,
      title: "What is your return and exchange policy?",
      data: `We offer a hassle-free return and exchange policy within a specified timeframe, allowing you to return or exchange your purchase if it does not meet your expectations. Please refer to our detailed return policy on our website for more information on the process and eligibility criteria.`,
      isOpen: false,
    },
  ]);

  const toggleAccordion = (accordionkey) => {
    const updatedAccordions = accordions.map((accord) => {
      if (accord.key === accordionkey) {
        return { ...accord, isOpen: !accord.isOpen };
      } else {
        return { ...accord, isOpen: false };
      }
    });

    setAccordion(updatedAccordions);
  };
  return (
    <div>
      <div className="p-2 m-8">
        <h1 className="mb-4 text-center font-oswald font-bold leading-none tracking-tight text-gray-900 text-[2rem] md:text-2xl lg:text-4xl dark:text-black">
          {" "}
          Frequently Asked Questions
        </h1>
        <p className="mb-4 text-center dark:text-black">
          Everything You Need to Know Before Making Your Purchase
        </p>
        <section className="w-full flex items-center justify-center">
          <section className="w-[90%] md:w-[60%]">
            {accordions.map((accordion) => (
              <SingleAccordion
                key={accordion.key}
                title={accordion.title}
                data={accordion.data}
                isOpen={accordion.isOpen}
                toggleAccordion={() => toggleAccordion(accordion.key)}
              />
            ))}
          </section>
        </section>
      </div>
    </div>
  );
};

export default Accordion;
