import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Car, Shield } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'student',
      title: 'Student',
      description: 'Book rides, join pools, track your trip',
      icon: GraduationCap,
      gradient: 'from-primary/20 to-primary/5',
      path: '/auth/student',
    },
    {
      id: 'driver',
      title: 'Driver',
      description: 'Accept assignments, verify riders, complete trips',
      icon: Car,
      gradient: 'from-secondary/20 to-secondary/5',
      path: '/auth/driver',
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Monitor system, manage operations, view analytics',
      icon: Shield,
      gradient: 'from-success/20 to-success/5',
      path: '/auth/admin',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl font-bold mb-4 neon-text">
          Campus Ride
        </h1>
        <p className="text-xl text-muted-foreground">
          Thapar Institute of Engineering & Technology, Patiala
        </p>
        <p className="text-lg text-muted-foreground mt-2">
          Smart pooling • Real-time tracking • Secure OTP
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-semibold text-center mb-8 text-foreground">
          Who are you?
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {roles.map((role, index) => (
          <motion.button
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(role.path)}
            className={`glass-strong rounded-3xl p-8 text-left transition-all duration-300 hover:glow-primary group cursor-pointer`}
          >
            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${role.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
              <role.icon className="w-10 h-10 text-primary" />
            </div>
            
            <h3 className="text-3xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
              {role.title}
            </h3>
            
            <p className="text-muted-foreground text-lg leading-relaxed">
              {role.description}
            </p>

            <div className="mt-6 flex items-center text-primary group-hover:translate-x-2 transition-transform duration-300">
              <span className="text-sm font-semibold">Continue</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-12 text-center text-sm text-muted-foreground"
      >
        <p>Powered by smart pooling algorithms • Real-time location tracking</p>
        <p className="mt-1">Safe, efficient, and eco-friendly campus transportation</p>
      </motion.div>
    </div>
  );
}
