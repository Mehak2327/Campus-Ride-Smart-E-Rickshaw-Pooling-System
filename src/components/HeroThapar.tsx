import React from "react";

export default function HeroThapar() {
  return (
    <header className="relative h-[90vh] flex items-center justify-start">

      <div
        className="absolute inset-0 bg-cover bg-center brightness-75"
        style={{
          backgroundImage: "url('/thapar.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-transparent" />

      <div className="relative z-10 px-10 max-w-2xl ml-6 mt-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight drop-shadow">
          Campus Ride
          <span className="block text-[#FFDADA]">Smart E-Rickshaw Pooling</span>
        </h1>

        <p className="mt-6 text-xl text-white/90 leading-relaxed">
          Smarter, safer commuting inside Thapar University.  
          Real-time tracking, OTP verification & efficient pooling.
        </p>

        {/* Aesthetic Buttons */}
        <div className="mt-10 flex gap-4">

          {/* DEMO → Admin Login */}
          <a
            href="/auth/admin"
            className="px-8 py-3 bg-white rounded-full text-[#8A0000] text-lg font-semibold shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-200"
          >
            Demo
          </a>

          <a
            href="/auth/student"
            className="px-6 py-2.5 border border-[#FFD0D0]/40 text-white rounded-full text-sm font-medium hover:bg-[#D43B3B]/20 transition-all duration-200"
          >
            Student Portal
          </a>

          <a
            href="/auth/driver"
            className="px-6 py-2.5 border border-[#FFD0D0]/40 text-white rounded-full text-sm font-medium hover:bg-[#D43B3B]/20 transition-all duration-200"
          >
            Driver Portal
          </a>

          <a
            href="/auth/admin"
            className="px-6 py-2.5 border border-[#FFD0D0]/40 text-white rounded-full text-sm font-medium hover:bg-[#D43B3B]/20 transition-all duration-200"
          >
            Admin Portal
          </a>

        </div>
      </div>
    </header>
  );
}
