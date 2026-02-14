import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="w-12 h-12 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
