import React, { useRef } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_qx2ubx7",
        "template_9zoybbh",
        form.current,
        "00VVM50JUyrF0clWI"
      )
      .then(
        (result) => {
          console.log(result.text);
          Swal.fire({
            title: "Message Sent!",
            text: "Thanks for contacting me...",
            icon: "success",
            confirmButtonColor: "#7c3aed", // Violet color to match UI
          });
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          Swal.fire({
            title: "Oops!",
            text: "Something went wrong...",
            icon: "error",
            confirmButtonColor: "#ef4444",
          });
        }
      );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Title Section */}
        <h1 className="text-center font-serif font-bold text-4xl md:text-5xl text-gray-800 dark:text-white mb-10 tracking-tight">
          Contact Us
        </h1>

        {/* Main Card */}
        <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden transition-colors duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
            
            {/* Left Column: Info */}
            <div className="p-8 lg:p-12 flex flex-col justify-between space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Get in touch
                </h2>
                <p className="pt-2 text-gray-600 dark:text-gray-400">
                  Fill in the form to start a conversation.
                </p>
              </div>

              <div className="space-y-6 text-gray-700 dark:text-gray-300">
                <p className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <span>Gazipur, Dhaka, Bangladesh</span>
                </p>
                <p className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  <span>+880 1404-260731</span>
                </p>
                <p className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <span className="break-all">saifur.devweb@gmail.com</span>
                </p>
              </div>
            </div>

            {/* Right Column: Form */}
            <form ref={form} onSubmit={sendEmail} className="p-8 lg:p-12 flex flex-col space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto self-end px-8 py-3.5 text-base font-medium text-white bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 rounded-xl shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-200 active:scale-[0.98]"
              >
                Send Message
              </button>
            </form>

          </div>
        </section>
      </div>
    </div>
  );
}

export default Contact;