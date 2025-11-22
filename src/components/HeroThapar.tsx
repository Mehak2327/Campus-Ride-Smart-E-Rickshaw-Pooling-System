import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroThapar() {
  return (
    <section className="pt-32 pb-24 bg-[#1E1B1B] text-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* HERO TEXT */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-white">
              Smart E-Rickshaw Pooling
              <span className="block text-red-400 mt-2">for Thapar Campus</span>
            </h1>

            <p className="mt-6 text-gray-300 max-w-md text-lg">
              Book, track, and ride effortlessly. Designed exclusively for TIET
              students to make campus commuting smoother and faster.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                to="/auth/student"
                className="px-6 py-3 rounded-full bg-[#8A0000] hover:bg-[#700000] text-white font-semibold flex items-center gap-2 shadow-lg"
              >
                Book a Ride
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="#features"
                className="px-6 py-3 rounded-full bg-[#2A2A2A] hover:bg-[#383838] text-gray-200 border border-[#3A3A3A]"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="mt-6 lg:mt-0">
            <img
              src="/hero-rickshaw.png"
              alt="Campus Ride Rickshaw"
              className="w-full rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
