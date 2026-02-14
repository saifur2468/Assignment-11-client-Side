import React from 'react';
import { Link } from "react-router-dom";

 import { DotLottieReact } from'@lottiefiles/dotlottie-react';
const Error = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-6">
            {/* Left Section */}
            <div className="max-w-md text-center md:text-left mb-10 md:mb-0">
                <h1 className="text-6xl font-extrabold text-gray-900 mb-4">
                    Oooops!
                </h1>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    We can’t seem to find the page you’re looking for. It might have been removed, renamed, or did not exist in the first place.
                </p>
                <Link
                    to="/"
                    className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl shadow-lg hover:bg-purple-700 hover:shadow-xl transition-all duration-300 ease-in-out"
                >
                     Back to Home
                </Link>
            </div>

            {/* Right Section */}
            <div className=" max-w-lg">
               <DotLottieReact
      src="https://lottie.host/9dd1f6c8-6a1e-4e8e-9593-7d739443a7aa/GXOGoISxN7.lottie"
      loop
      autoplay
    />
            </div>
        </div>
    );
};

export default Error;