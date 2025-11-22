import { Link } from "react-router-dom";
import { Bus, MapIcon, Users, ShieldCheck } from "lucide-react";
import HeroThapar from "@/components/ui/HeroThapar";
import ThaparNavbar from "@/components/ui/ThaparNavbar";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-[#1A0F0F] text-white">
      {/* Navbar */}
      <ThaparNavbar />

      {/* Hero Section */}
      <HeroThapar />

      {/* Why Campus Ride Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Why Campus Ride?
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-[#2D1616] p-8 rounded-2xl shadow-lg border border-red-900/30">
            <Bus className="w-12 h-12 text-red-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Pooling</h3>
            <p className="text-gray-300">
              Reduce congestion inside campus and reach your classes faster.
            </p>
          </div>

          <div className="bg-[#2D1616] p-8 rounded-2xl shadow-lg border border-red-900/30">
            <Users className="w-12 h-12 text-red-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Student Friendly</h3>
            <p className="text-gray-300">
              A system designed specifically for TIET students and drivers.
            </p>
          </div>

          <div className="bg-[#2D1616] p-8 rounded-2xl shadow-lg border border-red-900/30">
            <ShieldCheck className="w-12 h-12 text-red-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Safe & Verified</h3>
            <p className="text-gray-300">
              Verified drivers, safe tracking and a reliable pooling system.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center bg-[#2D1616]/50">
        <h2 className="text-4xl font-bold mb-6">Ready to Ride?</h2>
        <p className="text-gray-300 mb-10">
          Join thousands of TIET students using Campus Ride daily.
        </p>

        <Link
          to="/auth/student"
          className="px-8 py-4 bg-red-700 hover:bg-red-800 transition rounded-full text-white font-semibold"
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-400 border-t border-red-900/30">
        © {new Date().getFullYear()} Campus Ride • Thapar Institute of Engineering & Technology
      </footer>
    </div>
  );
}
