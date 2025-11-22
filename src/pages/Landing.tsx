import React from "react";
import ThaparNavbar from "@/components/ThaparNavbar";
import HeroThapar from "@/components/HeroThapar";
import MapPanel from "@/components/MapPanel"; // you already have this; will continue to work. :contentReference[oaicite:4]{index=4}

function FeatureCard({ title, desc, icon }: { title: string; desc: string; icon?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-lg bg-[#AA0000]/10 flex items-center justify-center text-[#AA0000] font-bold">
          {icon ?? "R"}
        </div>
        <div>
          <div className="font-semibold text-gray-800">{title}</div>
          <div className="text-sm text-gray-500 mt-1">{desc}</div>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ThaparNavbar />
      <main>
        <HeroThapar />

        <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Why Campus Ride?</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Smart pooling built for Thapar students — save time, save money, and reduce campus traffic.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard title="Quick Pickup" desc="Fast match algorithm for minimal wait times." />
            <FeatureCard title="Real-time Tracking" desc="Live driver location and estimated arrival." />
            <FeatureCard title="Safe & Verified" desc="OTP verification for every ride." />
          </div>
        </section>

        {/* Map preview (keeps your MapPanel behavior intact; small snapshot on landing) */}
        <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pb-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Live demo map preview</h3>
          <div className="rounded-2xl overflow-hidden border">
            {/* MapPanel exists in your repo and is safe to show here. :contentReference[oaicite:5]{index=5} */}
            <MapPanel height="420px" showControls={false} />
          </div>
        </section>

        <footer className="border-t bg-white">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">© {new Date().getFullYear()} Campus Ride — Thapar University</div>
            <div className="text-sm text-gray-500">Made with ❤️ for Thapar campus</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
