'use client';

import React from 'react';

const StepFormLokasiWaktu = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-white">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Laporkan Barang Hilang atau Ditemukan</h2>
        <p className="mt-2 text-sm">Sampaikan informasi barang secara detail untuk membantu proses pencarian atau pengembalian.</p>
        <div className="w-16 h-[2px] bg-white mx-auto mt-4 mb-2" />
      </div>

      {/* Stepper */}
      <div className="flex justify-center items-center space-x-4 mb-6">
        {[1, 2, 3, 4].map((step, index) => (
          <React.Fragment key={index}>
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                step <= 3 ? 'bg-blue-500 text-white' : 'bg-white text-black'
              } font-bold`}
            >
              {step}
            </div>
            {step < 4 && (
              <div className={`h-1 w-10 ${step < 3 ? 'bg-blue-500' : 'bg-white'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Title and Description */}
      <h3 className="text-center text-lg font-semibold mb-2">Lokasi & Waktu</h3>
      <p className="text-center text-sm mb-6">Informasikan di mana dan kapan barang terakhir terlihat atau ditemukan.</p>

      {/* Input Lokasi & Tanggal */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Lokasi"
          className="flex-1 px-4 py-2 rounded text-black"
        />
        <input
          type="datetime-local"
          className="flex-1 px-4 py-2 rounded text-black"
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
      <div className="text-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
          SELANJUTNYA
        </button>
      </div>
    </div>
  );
};

export default StepFormLokasiWaktu;
