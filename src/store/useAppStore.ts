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
      // 5 students in Hostel B
      { id: 's1', name: 'Ishaan Sharma', roll: '102303795', hostel: 'Hostel B', pickup: 'hostel-b', drop: 'library', status: 'waiting' },
      { id: 's2', name: 'Mehak Arora', roll: '102303801', hostel: 'Hostel B', pickup: 'hostel-b', drop: 'library', status: 'waiting' },
      { id: 's3', name: 'Abhiram Singh', roll: '102303812', hostel: 'Hostel B', pickup: 'hostel-b', drop: 'library', status: 'waiting' },
      { id: 's4', name: 'Jyotika Mehra', roll: '102303823', hostel: 'Hostel B', pickup: 'hostel-b', drop: 'library', status: 'waiting' },
      { id: 's5', name: 'Aarav Gupta', roll: '102303834', hostel: 'Hostel B', pickup: 'hostel-b', drop: 'csed', status: 'waiting' },
      // 3 students in Hostel C
      { id: 's6', name: 'Kabir Malhotra', roll: '102303856', hostel: 'Hostel C', pickup: 'hostel-c', drop: 'csed', status: 'waiting' },
      { id: 's7', name: 'Ananya Nanda', roll: '102303867', hostel: 'Hostel C', pickup: 'hostel-c', drop: 'csed', status: 'waiting' },
      { id: 's8', name: 'Riya Verma', roll: '102303845', hostel: 'Hostel C', pickup: 'hostel-c', drop: 'csed', status: 'waiting' },
    ];

    const drivers: Driver[] = [
      { id: 'd1', name: 'Raj Kumar', plate: 'PB11-ER-4101', lat: 30.3548, lng: 76.3645, status: 'idle' }, // Near Hostel B
      { id: 'd2', name: 'Anil Verma', plate: 'PB11-ER-4102', lat: 30.3565, lng: 76.3655, status: 'idle' }, // Near Hostel C
      { id: 'd3', name: 'Surinder Pal', plate: 'PB11-ER-4103', lat: 30.3572, lng: 76.3670, status: 'idle' }, // Main Gate (idle)
    ];

    set({ students, drivers, demoStep: 'seeded' });
  },

  createPools: () => {
    const { students } = get();
    
    const pools: Pool[] = [
      {
        id: 'pool-1',
        studentIds: ['s1', 's2', 's3', 's4'], // 4 students from Hostel B to Library
        pickup: 'hostel-b',
        drop: 'library',
        otp: '123456',
        otpVerified: false,
        status: 'pending',
      },
      {
        id: 'pool-2',
        studentIds: ['s5', 's6', 's7', 's8'], // 1 from Hostel B + 3 from Hostel C to CSED
        pickup: 'hostel-c', // Start at Hostel C
        drop: 'csed',
        otp: '789012',
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
    
    // Pool 1: d1 (Hostel B driver) -> Hostel B to Library
    // Pool 2: d2 (Hostel C driver) -> Hostel C -> Hostel B -> CSED
    const poolAssignments = [
      { poolId: 'pool-1', driverId: 'd1' },
      { poolId: 'pool-2', driverId: 'd2' },
    ];

    const updatedPools = pools.map(pool => {
      const assignment = poolAssignments.find(a => a.poolId === pool.id);
      return {
        ...pool,
        driverId: assignment?.driverId,
        status: 'assigned' as const,
      };
    });

    const updatedDrivers = drivers.map(driver => {
      const assignment = poolAssignments.find(a => a.driverId === driver.id);
      if (assignment) {
        return {
          ...driver,
          status: 'assigned' as const,
          assignedPoolId: assignment.poolId,
        };
      }
      return driver; // d3 stays idle
    });

    const updatedStudents = get().students.map(s => {
      const pool = updatedPools.find(p => p.studentIds.includes(s.id));
      if (pool && pool.driverId) {
        return { ...s, status: 'assigned' as const };
      }
      return s;
    });

    // Create realistic routes following roads
    const trips: Trip[] = updatedPools.map(pool => {
      if (pool.id === 'pool-1') {
        // Hostel B to Library - following campus roads
        return {
          id: `trip-${pool.id}`,
          poolId: pool.id,
          driverId: pool.driverId!,
          route: [
            [30.3548, 76.3645], // Start at Hostel B
            [30.3552, 76.3648], // Road waypoint 1
            [30.3554, 76.3650], // Road waypoint 2
            [30.3552, 76.3652], // Road waypoint 3
            [30.3550, 76.3652], // Library
          ],
          progress: 0,
          status: 'pending',
        };
      } else {
        // Pool 2: Hostel C -> Hostel B -> CSED (multi-pickup route)
        return {
          id: `trip-${pool.id}`,
          poolId: pool.id,
          driverId: pool.driverId!,
          route: [
            [30.3565, 76.3655], // Start at Hostel C
            [30.3560, 76.3652], // Road to Hostel B waypoint 1
            [30.3555, 76.3648], // Road to Hostel B waypoint 2
            [30.3548, 76.3645], // Pick up at Hostel B
            [30.3552, 76.3646], // Road to CSED waypoint 1
            [30.3556, 76.3647], // Road to CSED waypoint 2
            [30.3560, 76.3648], // Road to CSED waypoint 3
            [30.3562, 76.3648], // CSED destination
          ],
          progress: 0,
          status: 'pending',
        };
      }
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
