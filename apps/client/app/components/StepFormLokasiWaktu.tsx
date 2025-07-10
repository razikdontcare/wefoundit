'use client';

import React from 'react';

interface StepFormLokasiWaktuProps {
  onBack: () => void;
  onNext: () => void;
}

const StepFormLokasiWaktu = ({onBack, onNext} : StepFormLokasiWaktuProps) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-white">

      {/* Title and Description */}
      <h3 className="text-center text-lg font-semibold mb-2">Lokasi & Waktu</h3>
      <p className="text-center text-sm mb-6">Informasikan di mana dan kapan barang terakhir terlihat atau ditemukan.</p>

      {/* Input Lokasi & Tanggal */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Lokasi"
          className="bg-white hover:bg-white w-full flex-1 px-4 py-2 rounded text-black"
        />
        <input
          type="datetime-local"
          className="bg-white hover:bg-white w-full flex-1 px-4 py-2 rounded text-gray-500"
        />
      </div>

      {/* Google Map Placeholder */}
      <div className="w-full h-60 mb-6">
        {/* Ganti src sesuai kebutuhan (API key atau komponen Google Maps) */}
        <iframe
          title="Lokasi"
          className="w-full h-full rounded"
          src="https://maps.google.com/maps?q=Birmingham&t=&z=13&ie=UTF8&iwloc=&output=embed"
        ></iframe>
      </div>

      {/* Button Selanjutnya */}
      <div className="flex justify-between gap-2">
        <button 
          onClick={onBack}
          className="bg-transparent hover:bg-blue-600  w-full text-white font-semibold py-2 px-8 rounded border border-blue-600 transition"
          >
          KEMBALI
        </button>
        <button 
          onClick={onNext}
          className="bg-blue-500 hover:bg-blue-600  w-full text-white font-semibold py-2 px-8 rounded"
          >
          SELANJUTNYA
        </button>
      </div>
    </div>
  );
};

export default StepFormLokasiWaktu;
