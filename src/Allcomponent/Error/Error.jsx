import React from 'react';
import { Link } from "react-router-dom";
import icon from '../../assets/Capture.JPG';

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
                    ⬅ Back to Home
                </Link>
            </div>

            {/* Right Section */}
            <div className=" max-w-lg">
                <div>
                    <div className="-top-10  text-center bg-purple-500 text-white text-3xl font-bold px-8 py-3 rounded-full shadow-lg animate-bounce">
                        404
                    </div>
                    <img
                        src={icon}
                        alt="Error Illustration"
                        className="w-48 h-48 mb-6 rounded-xl shadow-md"
                    />
             
                </div>
            </div>
        </div>
    );
};

export default Error;