import { Link } from "react-router-dom";

export default function HeroThapar() {
  return (
    <section className="w-full bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Smart E-Rickshaw Pooling <br />
            <span className="text-red-600">for Thapar Campus</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg max-w-xl leading-relaxed">
            Book, track, and ride effortlessly. Designed exclusively for TIET students,
            Campus Ride helps reduce congestion and ensures faster campus commuting.
          </p>

          <div className="mt-8 flex gap-4">
            {/* Main CTA */}
            <Link
              to="/auth/student"
              className="px-7 py-3 bg-red-600 text-white font-semibold rounded-full shadow hover:bg-red-700 transition"
            >
              Book a Ride
            </Link>

            {/* Secondary CTA */}
            <a
              href="#why"
              className="px-7 py-3 border border-gray-400 rounded-full text-gray-700 hover:bg-gray-100 transition"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* RIGHT — IMAGE */}
        <div className="flex justify-center relative">
          <img
            src="/thapar.jpg"
            alt="Campus Ride at Thapar"
            className="w-full max-w-md rounded-xl shadow-xl border border-gray-200"
          />
        </div>
      </div>
    </section>
  );
}
