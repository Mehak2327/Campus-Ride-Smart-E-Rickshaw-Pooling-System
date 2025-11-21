import React from "react";
import { NavLink } from "@/components/NavLink"; // your helper — unchanged
// If your project uses base path alias `@`, this import matches your codebase.

export default function ThaparNavbar() {
  return (
    <nav className="w-full bg-white/90 backdrop-blur sticky top-0 z-40 border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: logo + title */}
          <div className="flex items-center gap-3">
            <img
              src="/thapar-logo.png"
              alt="Thapar Logo"
              className="h-10 w-10 object-contain rounded"
            />
            <div>
              <div className="text-xl font-semibold text-[#AA0000]">Campus Ride</div>
              <div className="text-xs text-gray-500 -mt-1">Thapar University — Smart E-Rickshaw</div>
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-3">
            <NavLink
              to="/"
              className="inline-block px-4 py-2 rounded-md bg-[#AA0000] text-white font-medium shadow hover:opacity-95 transition"
              activeClassName="ring-2 ring-[#AA0000]/30"
            >
              Book a Ride
            </NavLink>

            <NavLink
              to="/auth/driver"
              className="inline-block px-3 py-2 rounded-md border border-gray-200 text-sm text-gray-700 hover:shadow-sm transition"
              activeClassName="bg-gray-100"
            >
              Driver Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
