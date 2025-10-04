import React, { useEffect, useState } from "react";
import { GradualSpacing } from "../FAQ/GradualSpacing";

const FAQSection = () => {
  const [faqData, setFaqData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetch("/FAQDATA.json")
      .then((res) => res.json())
      .then((data) => setFaqData(data));
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" py-16 px-4 md:px-16">
      {/* Animated H2 */}
      <div className="mb-8 text-cyan-500">
        <GradualSpacing text="Frequently Asked Questions" />
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((item, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-md">
            <button
              onClick={() => toggle(idx)}
              className="w-full text-gray-500 text-left px-6 py-4 flex justify-between items-center focus:outline-none"
            >
              <span className="font-medium">{item.question}</span>
              <span>{openIndex === idx ? "-" : "+"}</span>
            </button>
            {openIndex === idx && (
              <div className="px-6 py-4 text-gray-700 border-t border-gray-200">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
