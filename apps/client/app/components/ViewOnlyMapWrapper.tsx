// ViewOnlyMapWrapper.tsx
import { useEffect, useState, lazy, Suspense } from "react";

// lazy import komponen client-only
const ViewOnlyMap = lazy(() => import("./ViewOnlyMap"));

export default function ViewOnlyMapWrapper({
  lat,
  lng,
  zoom,
}: {
  lat: number;
  lng: number;
  zoom?: number;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Suspense fallback={<div>Loading map...</div>}>
      <ViewOnlyMap lat={lat} lng={lng} zoom={zoom} />
    </Suspense>
  );
}
