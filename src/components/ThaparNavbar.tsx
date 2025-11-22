

import React from "react";
import { NavLink } from "@/components/NavLink";

export default function ThaparNavbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#8A0000]/90 backdrop-blur-lg shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <img
            src="/thapar-logo.png"
            alt="Thapar Logo"
            className="h-10 rounded shadow-sm"
          />
          <div className="text-white font-semibold text-lg leading-tight">
            Campus Ride
            <div className="text-[11px] text-white/70">
              Thapar University — Smart E-Rickshaw
            </div>
          </div>
        </div>

        {/* Aesthetic Buttons */}
        <div className="flex items-center gap-3">

          {/* Student Portal */}
          <NavLink
            to="/auth/student"
            className="px-5 py-1.5 rounded-full border border-white/50 text-white text-sm font-medium hover:bg-white/10 transition-all"
          >
            Student
          </NavLink>

          {/* Driver Portal */}
          <NavLink
            to="/auth/driver"
            className="px-5 py-1.5 rounded-full border border-white/50 text-white text-sm font-medium hover:bg-white/10 transition-all"
          >
            Driver
          </NavLink>

          {/* Admin Portal */}
          <NavLink
            to="/auth/admin"
            className="px-5 py-1.5 rounded-full border border-white/50 text-white text-sm font-medium hover:bg-white/10 transition-all"
          >
            Admin
          </NavLink>

          {/* ❌ DEMO REMOVED COMPLETELY ❌ */}
        </div>
      </div>
    </nav>
  );
}
