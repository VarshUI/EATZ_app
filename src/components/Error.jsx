import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.error(err);
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="mb-6">
          <svg className="w-20 h-20 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        {/* Error Status */}
        <h1 className="text-6xl font-bold text-red-600 mb-2">
          {err.status || "404"}
        </h1>
        
        {/* Error Message */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {err.statusText || "Page Not Found"}
        </h2>
        
        {/* Additional Error Details */}
        {err.data && (
          <p className="text-gray-600 mb-6 text-sm">
            {err.data}
          </p>
        )}
        
        {/* Description */}
        <p className="text-gray-600 mb-8 text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* Back to Home Button */}
        <Link to="/">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg inline-flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;