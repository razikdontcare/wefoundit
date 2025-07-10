"use client";

import MapPickerWrapper from "./MapPickerWrapper";

interface StepFormLokasiWaktuProps {
  onBack: () => void;
  onNext: () => void;
  data: {
    lokasi?: string;
    waktu?: string;
    latitude?: number;
    longitude?: number;
  };
  setData: (data: any) => void;
}

const StepFormLokasiWaktu = ({
  onBack,
  onNext,
  data,
  setData,
}: StepFormLokasiWaktuProps) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 primary-text">
      {/* Title and Description */}
      <h3 className="text-center text-lg font-semibold mb-2">Lokasi & Waktu</h3>
      <p className="text-center text-sm mb-6">
        Informasikan di mana dan kapan barang terakhir terlihat atau ditemukan.
      </p>

      {/* Input Lokasi & Tanggal */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Lokasi"
          className="bg-white hover:bg-white w-full flex-1 px-4 py-2 rounded text-black"
          value={data.lokasi || ""}
          onChange={(e) => setData({ ...data, lokasi: e.target.value })}
        />
        <input
          type="datetime-local"
          className="bg-white hover:bg-white w-full flex-1 px-4 py-2 rounded text-gray-500"
          value={data.waktu || ""}
          onChange={(e) => setData({ ...data, waktu: e.target.value })}
        />
      </div>

      {/* Google Map Placeholder */}
      <div className="w-full h-60 mb-6">
        <MapPickerWrapper
          onLocationChange={(location) =>
            setData({
              ...data,
              latitude: location.lat,
              longitude: location.lng,
            })
          }
        />
      </div>

      {/* Button Selanjutnya */}
      <div className="flex justify-between gap-2">
        <button
          onClick={onBack}
          className="cursor-pointer bg-transparent hover:bg-blue-600  w-full hover:text-white dark:text-white text-black font-semibold py-2 px-8 rounded border border-blue-600 transition"
        >
          KEMBALI
        </button>
        <button
          onClick={onNext}
          disabled={
            !data.lokasi || !data.waktu || !data.latitude || !data.longitude
          }
          className="cursor-pointer bg-blue-500 hover:bg-blue-600  text-white w-full hover:text-white font-semibold py-2 px-8 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          SELANJUTNYA
        </button>
      </div>
    </div>
  );
};

export default StepFormLokasiWaktu;
