import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LogOut, Copy, Check, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";
import MapPanel from "@/components/MapPanel";
import { toast } from "sonner";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const {
    currentUser,
    setCurrentUser, 
    students, 
    drivers,
    pools,
    hotspots
  } = useAppStore();

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [otpCopied, setOtpCopied] = useState(false);

  useEffect(() => {
    if (!currentUser || currentUser.role !== "student") {
      setCurrentUser({ role: "student", id: "s1" });
    }
  }, []);

  const student = students.find((s) => s.id === currentUser?.id);
  const pool = student?.poolId ? pools.find((p) => p.id === student.poolId) : null;
  const members = pool ? students.filter((s) => pool.studentIds.includes(s.id)) : [];
  const driver = drivers.find((d) => d.assignedPoolId === pool?.id);

  const getStatusClass = (s: string) => "px-3 py-1 rounded-full text-xs bg-[#2A2A2A] border border-[#3A3A3A] text-gray-300";

  const copyOtp = () => {
    if (!pool?.otp) return;
    navigator.clipboard.writeText(pool.otp);
    setOtpCopied(true);
    setTimeout(() => setOtpCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#1E1B1B] text-white p-6 md:p-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-gray-400 mt-1">{student?.name} • {student?.roll}</p>
        </div>

        <Button
          variant="ghost"
          onClick={() => {
            setCurrentUser(null);
            navigate("/");
          }}
          className="text-gray-300 hover:text-white"
        >
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* REQUEST PANEL */}
        <div className="glass p-6 rounded-2xl border border-[#3A3A3A]">
          <h2 className="text-lg font-semibold mb-4">Request a Ride</h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-300 mb-1">Pickup</p>
              <Select value={pickup} onValueChange={setPickup}>
                <SelectTrigger className="bg-[#2A2A2A] border-[#444] text-gray-200">
                  <SelectValue placeholder="Select pickup" />
                </SelectTrigger>
                <SelectContent>
                  {hotspots.map((h) => (
                    <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <p className="text-sm text-gray-300 mb-1">Drop</p>
              <Select value={drop} onValueChange={setDrop}>
                <SelectTrigger className="bg-[#2A2A2A] border-[#444] text-gray-200">
                  <SelectValue placeholder="Select drop" />
                </SelectTrigger>
                <SelectContent>
                  {hotspots.map((h) => (
                    <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={() => toast.success("Ride requested!")}
              className="bg-[#8A0000] hover:bg-[#700000] text-white w-full"
            >
              Request Ride
            </Button>
          </div>
        </div>

        {/* POOL STATUS */}
        <div className="glass p-6 rounded-2xl border border-[#3A3A3A]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">My Pool</h2>
            <span className={getStatusClass(student?.status || "none")}>
              {student?.status?.toUpperCase()}
            </span>
          </div>

          {pool ? (
            <>
              <div className="glass p-4 rounded-xl border border-[#3A3A3A]">
                <p className="text-xs text-gray-400 mb-2">Group OTP</p>
                <div className="flex items-center justify-between">
                  <code className="text-2xl tracking-widest">
                    {pool.otp}
                  </code>
                  <Button
                    variant="ghost"
                    onClick={copyOtp}
                    className="text-red-300 hover:text-red-200"
                  >
                    {otpCopied ? <Check /> : <Copy />}
                  </Button>
                </div>

                {driver && (
                  <p className="mt-3 text-sm text-gray-300">
                    Driver: <span className="font-semibold text-white">{driver.name}</span>
                  </p>
                )}
              </div>

              <p className="mt-6 text-sm text-gray-400">Pool Members</p>
              <div className="space-y-2 mt-2">
                {members.map((m) => (
                  <div key={m.id} className="glass flex items-center p-3 rounded-xl border border-[#3A3A3A]">
                    <div className="w-10 h-10 rounded-full bg-[#8A0000] flex items-center justify-center text-white font-bold">
                      {m.name[0]}
                    </div>
                    <div className="ml-3">
                      <p className="text-white font-semibold">{m.name}</p>
                      <p className="text-xs text-gray-400">{m.roll}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-400">No active pool</p>
          )}
        </div>

        {/* MAP */}
        <div className="glass p-4 rounded-2xl border border-[#3A3A3A]">
          <h2 className="text-lg font-semibold mb-4">Live Tracking</h2>
          <MapPanel height="420px" filterPoolId={pool?.id} />
        </div>
      </div>
    </div>
  );
}
