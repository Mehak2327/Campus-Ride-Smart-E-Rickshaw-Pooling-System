import React from "react";

export default function HeroThapar() {
  return (
    <header className="relative h-[90vh] flex items-center justify-start">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-75"
        style={{
          backgroundImage: "url('/thapar.jpg')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Left-aligned content */}
      <div className="relative z-10 px-10 max-w-2xl ml-6 mt-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight drop-shadow">
          Campus Ride
          <span className="block text-[#FFDADA]">Smart E-Rickshaw Pooling</span>
        </h1>

        <p className="mt-6 text-xl text-white/90 leading-relaxed">
          A faster, safer and greener way to commute inside Thapar University.
          Track rides in real time & verify with OTP.
        </p>

        {/* Aesthetic Buttons */}
        <div className="mt-10 flex gap-4">

          {/* DEMO → Admin login */}
          <a
            href="/auth/admin"
            className="px-8 py-3 bg-white rounded-full text-[#8A0000] text-lg font-semibold shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-200"
          >
            Demo
          </a>

          <a
            href="/auth/student"
            className="px-8 py-3 border-2 border-white/70 text-white rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-200"
          >
            Student
          </a>

          <a
            href="/auth/driver"
            className="px-8 py-3 border-2 border-white/70 text-white rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-200"
          >
            Driver
          </a>

        </div>
      </div>
    </header>
  );
}
