import { lazy, Suspense, useEffect, useState } from "react";

// lazy import hanya di client
const MapPicker = lazy(() => import("./MapPicker"));

export default function MapPickerWrapper({
  onLocationChange,
}: {
  onLocationChange: (loc: { lat: number; lng: number }) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Suspense fallback={<div>Loading map...</div>}>
      <MapPicker onLocationChange={onLocationChange} />
    </Suspense>
  );
}
