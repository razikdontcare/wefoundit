'use client';

import React, { useState } from 'react';

interface StepFormUploadFotoProps {
  onNext: () => void;
  onBack: () => void;
}

const StepFormUploadFoto: React.FC<StepFormUploadFotoProps> = ({ onNext, onBack }: StepFormUploadFotoProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-white">
      {/* Header */}
      {/* <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Laporkan Barang Hilang atau Ditemukan</h2>
        <p className="mt-2 text-sm">
          Sampaikan informasi barang secara detail untuk membantu proses pencarian atau pengembalian.
        </p>
        <div className="w-16 h-[2px] bg-white mx-auto mt-4 mb-2" />
      </div> */}

      {/* Stepper
      <div className="flex justify-center items-center space-x-4 mb-6">
        {[1, 2, 3, 4].map((step) => (
          <React.Fragment key={step}>
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                step <= 4 ? 'bg-blue-500 text-white' : 'bg-white text-black'
              } font-bold`}
            >
              {step}
            </div>
            {step < 4 && <div className={`h-1 w-10 bg-blue-500`} />}
          </React.Fragment>
        ))}
      </div> */}

      {/* Judul */}
      <h3 className="text-center text-lg font-semibold mb-2">Foto</h3>
      <p className="text-center text-sm mb-6">Unggah gambar untuk memperkuat laporan.</p>

      {/* Upload Box */}
      <div className="mb-6">
        <label
          htmlFor="upload"
          className="w-full h-48 flex flex-col items-center justify-center border-2 border-gray-400 border-dashed rounded cursor-pointer hover:border-blue-500 transition"
        >
          <input
            id="upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="text-center text-gray-400">
            <div className="text-4xl mb-2">+</div>
            {file ? (
              <p className="text-sm text-white">{file.name}</p>
            ) : (
              <p className="text-sm">Browse File to Upload</p>
            )}
          </div>
        </label>
      </div>

      {/* Tombol Aksi */}
      <div className="flex justify-between gap-2">
        <button
          onClick={onBack}
          className="bg-transparent border border-blue-500 text-white hover:bg-blue-600 w-full py-2 rounded"
        >
          KEMBALI
        </button>
        <button
          onClick={onNext}
          className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded"
        >
          KIRIM
        </button>
      </div>
    </div>
  );
};

export default StepFormUploadFoto;
