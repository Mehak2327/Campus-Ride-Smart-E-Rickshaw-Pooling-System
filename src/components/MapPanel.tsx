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
}

export default function MapPanel({ height = '600px', showControls = true }: MapPanelProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const polylinesRef = useRef<Map<string, L.Polyline>>(new Map());

  const hotspots = useAppStore((state) => state.hotspots);
  const students = useAppStore((state) => state.students);
  const drivers = useAppStore((state) => state.drivers);
  const trips = useAppStore((state) => state.trips);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    const map = L.map(mapContainer.current, {
      center: [30.3558, 76.3651], // TIET
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

  // Update hotspot markers
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

  // Update student markers
  useEffect(() => {
    if (!mapInstance.current) return;

    // Remove old student markers
    markersRef.current.forEach((marker, key) => {
      if (key.startsWith('student-')) {
        marker.remove();
        markersRef.current.delete(key);
      }
    });

    students.forEach((student) => {
      const hotspot = hotspots.find((h) => h.id === student.pickup);
      if (!hotspot) return;

      const key = `student-${student.id}`;
      const statusColors = {
        waiting: 'bg-warning',
        pooled: 'bg-primary',
        assigned: 'bg-primary',
        enroute: 'bg-success',
        completed: 'bg-muted',
      };

      const icon = L.divIcon({
        className: 'student-marker',
        html: `<div class="w-6 h-6 ${statusColors[student.status]} rounded-full border-2 border-background shadow-lg pulse-ring"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([hotspot.lat + (Math.random() - 0.5) * 0.0005, hotspot.lng + (Math.random() - 0.5) * 0.0005], { icon })
        .bindPopup(`<strong>${student.name}</strong><br/>${student.roll}<br/>Status: ${student.status}`)
        .addTo(mapInstance.current!);
      
      markersRef.current.set(key, marker);
    });
  }, [students, hotspots]);

  // Update driver markers and trip routes
  useEffect(() => {
    if (!mapInstance.current) return;

    // Remove old driver markers and routes
    markersRef.current.forEach((marker, key) => {
      if (key.startsWith('driver-')) {
        marker.remove();
        markersRef.current.delete(key);
      }
    });

    polylinesRef.current.forEach((polyline, key) => {
      polyline.remove();
      polylinesRef.current.delete(key);
    });

    drivers.forEach((driver) => {
      const key = `driver-${driver.id}`;
      
      // Find if this driver has an active trip
      const trip = trips.find(t => t.driverId === driver.id);
      const position = trip?.currentPosition || [driver.lat, driver.lng];

      const icon = L.divIcon({
        className: 'driver-marker',
        html: `<div class="flex flex-col items-center">
          <div class="w-8 h-8 bg-secondary rounded-lg border-2 border-primary shadow-lg glow-primary flex items-center justify-center text-xs font-bold">
            🚗
          </div>
          <span class="text-xs text-primary-foreground mt-1 font-mono">${driver.plate}</span>
        </div>`,
        iconSize: [80, 50],
        iconAnchor: [40, 25],
      });

      const marker = L.marker(position as [number, number], { icon })
        .bindPopup(`<strong>${driver.name}</strong><br/>${driver.plate}<br/>Status: ${driver.status}`)
        .addTo(mapInstance.current!);
      
      markersRef.current.set(key, marker);

      // Draw route if trip exists
      if (trip && trip.route.length > 0) {
        const polyline = L.polyline(trip.route as [number, number][], {
          color: '#14F4C5',
          weight: 3,
          opacity: 0.7,
          dashArray: '10, 10',
        }).addTo(mapInstance.current!);
        
        polylinesRef.current.set(`route-${trip.id}`, polyline);
      }
    });
  }, [drivers, trips]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden" style={{ height }}>
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Dark overlay for styling */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40 pointer-events-none" />
    </div>
  );
}
