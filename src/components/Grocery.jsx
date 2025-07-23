import React from 'react';
import { Link } from 'react-router-dom';

const Grocery = () => {
  return (
    <div className="groceries space-y-4 text-center p-8">
      <div className="text-3xl font-bold">Groceries!</div>
      <div className="text-lg text-gray-600">
        We have all the groceries you need! Page is being built !!! ⌛
      </div>
      <Link to="/">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
          Back Home
        </button>
      </Link>
    </div>
  );
};

export default Grocery;
