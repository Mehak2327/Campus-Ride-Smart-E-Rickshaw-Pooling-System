import React from "react";
import ThaparNavbar from "@/components/ThaparNavbar";
import HeroThapar from "@/components/HeroThapar";
import MapPanel from "@/components/MapPanel";

function FeatureCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="glass rounded-2xl p-6 border border-[#3A3A3A] shadow-lg">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-xl bg-[#2A2A2A] border border-[#444] flex items-center justify-center text-red-400 text-xl">
          {icon ?? "★"}
        </div>
        <div>
          <div className="font-semibold text-white">{title}</div>
          <div className="text-sm text-gray-400 mt-1">{desc}</div>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="landing-page min-h-screen bg-[#1E1B1B] text-white">


      <ThaparNavbar />

      <main>
        <HeroThapar />

        {/* Why Campus Ride */}
        <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white">Why Campus Ride?</h2>
            <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
              Smart pooling designed for Thapar students — save time, reduce
              congestion, and track rides easily.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Quick Pickup"
              desc="Fast ride matching for minimal wait time."
            />
            <FeatureCard
              title="Live Tracking"
              desc="Monitor driver location and ETA in real-time."
            />
            <FeatureCard
              title="Secure & Verified"
              desc="Each ride is protected by OTP verification."
            />
          </div>
        </section>

        {/* Map Preview */}
        <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pb-16">
          <h3 className="text-xl font-semibold text-white mb-4">
            Live Demo Map Preview
          </h3>
          <div className="glass rounded-2xl overflow-hidden border border-[#3A3A3A] shadow-xl">
            <MapPanel height="420px" showControls={false} />
          </div>
        </section>

        <footer className="border-t border-[#2A2A2A] bg-[#1A1919]">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Campus Ride — Thapar University
            </div>
            <div className="text-sm text-gray-500">
              Made with ❤️ for TIET
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
