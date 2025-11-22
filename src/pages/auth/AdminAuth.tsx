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
  const setCurrentUser = useAppStore((s) => s.setCurrentUser);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      setCurrentUser({ role: "admin", id: "admin1" });
      toast.success("Admin Login Successful!");
      navigate("/admin");
    } else {
      toast.error("Please fill all fields");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-[#F5EDE7] to-[#E8D8D0]">
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md rounded-2xl p-8 shadow-xl bg-[#FAF4EF] border border-[#E0CFC7]"
      >
        {/* Icon */}
        <div className="flex flex-col items-center mb-6">
          <div className="p-4 rounded-xl bg-[#EED4CD]">
            <Shield className="w-10 h-10 text-[#8A0000]" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-900">
          Admin Portal
        </h1>
        <p className="text-center text-gray-600 mt-1 mb-8">
          Sign in to manage the system
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="admin@thapar.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#FAF4EF] border-[#D8C4BD]"
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#FAF4EF] border-[#D8C4BD]"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#8A0000] hover:bg-[#700000] text-white rounded-full py-2 text-lg"
          >
            Sign In
          </Button>
        </form>

        <p className="text-xs text-center text-gray-600 mt-6">
          For demo: Use any email and password
        </p>
      </motion.div>
    </div>
  );
}
