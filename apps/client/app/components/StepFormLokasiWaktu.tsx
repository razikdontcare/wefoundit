'use client';

import React from 'react';

interface StepFormLokasiWaktuProps {
  onBack: () => void;
  onNext: () => void;
}

const StepFormLokasiWaktu = ({ onBack, onNext }: StepFormLokasiWaktuProps) => {
  return (
    <div className="flex flex-col w-full py-8 sm:px-6 lg:px-8 text-black dark:text-white">
      {/* Title and Description */}
      <h3 className="text-center text-xl font-semibold mb-2">Lokasi & Waktu</h3>
      <p className="text-center text-sm text-gray-700 dark:text-gray-300 mb-6">
        Informasikan di mana dan kapan barang terakhir terlihat atau ditemukan.
      </p>

      {/* Input Lokasi & Tanggal */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Lokasi"
          className="bg-white w-full px-4 py-2 rounded text-black"
        />
        <input
          type="datetime-local"
          placeholder="Tanggal & Waktu"
          className="bg-white w-full px-4 py-2 rounded text-gray-500"
        />
      </div>

      {/* Google Map Placeholder */}
      <div className="w-full h-60 mb-6">
        <iframe
          title="Lokasi"
          className="w-full h-full rounded"
          src="https://maps.google.com/maps?q=Birmingham&t=&z=13&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
        ></iframe>
      </div>

      {/* Button Navigation */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <button
          onClick={onBack}
          className="w-full sm:w-1/2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-2 px-6 rounded transition"
        >
          KEMBALI
        </button>
        <button
          onClick={onNext}
          className="w-full sm:w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded transition"
        >
          SELANJUTNYA
        </button>
      </div>
    </div>
  );
};

export default StepFormLokasiWaktu;
