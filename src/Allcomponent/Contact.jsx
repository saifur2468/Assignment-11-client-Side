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
          Swal.fire(
            "Message Sent!",
            "Thanks for contacting me......",
            "success"
          );
          form.current.reset(); 
        },
        (error) => {
          console.log(error.text);
          Swal.fire(
            "Oops!",
            "Something went wrong......?",
            "error"
          );
        }
      );
  };

  return (
    <>
      <h1 className="text-center text-serif font-bold text-5xl text-gray-500">
        Contact Us
      </h1>

      <section className="py-6 dark:bg-gray-100 dark:text-gray-900 border-2 rounded-xl mt-2">
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          <div className="py-6 md:py-0 md:px-6">
            <h1 className="text-4xl font-bold">Get in touch</h1>
            <p className="pt-2 pb-4">Fill in the form to start a conversation</p>
            <div className="space-y-4">
              <p className="flex items-center">
                <span>Gazipur,Dhaka,Bangladesh</span>
              </p>
              <p className="flex items-center">
                <span>123456789</span>
              </p>
              <p className="flex items-center">
                <span>contactv@business.com</span>
              </p>
            </div>
          </div>

          <form ref={form} onSubmit={sendEmail} className="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
            <label className="block">
              <span className="mb-1 text-bold ">Full name</span>
              <input
                type="text"
                name="name"
                placeholder="Leroy Jenkins"
                className="block border-2 h-[48px] w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-100"
                required
              />
            </label>
            <label className="block">
              <span className="mb-1">Email address</span>
              <input
                type="email"
                name="email"
                placeholder="leroy@jenkins.com"
                className="block border-2 h-[48px] w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-100"
                required
              />
            </label>
            <label className="block">
              <span className="mb-1">Message</span>
              <textarea
                name="message"
                rows="3"
                className="block border-2 h-[58px] w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-100"
                required
              ></textarea>
            </label>
            <button
              type="submit"
              className="border-2 rounded-xl self-center px-8 py-3 text-lg focus:ring hover:ring focus:ring-opacity-75 dark:bg-violet-600 dark:text-gray-50 focus:dark:ring-violet-600 hover:dark:ring-violet-600"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Contact;
