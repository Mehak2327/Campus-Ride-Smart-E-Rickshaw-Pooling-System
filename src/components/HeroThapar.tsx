import { Link } from "react-router-dom";

export default function HeroThapar() {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Smart E-Rickshaw <br />
            Pooling <br />
            <span className="text-red-600">for Thapar Campus</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg max-w-xl">
            Book, track, and ride effortlessly. Designed exclusively for TIET students to 
            make campus commuting smoother and faster.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/auth/student"
              className="px-6 py-3 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition"
            >
              Book a Ride
            </Link>

            <a
              href="#why"
              className="px-6 py-3 border border-gray-400 rounded-full text-gray-700 hover:bg-gray-100 transition"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center relative">
          <img
            src="/thapar.jpg"
            alt="Campus Ride Rickshaw"
            className="w-full max-w-md rounded-xl shadow-lg"
          />
        </div>

      </div>
    </section>
  );
}
