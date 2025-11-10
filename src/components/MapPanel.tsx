Here’s the **complete** `src/components/MapPanel.tsx` file—drop this in as-is:

```tsx
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAppStore } from '@/store/useAppStore';

// Fix Leaflet default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapPanelProps {
  height?: string;
  showControls?: boolean;
  /** Show only this pool's students/driver/trip on map */
  filterPoolId?: string;
}

/** Fixed pool colors (consistent on any theme) */
const POOL_COLOR: Record<string, string> = {
  'pool-red':   '#ef4444', // Agira → E Block
  'pool-blue':  '#3b82f6', // Prithvi + Agira leftover → Auditorium
  'pool-green': '#22c55e', // Neeram → TAN
};
const getPoolColors = (poolId?: string) => {
  const stroke = (poolId && POOL_COLOR[poolId]) || '#64748b'; // slate fallback
  const shadow = `${stroke}55`; // ~33% alpha
  return { stroke, shadow };
};
const studentFill = (status: string, poolId?: string, manual?: string) => {
  if (status === 'waiting') return '#94a3b8'; // grey before pooling
  return manual || getPoolColors(poolId).stroke;
};

export default function MapPanel({ height = '600px', showControls = true, filterPoolId }: MapPanelProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const polylinesRef = useRef<Map<string, L.Polyline>>(new Map());
  const stopsRef = useRef<Map<string, L.Layer[]>>(new Map());

  const hotspots   = useAppStore((s) => s.hotspots);
  const allStudents= useAppStore((s) => s.students);
  const allDrivers = useAppStore((s) => s.drivers);
  const allTrips   = useAppStore((s) => s.trips);
  const pools      = useAppStore((s) => s.pools);

  // Optional pool-level filtering (useful for student screen)
  const pool = filterPoolId ? pools.find(p => p.id === filterPoolId) : undefined;
  const students = filterPoolId ? allStudents.filter(st => pool?.studentIds.includes(st.id)) : allStudents;
  const drivers  = filterPoolId ? allDrivers.filter(d => d.assignedPoolId === filterPoolId || d.id === pool?.driverId) : allDrivers;
  const trips    = filterPoolId ? allTrips.filter(t => t.poolId === filterPoolId) : allTrips;

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    const map = L.map(mapContainer.current, {
      center: [30.3558, 76.3651],
      zoom: 15,
      zoomControl: showControls,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      className: 'map-tiles',
    }).addTo(map);

    mapInstance.current = map;

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [showControls]);

  // Hotspots: hide dots, keep labels
  useEffect(() => {
    if (!mapInstance.current) return;

    hotspots.forEach((hotspot) => {
      const key = `hotspot-${hotspot.id}`;

      if (!markersRef.current.has(key)) {
        const icon = L.divIcon({
          className: 'hotspot-marker',
          html: `<div class="flex flex-col items-center">
            <div style="width:6px;height:6px;border-radius:9999px;background:#0000"></div>
            <span class="text-xs text-muted-foreground mt-1 whitespace-nowrap px-2 py-0.5 glass rounded">${hotspot.name}</span>
          </div>`,
          iconSize: [100, 40],
          iconAnchor: [50, 20],
        });

        const marker = L.marker([hotspot.lat, hotspot.lng], { icon }).addTo(mapInstance.current!);
        markersRef.current.set(key, marker);
      }
    });
  }, [hotspots]);

  // Students: dots recolor by pool; "sit in auto" while trip is moving; appear at drop when completed
  useEffect(() => {
    if (!mapInstance.current) return;

    // Remove old student markers
    markersRef.current.forEach((marker, key) => {
      if (key.startsWith('student-')) {
        marker.remove();
        markersRef.current.delete(key);
      }
    });

    // Helper: compute student's current position
    const locateStudent = (student: typeof students[number]) => {
      const pool = student.poolId ? pools.find(p => p.id === student.poolId) : undefined;
      const trip = pool ? trips.find(t => t.poolId === pool.id) : undefined;

      // If moving: follow the driver's currentPosition
      if (pool && (pool.status === 'started' || student.status === 'enroute') && trip?.currentPosition) {
        return trip.currentPosition as [number, number];
      }

      // If completed: show at drop (or could hide by returning undefined)
      if (pool && (pool.status === 'completed' || student.status === 'completed')) {
        const dropHot = hotspots.find(h => h.id === pool.drop);
        if (dropHot) return [dropHot.lat, dropHot.lng] as [number, number];
      }

      // Default: show at pickup hotspot
      const pickHot = hotspots.find(h => h.id === student.pickup);
      return pickHot ? [pickHot.lat, pickHot.lng] as [number, number] : undefined;
    };

    students.forEach((student) => {
      const pos = locateStudent(student);
      if (!pos) return;

      const fill = studentFill(student.status, student.poolId, student.color);
      const { shadow } = getPoolColors(student.poolId);

      const icon = L.divIcon({
        className: 'student-marker',
        html: `<div class="flex flex-col items-center">
          <div class="w-7 h-7 rounded-full border-4 flex items-center justify-center text-white font-bold text-[10px]"
               style="background:${fill}; border-color:${shadow}; box-shadow:0 0 0 8px ${shadow};">
            ${student.id.replace('s','')}
          </div>
        </div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker(pos, { icon })
        .bindPopup(`<strong>${student.name}</strong><br/>${student.roll}<br/>Status: ${student.status}`)
        .addTo(mapInstance.current!);

      markersRef.current.set(`student-${student.id}`, marker);
    });
  }, [students, hotspots, pools, trips]);

  // Drivers + routes
  useEffect(() => {
    if (!mapInstance.current) return;

    // Clear old driver markers
    markersRef.current.forEach((marker, key) => {
      if (key.startsWith('driver-')) {
        marker.remove();
        markersRef.current.delete(key);
      }
    });

    // Clear old routes and stops
    polylinesRef.current.forEach((polyline) => polyline.remove());
    polylinesRef.current.clear();
    stopsRef.current.forEach((layers) => layers.forEach((l) => l.remove()));
    stopsRef.current.clear();

    drivers.forEach((driver) => {
      const key = `driver-${driver.id}`;
      const trip = trips.find((t) => t.driverId === driver.id);
      const position = (trip?.currentPosition || [driver.lat, driver.lng]) as [number, number];

      const icon = L.divIcon({
        className: 'driver-marker',
        html: `<div class="flex flex-col items-center">
          <div class="w-8 h-8 rounded-lg border-2 shadow-lg flex items-center justify-center text-xs font-bold"
               style="background:#111827; color:#fff; border-color:#6b7280">🚗</div>
          <span class="text-xs mt-1 font-mono" style="color:#9ca3af">${driver.plate}</span>
        </div>`,
        iconSize: [80, 50],
        iconAnchor: [40, 25],
      });

      const marker = L.marker(position, { icon })
        .bindPopup(`<strong>${driver.name}</strong><br/>${driver.plate}<br/>Status: ${driver.status}`)
        .addTo(mapInstance.current!);
      markersRef.current.set(key, marker);

      if (trip && trip.route.length > 0) {
        const colors = getPoolColors(trip.poolId);

        const polyline = L.polyline(trip.route as [number, number][], {
          color: colors.stroke,
          weight: 5,
          opacity: 0.95,
        }).addTo(mapInstance.current!);
        polylinesRef.current.set(`route-${trip.id}`, polyline);

        // Mark pickups + drop clearly
        const stops: L.Layer[] = [];
        const addStop = (pt: [number, number], label: string) => {
          const s = L.circleMarker(pt, {
            radius: 6, color: colors.stroke, weight: 2, fillColor: colors.stroke, fillOpacity: 0.95,
          }).bindTooltip(label, { permanent: false });
          s.addTo(mapInstance.current!);
          stops.push(s);
        };

        if (trip.poolId === 'pool-red') {
          addStop([30.351606, 76.364327], 'Pickup: Agira (4)');
        } else if (trip.poolId === 'pool-blue') {
          addStop([30.351227, 76.360978], 'Pickup: Prithvi (3)');
          addStop([30.351606, 76.364327], 'Pickup: Agira (1)');
        } else if (trip.poolId === 'pool-green') {
          addStop([30.351148, 76.359893], 'Pickup: Neeram (4)');
        }

        const end = trip.route[trip.route.length - 1] as [number, number];
        addStop(end, 'Drop');

        stopsRef.current.set(`stops-${trip.id}`, stops);
      }
    });
  }, [drivers, trips]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden" style={{ height }}>
      <div ref={mapContainer} className="absolute inset-0" />
      {/* Soft overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40 pointer-events-none" />
    </div>
  );
}
```
