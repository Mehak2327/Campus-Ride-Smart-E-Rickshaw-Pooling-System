import { create } from 'zustand';

export interface Hotspot {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export interface Student {
  id: string;
  name: string;
  roll: string;
  hostel: string;
  pickup: string;
  drop: string;
  poolId?: string;
  status: 'waiting' | 'pooled' | 'assigned' | 'enroute' | 'completed';
}

export interface Driver {
  id: string;
  name: string;
  plate: string;
  lat: number;
  lng: number;
  status: 'idle' | 'assigned' | 'enroute';
  assignedPoolId?: string;
}

export interface Pool {
  id: string;
  studentIds: string[];
  pickup: string;
  drop: string;
  otp: string;
  otpVerified: boolean;
  driverId?: string;
  status: 'pending' | 'assigned' | 'verified' | 'started' | 'completed';
}

export interface Trip {
  id: string;
  poolId: string;
  driverId: string;
  route: [number, number][];
  currentPosition?: [number, number];
  progress: number;
  status: 'pending' | 'started' | 'completed';
}

interface AppState {
  currentUser: { role: 'student' | 'driver' | 'admin'; id: string } | null;
  hotspots: Hotspot[];
  students: Student[];
  drivers: Driver[];
  pools: Pool[];
  trips: Trip[];
  demoStep: 'idle' | 'seeded' | 'pooled' | 'assigned' | 'verified' | 'moving' | 'completed';
  
  setCurrentUser: (user: { role: 'student' | 'driver' | 'admin'; id: string } | null) => void;
  seedDemo: () => void;
  createPools: () => void;
  assignDrivers: () => void;
  verifyOtp: (poolId: string, code: string) => boolean;
  startTrips: () => void;
  completeTrips: () => void;
  updateTripProgress: (tripId: string, progress: number, position: [number, number]) => void;
  resetDemo: () => void;
}

const TIET_CENTER = { lat: 30.3558, lng: 76.3651 };

const initialHotspots: Hotspot[] = [
  { id: 'hostel-b', name: 'Hostel B', lat: 30.3548, lng: 76.3645 },
  { id: 'hostel-c', name: 'Hostel C', lat: 30.3565, lng: 76.3655 },
  { id: 'main-gate', name: 'Main Gate', lat: 30.3572, lng: 76.3670 },
  { id: 'acad-a', name: 'Academic Block A', lat: 30.3555, lng: 76.3660 },
  { id: 'csed', name: 'CSED Block', lat: 30.3562, lng: 76.3648 },
  { id: 'library', name: 'Library', lat: 30.3550, lng: 76.3652 },
];

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: null,
  hotspots: initialHotspots,
  students: [],
  drivers: [],
  pools: [],
  trips: [],
  demoStep: 'idle',

  setCurrentUser: (user) => set({ currentUser: user }),

  seedDemo: () => {
    const students: Student[] = [
      { id: 's1', name: 'Ishaan Sharma', roll: '102303795', hostel: 'Hostel B', pickup: 'hostel-b', drop: 'acad-a', status: 'waiting' },
      { id: 's2', name: 'Mehak Arora', roll: '102303801', hostel: 'Hostel B', pickup: 'hostel-b', drop: 'acad-a', status: 'waiting' },
      { id: 's3', name: 'Abhiram Singh', roll: '102303812', hostel: 'Hostel B', pickup: 'hostel-b', drop: 'acad-a', status: 'waiting' },
      { id: 's4', name: 'Jyotika Mehra', roll: '102303823', hostel: 'Hostel B', pickup: 'hostel-b', drop: 'acad-a', status: 'waiting' },
      { id: 's5', name: 'Aarav Gupta', roll: '102303834', hostel: 'Hostel B', pickup: 'hostel-b', drop: 'csed', status: 'waiting' },
      { id: 's6', name: 'Riya Verma', roll: '102303845', hostel: 'Hostel B', pickup: 'hostel-b', drop: 'csed', status: 'waiting' },
      { id: 's7', name: 'Kabir Malhotra', roll: '102303856', hostel: 'Hostel C', pickup: 'hostel-c', drop: 'acad-a', status: 'waiting' },
      { id: 's8', name: 'Ananya Nanda', roll: '102303867', hostel: 'Hostel C', pickup: 'hostel-c', drop: 'acad-a', status: 'waiting' },
      { id: 's9', name: 'Devansh Khurana', roll: '102303878', hostel: 'Main Gate', pickup: 'main-gate', drop: 'library', status: 'waiting' },
      { id: 's10', name: 'Saanvi Kapoor', roll: '102303889', hostel: 'Library', pickup: 'library', drop: 'hostel-b', status: 'waiting' },
    ];

    const drivers: Driver[] = [
      { id: 'd1', name: 'Raj Kumar', plate: 'PB11-ER-4101', lat: 30.3572, lng: 76.3670, status: 'idle' },
      { id: 'd2', name: 'Anil Verma', plate: 'PB11-ER-4102', lat: 30.3555, lng: 76.3660, status: 'idle' },
      { id: 'd3', name: 'Surinder Pal', plate: 'PB11-ER-4103', lat: 30.3550, lng: 76.3652, status: 'idle' },
    ];

    set({ students, drivers, demoStep: 'seeded' });
  },

  createPools: () => {
    const { students, hotspots } = get();
    
    const pools: Pool[] = [
      {
        id: 'pool-1',
        studentIds: ['s1', 's2', 's3', 's4'],
        pickup: 'hostel-b',
        drop: 'acad-a',
        otp: '123456',
        otpVerified: false,
        status: 'pending',
      },
      {
        id: 'pool-2',
        studentIds: ['s5', 's6', 's7', 's8'],
        pickup: 'hostel-b',
        drop: 'csed',
        otp: '789012',
        otpVerified: false,
        status: 'pending',
      },
      {
        id: 'pool-3',
        studentIds: ['s9', 's10'],
        pickup: 'main-gate',
        drop: 'library',
        otp: '345678',
        otpVerified: false,
        status: 'pending',
      },
    ];

    const updatedStudents = students.map(s => {
      const pool = pools.find(p => p.studentIds.includes(s.id));
      if (pool) {
        return { ...s, poolId: pool.id, status: 'pooled' as const };
      }
      return s;
    });

    set({ pools, students: updatedStudents, demoStep: 'pooled' });
  },

  assignDrivers: () => {
    const { pools, drivers, hotspots } = get();
    
    const updatedPools = pools.map((pool, index) => ({
      ...pool,
      driverId: drivers[index]?.id,
      status: 'assigned' as const,
    }));

    const updatedDrivers = drivers.map((driver, index) => {
      if (index < pools.length) {
        return {
          ...driver,
          status: 'assigned' as const,
          assignedPoolId: pools[index].id,
        };
      }
      return driver;
    });

    const updatedStudents = get().students.map(s => {
      const pool = updatedPools.find(p => p.studentIds.includes(s.id));
      if (pool && pool.driverId) {
        return { ...s, status: 'assigned' as const };
      }
      return s;
    });

    const trips: Trip[] = updatedPools.map(pool => {
      const pickup = hotspots.find(h => h.id === pool.pickup)!;
      const drop = hotspots.find(h => h.id === pool.drop)!;
      
      return {
        id: `trip-${pool.id}`,
        poolId: pool.id,
        driverId: pool.driverId!,
        route: [[pickup.lat, pickup.lng], [drop.lat, drop.lng]],
        progress: 0,
        status: 'pending',
      };
    });

    set({ 
      pools: updatedPools, 
      drivers: updatedDrivers, 
      students: updatedStudents,
      trips,
      demoStep: 'assigned' 
    });
  },

  verifyOtp: (poolId, code) => {
    const { pools } = get();
    const pool = pools.find(p => p.id === poolId);
    
    if (pool && pool.otp === code) {
      const updatedPools = pools.map(p => 
        p.id === poolId ? { ...p, otpVerified: true, status: 'verified' as const } : p
      );
      
      set({ pools: updatedPools });
      
      const allVerified = updatedPools.every(p => p.otpVerified);
      if (allVerified) {
        set({ demoStep: 'verified' });
      }
      
      return true;
    }
    
    return false;
  },

  startTrips: () => {
    const { trips, pools, drivers, students } = get();
    
    const updatedTrips = trips.map(t => ({
      ...t,
      status: 'started' as const,
      currentPosition: t.route[0],
    }));

    const updatedPools = pools.map(p => ({
      ...p,
      status: 'started' as const,
    }));

    const updatedDrivers = drivers.map(d => ({
      ...d,
      status: 'enroute' as const,
    }));

    const updatedStudents = students.map(s => ({
      ...s,
      status: 'enroute' as const,
    }));

    set({ 
      trips: updatedTrips, 
      pools: updatedPools,
      drivers: updatedDrivers,
      students: updatedStudents,
      demoStep: 'moving' 
    });
  },

  updateTripProgress: (tripId, progress, position) => {
    const { trips } = get();
    
    const updatedTrips = trips.map(t =>
      t.id === tripId ? { ...t, progress, currentPosition: position } : t
    );

    set({ trips: updatedTrips });
  },

  completeTrips: () => {
    const { trips, pools, drivers, students } = get();
    
    const updatedTrips = trips.map(t => ({
      ...t,
      status: 'completed' as const,
      progress: 1,
    }));

    const updatedPools = pools.map(p => ({
      ...p,
      status: 'completed' as const,
    }));

    const updatedDrivers = drivers.map(d => ({
      ...d,
      status: 'idle' as const,
      assignedPoolId: undefined,
    }));

    const updatedStudents = students.map(s => ({
      ...s,
      status: 'completed' as const,
    }));

    set({ 
      trips: updatedTrips, 
      pools: updatedPools,
      drivers: updatedDrivers,
      students: updatedStudents,
      demoStep: 'completed' 
    });
  },

  resetDemo: () => {
    set({
      students: [],
      drivers: [],
      pools: [],
      trips: [],
      demoStep: 'idle',
    });
  },
}));
