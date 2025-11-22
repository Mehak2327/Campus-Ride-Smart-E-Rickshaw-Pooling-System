import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/store/useAppStore";
import { toast } from "sonner";

export default function StudentAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");

  const navigate = useNavigate();
  const setCurrentUser = useAppStore((state) => state.setCurrentUser);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      if (email && password) {
        setCurrentUser({ role: "student", id: "s1" });
        toast.success("Logged in!");
        navigate("/student");
      } else {
        toast.error("Please fill all fields");
      }
    } else {
      if (email && password && name && roll) {
        setCurrentUser({ role: "student", id: "s1" });
        toast.success("Account created!");
        navigate("/student");
      } else {
        toast.error("Please fill all fields");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 flex items-center gap-2 text-gray-700 hover:text-black"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* CARD */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-8">
        
        {/* ICON */}
        <div className="flex flex-col items-center mb-6">
          <div className="p-4 rounded-xl bg-red-100">
            <GraduationCap className="w-10 h-10 text-red-600" />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Student Portal
        </h1>
        <p className="text-center text-gray-600 mt-1 mb-6">
          {isLogin ? "Sign in to book rides" : "Create your account"}
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {!isLogin && (
            <>
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Roll Number</Label>
                <Input
                  type="text"
                  placeholder="e.g., 102303795"
                  value={roll}
                  onChange={(e) => setRoll(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="your.email@thapar.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full py-2 mt-3"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </Button>
        </form>

        {/* TOGGLE */}
        <div className="text-center mt-6">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-gray-700 hover:text-red-600"
          >
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span className="font-semibold ml-1">
              {isLogin ? "Sign Up" : "Sign In"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
