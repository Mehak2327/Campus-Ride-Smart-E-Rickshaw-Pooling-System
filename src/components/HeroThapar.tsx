import React from "react";

export default function HeroThapar() {
  return (
    <header className="relative h-[72vh] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(26,26,26,0.28), rgba(26,26,26,0.55)), url('/thapar-campus-hero.jpg')",
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight drop-shadow">
            Campus Ride — Smart E-Rickshaw Pooling
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-white/85">
            Faster, safer and greener rides inside Thapar University. Pool with classmates, track rides in real time and verify with OTP.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              id="book"
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#AA0000] text-white rounded-md font-semibold shadow hover:translate-y-0.5 transform transition"
            >
              Book a Ride
            </a>

            <a
              href="/auth/student"
              className="inline-flex items-center gap-2 px-4 py-3 border border-white/30 rounded-md text-white/90 hover:bg-white/5 transition"
            >
              Student Login
            </a>
          </div>

          <div className="mt-8 text-sm text-white/80">
            <strong>Note:</strong> UI-only upgrade. Backend routes and demo flows remain identical.
          </div>
        </div>
      </div>

      {/* Accent card */}
      <div className="absolute right-8 bottom-8 z-20">
        <div className="w-64 bg-white/95 rounded-2xl p-4 shadow-lg text-gray-800">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-[#AA0000]/10 flex items-center justify-center text-[#AA0000] font-bold">TI</div>
            <div>
              <div className="text-sm font-semibold">Next Pickup</div>
              <div className="text-xs text-gray-500">Gate 3 · 2 min away</div>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-600">
            Pool with up to <b>4</b> students · Live GPS tracking · OTP verification
          </div>
        </div>
      </div>
    </header>
  );
}
