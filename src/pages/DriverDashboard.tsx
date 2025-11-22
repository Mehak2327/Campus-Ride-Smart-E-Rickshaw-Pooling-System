import { useAppStore } from "@/store/useAppStore";
import MapPanel from "@/components/MapPanel";
import { Button } from "@/components/ui/button";

export default function DriverDashboard() {
  const currentUser = useAppStore((state) => state.currentUser);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="w-full bg-white border-b shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          Welcome, Driver
        </h1>

        <div className="text-gray-600 text-sm">
          ID: {currentUser?.id}
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">

        {/* STATUS SECTION */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Ride Controls</h2>

          <div className="bg-white border rounded-xl shadow p-6 space-y-4">
            <p className="text-gray-700">
              Manage your availability and accept upcoming ride requests.
            </p>

            <div className="flex gap-4">
              <Button className="bg-red-600 text-white hover:bg-red-700">
                Set Available
              </Button>

              <Button variant="outline" className="border-gray-400 text-gray-700 hover:bg-gray-100">
                Set Unavailable
              </Button>
            </div>
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
