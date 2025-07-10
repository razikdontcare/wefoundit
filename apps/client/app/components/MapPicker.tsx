// MapPicker.client.tsx
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

const LocationMarker = ({
  onSelect,
}: {
  onSelect: (latlng: { lat: number; lng: number }) => void;
}) => {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelect(e.latlng);
    },
  });

  return position === null ? null : <Marker position={position} />;
};

export default function MapPicker({
  onLocationChange,
}: {
  onLocationChange: (loc: { lat: number; lng: number }) => void;
}) {
  return (
    <MapContainer center={[-8.65, 115.21]} zoom={13} className="w-full h-full">
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onSelect={onLocationChange} />
    </MapContainer>
  );
}
