import React from 'react';
import { useRouteError } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react'; 
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fef2f2] to-[#fce7f3] px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md text-center">
        <div className="flex justify-center mb-4 text-red-600">
          <AlertTriangle size={48} />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Something went wrong</h1>
        <p className="text-gray-600 mb-4">
          We’re sorry, but an unexpected error has occurred.
        </p>
        <p className="text-sm text-gray-400 mb-6">
          {error?.statusText || error?.message || "Unknown error"}
        </p>
        <Link 
          to="/"
          className="inline-block px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
