import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogOut, MapPin, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store/useAppStore';
import MapPanel from '@/components/MapPanel';
import { toast } from 'sonner';

export default function DriverDashboard() {
  const navigate = useNavigate();
  const currentUser = useAppStore((state) => state.currentUser);

  return (
    <div className="min-h-screen bg-[#E6DADA] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-bold neon-text">Driver Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              {currentUser?.name || "Welcome back"}
            </p>
          </motion.div>

          <Button variant="ghost" onClick={() => { useAppStore.getState().setCurrentUser(null); navigate('/'); }}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* REST OF FILE (unchanged) */}
        {/* ---------------------------------------------- */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Card */}
          {/* (unchanged code...) */}

          {/* Right Card */}
          {/* (unchanged code...) */}
        </div>

      </div>
    </div>
  );
}
