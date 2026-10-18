import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import { MessageSquare, Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";

function VolunteerContact() {
  const form = useRef();
  const [selectedServices, setSelectedServices] = useState([]);

  // Volunteer Services / Interests list
  const servicesList = [
    "Community Outreach",
    "Event Coordination",
    "Fundraising & Grants",
    "Youth Mentorship",
    "Blood Donation Drive",
    "Other Volunteer Work",
  ];

  const handleCheckboxChange = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((item) => item !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Pass chosen services to hidden input before send
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
            text: "Thank you for getting in touch with our volunteer team!",
            icon: "success",
            confirmButtonColor: "#10b981",
            background: document.documentElement.classList.contains("dark") ? "#111827" : "#ffffff",
            color: document.documentElement.classList.contains("dark") ? "#f3f4f6" : "#111827",
          });
          form.current.reset();
          setSelectedServices([]);
        },
        (error) => {
          console.log(error.text);
          Swal.fire({
            title: "Oops!",
            text: "Something went wrong. Please try again later.",
            icon: "error",
            confirmButtonColor: "#ef4444",
          });
        }
      );
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto">
        
        {/* Header Section */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Contact our team
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Got any questions about volunteering or partnering with us? We're here to help. 
            Chat to our friendly team 24/7 and get onboard in less than 5 minutes.
          </p>
        </div>

        {/* Main Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Form */}
          <form ref={form} onSubmit={sendEmail} className="lg:col-span-7 space-y-6">
            
            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  First name
                </label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="First name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Last name
                </label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Phone number
              </label>
              <div className="flex">
                <span className="flex items-center px-4 rounded-l-xl border border-r-0 border-gray-300 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-medium">
                  BD +880
                </span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="1404-260731"
                  className="w-full px-4 py-3 rounded-r-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                placeholder="Leave us a message..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 resize-none"
                required
              ></textarea>
            </div>

            {/* Volunteer Services / Interest Checkboxes */}
            <div className="space-y-3 pt-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Volunteer Services / Areas of Interest
              </label>
              
              {/* Hidden field to send selected services in email */}
              <input
                type="hidden"
                name="services"
                value={selectedServices.join(", ")}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {servicesList.map((service, index) => (
                  <label
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedServices.includes(service)
                        ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-300"
                        : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={service}
                      checked={selectedServices.includes(service)}
                      onChange={() => handleCheckboxChange(service)}
                      className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
                    />
                    <span className="text-sm font-medium">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 text-base font-semibold text-white bg-gray-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl shadow-md transition-all duration-200 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Send message</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Right Side: Contact Info Sidebar */}
          <div className="lg:col-span-5 space-y-10 lg:pl-6 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-800 pt-10 lg:pt-0">
            
            {/* Chat with us */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Chat with us
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Speak to our friendly team via live chat.
              </p>
              <ul className="space-y-2.5 pt-1 text-sm font-semibold">
                <li>
                  <a href="#chat" className="inline-flex items-center gap-2 text-gray-900 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 underline underline-offset-4">
                    <MessageSquare className="w-4 h-4" />
                    <span>Start a live chat</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:saifur.devweb@gmail.com" className="inline-flex items-center gap-2 text-gray-900 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 underline underline-offset-4">
                    <Mail className="w-4 h-4" />
                    <span>Shoot us an email</span>
                  </a>
                </li>
                <li>
                  <a href="#twitter" className="inline-flex items-center gap-2 text-gray-900 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 underline underline-offset-4">
                    <MessageCircle className="w-4 h-4" />
                    <span>Message us on WhatsApp / Socials</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Call us */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Call us
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Call our team Mon-Fri from 8am to 5pm.
              </p>
              <p className="pt-1">
                <a href="tel:+8801404260731" className="inline-flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100 hover:text-emerald-600 dark:hover:text-emerald-400 underline underline-offset-4">
                  <Phone className="w-4 h-4" />
                  <span>+880 1404-260731</span>
                </a>
              </p>
            </div>

            {/* Visit us */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Visit us
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Chat to us in person at our Gazipur HQ.
              </p>
              <p className="pt-1">
                <a href="#map" className="inline-flex items-start gap-2 font-semibold text-gray-900 dark:text-gray-100 hover:text-emerald-600 dark:hover:text-emerald-400 underline underline-offset-4">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Gazipur, Dhaka, Bangladesh</span>
                </a>
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default VolunteerContact;