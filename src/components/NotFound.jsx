// components/NotFound.js
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <h1 className="text-4xl font-bold text-gray-700 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/transactions"
        className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
