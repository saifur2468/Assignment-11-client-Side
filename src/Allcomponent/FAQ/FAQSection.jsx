import React, { useState } from 'react';
import { Plus, X, ArrowUpRight } from 'lucide-react';

const FaqSection = () => {
  // First item open by default like image
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "HOW LONG DOES A VOLUNTEER CAMPAIGN OR PROJECT TAKE?",
      answer: "Each project's timeline depends on the scope. A simple community drive or event can be launched within 1-2 weeks, while a full-scale regional volunteer campaign might take 3 – 6 weeks. Once we understand your needs, we'll give you a clear, realistic timeline."
    },
    {
      question: "CAN I MANAGE VOLUNTEERS AND POSTS AFTER IT'S BUILT?",
      answer: "Yes, absolutely! You will have access to a dedicated admin dashboard where you can easily create, edit, or remove volunteer need posts, manage volunteer applications, and track campaign status in real time."
    },
    {
      question: "HOW DOES VOLUNTEER REGISTRATION WORK?",
      answer: "Volunteers can browse through active need posts, view event details, and submit direct join requests. Admins or organization leaders can then review applications, approve or reject them, and manage attendee rosters directly."
    },
    {
      question: "WHAT TOOLS AND TECH STACK ARE USED IN BUILDING?",
      answer: "We build modern, fast, and scalable applications using React, Next.js, TypeScript, Tailwind CSS, Node.js, Express, MongoDB, and PostgreSQL alongside JWT for secure authentication."
    },
    {
      question: "HOW CAN ORGANIZATIONS REQUEST VOLUNTEER SUPPORT?",
      answer: "Organizations can create an account, log in, and post their specific community needs or event drives through the platform with custom requirements, locations, and deadlines."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 min-h-screen flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pb-8 border-b border-gray-300 dark:border-gray-800 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Got questions?
            </p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Say less, we've got answers!
            </p>
          </div>
          
          <div className="flex items-center gap-1.5 font-serif italic text-4xl sm:text-6xl font-normal tracking-tight text-gray-900 dark:text-white">
            <span>FAQ’s</span>
            <ArrowUpRight className="w-8 h-8 sm:w-12 sm:h-12 not-italic text-gray-900 dark:text-white stroke-[1.5]" />
          </div>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-gray-300 dark:divide-gray-800">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="py-6 sm:py-8 transition-colors">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-start text-left gap-4 group focus:outline-none"
                >
                  <span className="text-base sm:text-xl font-semibold tracking-wide text-gray-900 dark:text-white uppercase leading-snug">
                    {faq.question}
                  </span>
                  
                  <span className="p-1 text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-transform duration-200">
                    {isOpen ? (
                      <X className="w-6 h-6 stroke-[1.5]" />
                    ) : (
                      <Plus className="w-6 h-6 stroke-[1.5]" />
                    )}
                  </span>
                </button>

                {/* Expanded Answer Grid / Collapsible */}
                {isOpen && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4 pt-2 transition-all duration-300 ease-in-out">
                    {/* Left blank column for large screens to match layout balance */}
                    <div className="hidden md:block md:col-span-5 lg:col-span-6"></div>
                    
                    {/* Right text box */}
                    <div className="md:col-span-7 lg:col-span-6 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FaqSection;