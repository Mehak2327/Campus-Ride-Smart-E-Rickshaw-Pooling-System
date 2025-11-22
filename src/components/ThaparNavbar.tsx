import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

function CNavLink({
  to,
  children,
  className = "",
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        `px-5 py-1.5 rounded-full text-sm font-medium transition-all ${isActive ? "bg-[#2A2525] text-white/100 ring-1 ring-[#8A0000]" : "text-white/90 hover:bg-white/6"} ${className}`
      }
    >
      {children}
    </RouterNavLink>
  );
}

export default function ThaparNavbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#1E1B1B]/95 backdrop-blur-sm shadow-[0_6px_18px_rgba(0,0,0,0.6)]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <img
            src="/thapar-logo.png"
            alt="Thapar Logo"
            className="h-10 rounded-sm"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <div className="text-white font-semibold text-lg leading-tight">
            Campus Ride
            <div className="text-[11px] text-white/60">Thapar University — Smart E-Rickshaw</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <CNavLink to="/auth/student">Student</CNavLink>
          <CNavLink to="/auth/driver">Driver</CNavLink>
          <CNavLink to="/auth/admin">Admin</CNavLink>

          <RouterNavLink
            to="/"
            className="px-5 py-1.5 rounded-full bg-[#8A0000] text-white text-sm font-semibold shadow-sm hover:bg-[#700000] transition"
          >
            Book a Ride
          </RouterNavLink>
        </div>
      </div>
    </nav>
  );
}
