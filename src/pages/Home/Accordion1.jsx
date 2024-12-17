import { useState } from "react";
import faq from "../../../src/assets/images/faq.png";
export const Accordion1 = () => {
  const [isOpen, setIsOpen] = useState(null);
  const accordions = [
    {
      title: "What is FoodBuzz?",
      description:
        "FoodBuzz allows users to view, share, and donate food to help reduce waste and fight hunger.",
    },
    {
      title: "How can I donate food through FoodBuzz?",
      description:
        "Create an account, click on 'Donate Food,' provide details like type, quantity, and expiration date, and submit your listing.",
    },
    {
      title: "Is FoodBuzz free to use?",
      description:
        "FoodBuzz is completely free for both donors and recipients to ensure food accessibility and reduce waste.",
    },
  ];
  const toggle = (idx) => {
    setIsOpen((prevIdx) => (prevIdx === idx ? null : idx));
  };
  return (
    <div className="lg:mt-24 md:mt-16 mt-12">
      <div className="md:w-3/4 mx-auto text-center">
        <h3 className=" md:text-4xl text-2xl font-bold text-center mb-4 md:mb-6 lg:mb-8">
          Need To Know
        </h3>
        <p className="text-lg">
          Find answers to common questions about FoodBuzz, including how it
          works, food safety, and more.
        </p>
      </div>
      <div className="lg:flex items-center justify-between lg:gap-16">
        <img
          className="w-full md:w-2/3 lg:w-1/2 h-full lg:ml-[-50px] mx-auto mt-[-50px] lg:mt-0"
          src={faq}
          alt="faq-image"
        />
        <div className="border rounded-lg mx-4 mt-[-70px] lg:mt-0">
          {accordions.map((PerAccordion, idx) => (
            <div key={idx} className="p-4 border-b">
              <button
                onClick={() => toggle(idx)}
                className="flex justify-between items-center py-4 w-full h-full"
              >
                <span className="text-xl">{PerAccordion.title}</span>
                <svg
                  className="fill-[#00A2FF] shrink-0 ml-8"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="7"
                    width="16"
                    height="2"
                    rx="1"
                    className={`transform origin-center transition duration-200 ease-out ${
                      isOpen === idx && "!rotate-180"
                    }`}
                  />
                  <rect
                    y="7"
                    width="16"
                    height="2"
                    rx="1"
                    className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                      isOpen === idx && "!rotate-180"
                    }`}
                  />
                </svg>
              </button>
              <div
                className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600  ${
                  isOpen === idx
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  {PerAccordion.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
