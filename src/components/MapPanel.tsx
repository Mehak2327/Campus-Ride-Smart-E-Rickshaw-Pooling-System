import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAppStore } from '@/store/useAppStore';

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

export default function MapPanel({ height = '600px', showControls = true, filterPoolId }: MapPanelProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const polylinesRef = useRef<Map<string, L.Polyline>>(new Map());
  const stopsRef = useRef<Map<string, L.Layer[]>>(new Map());

  const hotspots = useAppStore((s) => s.hotspots);
  const allStudents = useAppStore((s) => s.students);
  const allDrivers  = useAppStore((s) => s.drivers);
  const allTrips    = useAppStore((s) => s.trips);
  const pools       = useAppStore((s) => s.pools);

  // filter by pool for student view
  const pool = filterPoolId ? pools.find(p => p.id === filterPoolId) : undefined;
  const students = filterPoolId ? allStudents.filter(st => pool?.studentIds.includes(st.id)) : allStudents;
  const drivers  = filterPoolId ? allDrivers.filter(d => d.assignedPoolId === filterPoolId || d.id === pool?.driverId) : allDrivers;
  const trips    = filterPoolId ? allTrips.filter(t => t.poolId === filterPoolId) : allTrips;

  const getPoolColors = (poolId?: string) => {
    const idx = poolId ? pools.findIndex((p) => p.id === poolId) : -1;
    if (idx === 0) return { stroke: 'hsl(var(--primary))', shadow: 'hsl(var(--primary) / 0.35)' };
    if (idx === 1) return { stroke: 'hsl(var(--secondary))', shadow: 'hsl(var(--secondary) / 0.35)' };
    return { stroke: 'hsl(var(--accent))', shadow: 'hsl(var(--accent) / 0.35)' };
  };

  // init map
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
    return () => { map.remove(); mapInstance.current = null; };
  }, [showControls]);

  // hotspots
  useEffect(() => {
    if (!mapInstance.current) return;
    hotspots.forEach((hotspot) => {
      const key = `hotspot-${hotspot.id}`;
      if (!markersRef.current.has(key)) {
        const icon = L.divIcon({
          className: 'hotspot-marker',
          html: `<div class="flex flex-col items-center">
            <div class="w-3 h-3 bg-muted rounded-full border-2 border-primary/50"></div>
            <span class="text-xs text-muted-foreground mt-1 whitespace-nowrap px-2 py-0.5 glass rounded">${hotspot.name}</span>
          </div>`,
          iconSize: [100, 40],
          iconAnchor: [50, 20],
        });
        const marker = L.marker([hotspot.lat, hotspot.lng], { icon }).addTo(mapInstance.current);
        markersRef.current.set(key, marker);
      }
    });
  }, [hotspots]);

  // students
  useEffect(() => {
    if (!mapInstance.current) return;

    // clear previous student markers
    markersRef.current.forEach((m, k) => { if (k.startsWith('student-')) { m.remove(); markersRef.current.delete(k); } });

    students.forEach((student) => {
      const hotspot = hotspots.find((h) => h.id === student.pickup);
      if (!hotspot) return;

      const key = `student-${student.id}`;
      const statusColors: Record<string, string> = {
        waiting: 'bg-warning',
        pooled: 'bg-primary',
        assigned: 'bg-primary',
        enroute: 'bg-success',
        completed: 'bg-muted',
      };
      const colors = getPoolColors(student.poolId);
      const chipBg = student.color ?? undefined;

      const icon = L.divIcon({
        className: 'student-marker',
        html: `<div class="flex flex-col items-center">
          <div class="w-8 h-8 ${chipBg ? '' : statusColors[student.status]} rounded-full border-3 shadow-xl pulse-ring flex items-center justify-center text-white font-bold text-xs"
               style="border-color:${colors.stroke}; box-shadow:0 0 0 4px ${colors.shadow}; ${chipBg ? `background:${chipBg}` : ''}">
            ${student.id.replace('s', '')}
          </div>
        </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([hotspot.lat, hotspot.lng], { icon })
        .bindPopup(`<strong>${student.name}</strong><br/>${student.roll}<br/>Status: ${student.status}`)
        .addTo(mapInstance.current!);

      markersRef.current.set(key, marker);
    });
  }, [students, hotspots]);

  // drivers + routes
  useEffect(() => {
    if (!mapInstance.current) return;

    // clear old driver markers / routes / stops
    markersRef.current.forEach((m, k) => { if (k.startsWith('driver-')) { m.remove(); markersRef.current.delete(k); } });
    polylinesRef.current.forEach((p) => p.remove());
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
          <div class="w-8 h-8 bg-secondary rounded-lg border-2 border-primary shadow-lg glow-primary flex items-center justify-center text-xs font-bold">🚗</div>
          <span class="text-xs text-primary-foreground mt-1 font-mono">${driver.plate}</span>
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
          weight: 4,
          opacity: 0.9,
        }).addTo(mapInstance.current!);
        polylinesRef.current.set(`route-${trip.id}`, polyline);

        const stops: L.Layer[] = [];
        const end = trip.route[trip.route.length - 1] as [number, number];

        if (trip.poolId === 'pool-1') {
          const amritam = [30.3545, 76.3640] as [number, number];
          const pghostel = [30.3553, 76.3719] as [number, number];
          stops.push(L.circleMarker(amritam, { radius: 6, color: colors.stroke, weight: 2, fillColor: colors.stroke, fillOpacity: 0.9 })
            .bindTooltip('Pickup: Amritam Hall', { permanent: false }).addTo(mapInstance.current!));
          stops.push(L.circleMarker(pghostel, { radius: 6, color: colors.stroke, weight: 2, fillColor: colors.stroke, fillOpacity: 0.9 })
            .bindTooltip('Pickup: PG Hostel', { permanent: false }).addTo(mapInstance.current!));
        }

        stops.push(L.circleMarker(end, { radius: 5, color: colors.stroke, weight: 2, fillColor: colors.stroke, fillOpacity: 0.9 })
          .bindTooltip('Drop', { permanent: false }).addTo(mapInstance.current!));

        stopsRef.current.set(`stops-${trip.id}`, stops);
      }
    });
  }, [drivers, trips]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden" style={{ height }}>
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40 pointer-events-none" />
    </div>
  );
}
