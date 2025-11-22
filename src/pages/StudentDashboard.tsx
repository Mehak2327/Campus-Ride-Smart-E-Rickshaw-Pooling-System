import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import MapPanel from "@/components/MapPanel";

export default function StudentDashboard() {
  const currentUser = useAppStore((state) => state.currentUser);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="w-full bg-white border-b shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          Welcome, Student
        </h1>

        <div className="text-gray-600 text-sm">
          ID: {currentUser?.id}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">

        {/* ACTIONS */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Book a Ride</h2>

          <div className="bg-white border rounded-xl shadow p-6 space-y-4">
            <p className="text-gray-700">
              Enter your destination and request an e-rickshaw ride.
            </p>

            <Button className="bg-red-600 text-white hover:bg-red-700">
              Request Ride
            </Button>
          </div>
        </section>

        {/* MAP SECTION */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Live Campus Map</h2>

          <div className="bg-white border rounded-xl shadow p-4">
            <MapPanel height="420px" />
          </div>
        </section>

      </main>
    </div>
  );
}
