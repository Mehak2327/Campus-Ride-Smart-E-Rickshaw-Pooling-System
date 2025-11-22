import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LogOut, MapPin, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store/useAppStore";
import MapPanel from "@/components/MapPanel";
import { toast } from "sonner";

export default function DriverDashboard() {
  const demoStep = useAppStore((s) => s.demoStep);
  const navigate = useNavigate();
  const currentUser = useAppStore((s) => s.currentUser);
  const drivers = useAppStore((s) => s.drivers);
  const pools = useAppStore((s) => s.pools);
  const students = useAppStore((s) => s.students);
  const hotspots = useAppStore((s) => s.hotspots);

  const verifyOtp = useAppStore((s) => s.verifyOtp);
  const startTrips = useAppStore((s) => s.startTrips);
  const completeTrips = useAppStore((s) => s.completeTrips);
  const setCurrentUser = useAppStore((s) => s.setCurrentUser);

  const [otpInput, setOtpInput] = useState("");

  useEffect(() => {
    if (!currentUser || currentUser.role !== "driver") {
      setCurrentUser({ role: "driver", id: "d1" });
    }
  }, []);

  const currentDriver = drivers.find((d) => d.id === currentUser?.id);
  const assignedPool = currentDriver?.assignedPoolId
    ? pools.find((p) => p.id === currentDriver.assignedPoolId)
    : null;

  const poolMembers = assignedPool
    ? students.filter((s) => assignedPool.studentIds.includes(s.id))
    : [];

  if (demoStep === "idle") {
    return (
      <div className="p-6 text-center text-white bg-[#1E1B1B]">
        <h2 className="text-xl font-semibold">System Offline</h2>
        <p className="text-gray-400 mt-2">
          Please ask Admin to seed data to start demo.
        </p>
      </div>
    );
  }

  const handleLogout = () => {
    setCurrentUser(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#1E1B1B] text-white p-6 md:p-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">Driver Dashboard</h1>
          <p className="text-gray-400 mt-1">
            {currentDriver?.name} • {currentDriver?.plate}
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={handleLogout}
          className="text-gray-300 hover:text-white"
        >
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* ASSIGNMENT */}
        <div className="glass rounded-2xl p-6 border border-[#3A3A3A]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Current Assignment</h2>
            <span className="px-3 py-1 rounded-full text-xs bg-[#2A2A2A] border border-[#3A3A3A] text-gray-300">
              {currentDriver?.status?.toUpperCase()}
            </span>
          </div>

          {assignedPool ? (
            <div className="space-y-4">
              <div className="glass rounded-lg p-4 border border-[#3A3A3A]">
                <p className="text-sm text-gray-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-400" />
                  <span>Pickup:</span>
                  <span className="text-white font-semibold">
                    {hotspots.find((h) => h.id === assignedPool.pickup)?.name}
                  </span>
                </p>

                <p className="text-sm text-gray-300 flex items-center gap-2 mt-2">
                  <MapPin className="w-4 h-4 text-green-400" />
                  <span>Drop:</span>
                  <span className="text-white font-semibold">
                    {hotspots.find((h) => h.id === assignedPool.drop)?.name}
                  </span>
                </p>
              </div>

              {/* PASSENGERS */}
              <div>
                <p className="text-sm text-gray-400 mb-3">Passengers</p>

                <div className="space-y-2">
                  {poolMembers.map((m) => (
                    <div
                      key={m.id}
                      className="glass rounded-lg p-3 flex items-center border border-[#3A3A3A]"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#8A0000] flex items-center justify-center font-bold text-white">
                        {m.name[0]}
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold">{m.name}</p>
                        <p className="text-xs text-gray-400">{m.roll}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* OTP */}
              {!assignedPool.otpVerified ? (
                <div className="glass p-4 border border-[#3A3A3A] rounded-lg">
                  <p classname="text-sm text-gray-300 mb-2">Enter OTP</p>
                  <div className="flex gap-2">
                    <Input
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      placeholder="6-digit code"
                      className="bg-[#2A2A2A] border-[#454545] text-white"
                    />
                    <Button
                      onClick={() => {
                        if (verifyOtp(assignedPool.id, otpInput))
                          toast.success("OTP Verified");
                        else toast.error("Invalid OTP");
                      }}
                      className="bg-[#8A0000] hover:bg-[#700000]"
                    >
                      Verify
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-5 h-5" /> OTP Verified
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-400 mt-6">No assignment yet</p>
          )}
        </div>

        {/* MAP */}
        <div className="glass rounded-2xl p-6 border border-[#3A3A3A]">
          <h2 className="text-lg font-semibold mb-4">Route Preview</h2>
          <MapPanel height="420px" />
        </div>
      </div>
    </div>
  );
}
