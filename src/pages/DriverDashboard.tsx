import { useAppStore } from "@/store/useAppStore";
import MapPanel from "@/components/MapPanel";
import { Button } from "@/components/ui/button";

export default function DriverDashboard() {
  const currentUser = useAppStore((state) => state.currentUser);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="w-full bg-white shadow-sm border-b p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">
          Driver Dashboard
        </h1>
        <p className="text-gray-600 text-sm">ID: {currentUser?.id}</p>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-12">

        {/* DRIVER CONTROLS */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ride Controls</h2>

          <div className="bg-white border rounded-2xl shadow-sm p-8 hover:shadow-lg transition">
            <p className="text-gray-600 mb-6">
              Update your availability to receive e-rickshaw ride requests.
            </p>

            <div className="flex gap-4">
              <Button className="bg-red-600 text-white hover:bg-red-700 shadow px-6 py-2 rounded-full">
                Set Available
              </Button>

              <Button
                variant="outline"
                className="border-gray-400 text-gray-700 hover:bg-gray-100 px-6 py-2 rounded-full"
              >
                Set Unavailable
              </Button>
            </div>
          </div>
        </section>

        {/* LIVE MAP */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Live Campus Map</h2>

          <div className="bg-white border rounded-2xl shadow-sm p-4 hover:shadow-lg transition">
            <MapPanel height="420px" />
          </div>
        </section>

      </main>
    </div>
  );
}
