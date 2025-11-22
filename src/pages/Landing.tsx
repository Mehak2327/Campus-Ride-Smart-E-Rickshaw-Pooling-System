import ThaparNavbar from "@/components/ui/ThaparNavbar";
import HeroThapar from "@/components/ui/HeroThapar";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-black">

      {/* NAVBAR */}
      <ThaparNavbar />

      {/* HERO */}
      <HeroThapar />

      {/* WHY CAMPUS RIDE */}
      <section id="why" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            Why Campus Ride?
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Smart pooling designed for Thapar students — save time, reduce congestion,
            book faster and track rides with ease.
          </p>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-10 mt-16">

            {/* Card 1 */}
            <div className="
              bg-white p-10 rounded-2xl shadow-sm border border-gray-200
              hover:shadow-xl hover:-translate-y-1 transition-all duration-200
            ">
              <div className="w-16 h-16 mx-auto mb-5 rounded-xl bg-red-100 flex items-center justify-center">
                <img src="/icons/bus.png" className="w-10 opacity-90" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Pooling</h3>
              <p className="text-gray-600 leading-relaxed">
                Reduce campus traffic and reach classes faster with optimized pooling.
              </p>
            </div>

            {/* Card 2 */}
            <div className="
              bg-white p-10 rounded-2xl shadow-sm border border-gray-200
              hover:shadow-xl hover:-translate-y-1 transition-all duration-200
            ">
              <div className="w-16 h-16 mx-auto mb-5 rounded-xl bg-red-100 flex items-center justify-center">
                <img src="/icons/users.png" className="w-10 opacity-90" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Student Friendly</h3>
              <p className="text-gray-600 leading-relaxed">
                Built exclusively for TIET students and campus drivers.
              </p>
            </div>

            {/* Card 3 */}
            <div className="
              bg-white p-10 rounded-2xl shadow-sm border border-gray-200
              hover:shadow-xl hover:-translate-y-1 transition-all duration-200
            ">
              <div className="w-16 h-16 mx-auto mb-5 rounded-xl bg-red-100 flex items-center justify-center">
                <img src="/icons/shield.png" className="w-10 opacity-90" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe & Verified</h3>
              <p className="text-gray-600 leading-relaxed">
                Verified drivers, OTP-secured rides and real-time tracking.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-red-50 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Ready to Ride?
        </h2>

        <p className="text-gray-600 max-w-xl mx-auto mb-10">
          Join thousands of TIET students using Campus Ride every day for faster and smarter commuting.
        </p>

        <Link
          to="/auth/student"
          className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full text-lg font-semibold shadow-lg transition"
        >
          Get Started →
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t bg-white">
        © {new Date().getFullYear()} Campus Ride • Thapar Institute of Engineering & Technology
      </footer>
    </div>
  );
}
