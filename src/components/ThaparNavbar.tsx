import { Link } from "react-router-dom";

export default function ThaparNavbar() {
  return (
    <nav className="w-full bg-white/95 backdrop-blur-sm shadow-sm border-b fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LEFT — Logo + Branding */}
        <div className="flex items-center gap-3">
          <img
            src="/favicon.ico"
            alt="Thapar Logo"
            className="w-8 h-8"
          />

          <div className="leading-tight">
            <h1 className="text-lg font-semibold text-gray-900">Campus Ride</h1>
            <p className="text-[11px] text-gray-500">
              Thapar University • Smart E-Rickshaw
            </p>
          </div>
        </div>

        {/* RIGHT — Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">

          <Link to="/auth/student" className="hover:text-red-600 transition">
            Student
          </Link>

          <Link to="/auth/driver" className="hover:text-red-600 transition">
            Driver
          </Link>

          <Link to="/auth/admin" className="hover:text-red-600 transition">
            Admin
          </Link>

          {/* CTA BUTTON */}
          <Link
            to="/auth/student"
            className="px-5 py-2 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition"
          >
            Book Ride
          </Link>
        </div>

        {/* MOBILE — (optional if later needed) */}
      </div>
    </nav>
  );
}
