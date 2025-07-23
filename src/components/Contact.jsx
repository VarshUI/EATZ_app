import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Contact Us</h1>
      
      <div className="bg-gray-50 rounded-lg p-8 shadow-lg">
        <p className="text-lg text-gray-700 mb-6 text-center">
          If you have any questions or feedback, feel free to reach out to us at:
        </p>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center sm:justify-start">
            <span className="inline-block w-6 h-6 bg-blue-100 rounded-full mr-3 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <span className="text-lg text-gray-800">
              <span className="font-semibold">Email:</span> abc@abc.com
            </span>
          </div>
          
          <div className="flex items-center justify-center sm:justify-start">
            <span className="inline-block w-6 h-6 bg-green-100 rounded-full mr-3 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </span>
            <span className="text-lg text-gray-800">
              <span className="font-semibold">Phone:</span> +1234567890
            </span>
          </div>
          
          <div className="flex items-center justify-center sm:justify-start">
            <span className="inline-block w-6 h-6 bg-red-100 rounded-full mr-3 flex items-center justify-center">
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            <span className="text-lg text-gray-800">
              <span className="font-semibold">Address:</span> 123 Food Street, Food City, FC 12345
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-10 text-center">
        <Link to="/">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
            Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Contact;