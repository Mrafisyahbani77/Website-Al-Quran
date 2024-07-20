// Spinner.js
import React from 'react';

const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin border-4 border-t-4 border-gray-200 rounded-full w-16 h-16"></div>
  </div>
);

export default Loader;
