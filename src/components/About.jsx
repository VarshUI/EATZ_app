import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 bg-white">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">About Us</h1>
      
      <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <p>
          Welcome to our food ordering app! We are dedicated to bringing you the
          best dining experience right at your fingertips. Our mission is to
          connect you with a wide variety of restaurants and cuisines, making it
          easy and convenient to enjoy delicious meals from the comfort of your
          home.
        </p>
        
        <p>
          Whether you're craving pizza, sushi, or a gourmet burger, we've got you
          covered. Our user-friendly interface allows you to browse menus, place
          orders, and track deliveries in real-time.
        </p>
        
        <p>
          Thank you for choosing us for your food delivery needs. We look forward
          to serving you!
        </p>
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

export default About;