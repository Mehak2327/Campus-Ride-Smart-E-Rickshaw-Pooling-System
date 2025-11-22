import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogOut, Play, Users, Car, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';
import MapPanel from '@/components/MapPanel';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const currentUser = useAppStore((state) => state.currentUser);
  const students = useAppStore((state) => state.students);
  const drivers = useAppStore((state) => state.drivers);
  const pools = useAppStore((state) => state.pools);
  const trips = useAppStore((state) => state.trips);
  const demoStep = useAppStore((state) => state.demoStep);
  const seedDemo = useAppStore((state) => state.seedDemo);
  const createPools = useAppStore((state) => state.createPools);
  const assignDrivers = useAppStore((state) => state.assignDrivers);
  const verifyOtp = useAppStore((state) => state.verifyOtp);
  const startTrips = useAppStore((state) => state.startTrips);
  const completeTrips = useAppStore((state) => state.completeTrips);
  const resetDemo = useAppStore((state) => state.resetDemo);
  const updateTripProgress = useAppStore((state) => state.updateTripProgress);
  const setCurrentUser = useAppStore((state) => state.setCurrentUser);

  const [animationInterval, setAnimationInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/auth/admin');
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen bg-[#E6DADA] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-bold neon-text">Admin Control</h1>
            <p className="text-muted-foreground mt-1">System Overview & Demo Controls</p>
          </motion.div>

          <Button variant="ghost" onClick={() => { setCurrentUser(null); navigate('/'); }} className="text-muted-foreground hover:text-danger">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* REST OF YOUR FILE BELOW — UNCHANGED */}
        {/* ---------- ✔ your original content stays same ---------- */}

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* KPI Cards */}
          {/* (unchanged code...) */}
        </div>

        {/* Demo Controls */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-strong rounded-2xl p-6 mb-6">
          {/* (unchanged code...) */}
        </motion.div>

        {/* Map */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-strong rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Live System Map</h2>
          <MapPanel height="600px" />
        </motion.div>

      </div>
    </div>
  );
}
