import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-white to-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-4 backdrop-blur bg-white/60 shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
            alt="logo"
            className="w-8 h-8"
          />
          <h1 className="text-xl font-semibold">Money Manager</h1>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-10 text-gray-700">
          <a href="#" className="hover:text-black">Home</a>
          <a href="#" className="hover:text-black">About us</a>
          <a href="#" className="hover:text-black">Contact us</a>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <Link to={"/login"} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg cursor-pointer">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-30 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Take Control of Your Finances
        </h1>

        <p className="mt-4 text-gray-600 max-w-2xl text-lg">
          Your foundation for secure, intelligent financial management.
          Effortlessly track your income and expenses to achieve your
          financial goals.
        </p>

        <div className="mt-8 flex gap-4">
          <Link to={"/login"} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium">
            Start Tracking for Free
          </Link>
          <button className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 font-medium flex items-center gap-2">
            Learn More →
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
