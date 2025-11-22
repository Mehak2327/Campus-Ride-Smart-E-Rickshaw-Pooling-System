import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import MapPanel from "@/components/MapPanel";

export default function AdminDashboard() {
  const currentUser = useAppStore((state) => state.currentUser);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="w-full bg-white border-b shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          Admin Dashboard
        </h1>

        <div className="text-gray-600 text-sm">
          ID: {currentUser?.id}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">

        {/* Controls Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Admin Controls</h2>

          <div className="bg-white border rounded-xl shadow p-6 space-y-6">

            <p className="text-gray-700">
              Manage system actions like verifying drivers, viewing ride stats, resetting data, and monitoring campus activity.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-red-600 text-white hover:bg-red-700">
                Verify Drivers
              </Button>

              <Button className="bg-red-600 text-white hover:bg-red-700">
                Reset Data
              </Button>

              <Button variant="outline" className="border-gray-400 text-gray-700 hover:bg-gray-100">
                View Ride Logs
              </Button>

              <Button variant="outline" className="border-gray-400 text-gray-700 hover:bg-gray-100">
                Manage Users
              </Button>
            </div>
          </div>
        </section>

        {/* MAP SECTION */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Campus Activity</h2>

          <div className="bg-white border rounded-xl shadow p-4">
            <MapPanel height="420px" />
          </div>
        </section>
      </main>
    </div>
  );
}
