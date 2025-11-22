import { Link } from "react-router-dom";

export default function ThaparNavbar() {
  return (
    <nav className="w-full bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Left – Logo + Title */}
        <div className="flex items-center gap-3">
          <img
            src="/favicon.ico"
            alt="Thapar Logo"
            className="w-8 h-8"
          />
          <div>
            <h1 className="text-lg font-semibold">Campus Ride</h1>
            <p className="text-xs text-gray-500">
              Thapar University — Smart E-Rickshaw
            </p>
          </div>
        </div>

        {/* Middle – Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/auth/student" className="hover:text-red-600">
            Student
          </Link>
          <Link to="/auth/driver" className="hover:text-red-600">
            Driver
          </Link>
          <Link to="/auth/admin" className="hover:text-red-600">
            Admin
          </Link>
        </div>

        {/* Right – Book Ride */}
        <Link
          to="/auth/student"
          className="px-5 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
        >
          Book a Ride
        </Link>
      </div>
    </nav>
  );
}
