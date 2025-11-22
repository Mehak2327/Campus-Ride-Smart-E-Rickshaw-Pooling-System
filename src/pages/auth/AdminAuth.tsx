import { useState } from "react";
import { motion } from "framer-motion";
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
      toast.error("Fill all fields");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#1E1B1B] text-white">
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 text-gray-300 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md glass rounded-2xl p-8 border border-[#3A3A3A]"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="p-4 rounded-xl bg-[#2A2A2A] border border-[#3A3A3A]">
            <Shield className="w-10 h-10 text-red-400" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center">Admin Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="admin@thapar.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#2A2A2A] border-[#444] text-white"
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#2A2A2A] border-[#444] text-white"
            />
          </div>

          <Button className="w-full bg-[#8A0000] hover:bg-[#700000] text-white rounded-full py-2">
            Login
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
