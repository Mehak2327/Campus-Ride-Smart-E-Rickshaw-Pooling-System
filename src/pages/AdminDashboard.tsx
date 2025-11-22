import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import MapPanel from "@/components/MapPanel";

export default function AdminDashboard() {
  const currentUser = useAppStore((state) => state.currentUser);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="w-full bg-white shadow-sm border-b p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 text-sm">ID: {currentUser?.id}</p>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-12">

        {/* ADMIN CONTROL PANEL */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Controls</h2>

          <div className="bg-white border rounded-2xl shadow-sm p-8 hover:shadow-lg transition space-y-6">

            <p className="text-gray-600">
              Use administrative controls to verify drivers, reset system data, 
              view logs, and monitor all campus ride activity.
            </p>

            <div className="flex flex-wrap gap-4">

              <Button className="bg-red-600 text-white hover:bg-red-700 shadow px-6 py-2 rounded-full">
                Verify Drivers
              </Button>

              <Button className="bg-red-600 text-white hover:bg-red-700 shadow px-6 py-2 rounded-full">
                Reset Data
              </Button>

              <Button
                variant="outline"
                className="border-gray-400 text-gray-700 hover:bg-gray-100 px-6 py-2 rounded-full"
              >
                View Ride Logs
              </Button>

              <Button
                variant="outline"
                className="border-gray-400 text-gray-700 hover:bg-gray-100 px-6 py-2 rounded-full"
              >
                Manage Users
              </Button>

            </div>
          </div>
        </section>

        {/* LIVE MAP */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Campus Activity</h2>

          <div className="bg-white border rounded-2xl shadow-sm p-4 hover:shadow-lg transition">
            <MapPanel height="420px" />
          </div>
        </section>

      </main>
    </div>
  );
}
