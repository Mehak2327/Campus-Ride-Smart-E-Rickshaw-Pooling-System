import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/store/useAppStore";
import { toast } from "sonner";

export default function AdminAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const setCurrentUser = useAppStore((state) => state.setCurrentUser);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      setCurrentUser({ role: "admin", id: "admin1" });
      toast.success("Admin Login Successful");
      navigate("/admin");
    } else {
      toast.error("Please fill all fields");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 flex items-center gap-2 text-gray-700 hover:text-black transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* CARD */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-8 transition hover:shadow-xl">

        {/* ICON */}
        <div className="flex flex-col items-center mb-6">
          <div className="p-4 rounded-xl bg-red-100 border border-red-200 shadow-sm">
            <Shield className="w-10 h-10 text-red-600" />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Admin Portal
        </h1>
        <p className="text-center text-gray-600 mt-1 mb-6 text-sm">
          Sign in to manage the Campus Ride system
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div className="space-y-2">
            <Label className="text-gray-800">Email</Label>
            <Input
              type="email"
              placeholder="admin@tiet.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-300 focus:border-red-500"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label className="text-gray-800">Password</Label>
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-gray-300 focus:border-red-500"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            className="w-full bg-red-600 text-white rounded-full py-2 text-lg font-semibold shadow hover:bg-red-700 transition"
          >
            Sign In
          </Button>
        </form>

      </div>
    </div>
  );
}
