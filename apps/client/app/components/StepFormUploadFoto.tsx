"use client";

import React, { useState } from "react";
import imageCompression from "browser-image-compression";

interface StepFormUploadFotoProps {
  onNext: () => void;
  onBack: () => void;
  file: File | null;
  setFile: (file: File | null) => void;
}

const StepFormUploadFoto: React.FC<StepFormUploadFotoProps> = ({
  onNext,
  onBack,
  file,
  setFile,
}) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageFile = e.target.files[0];
      try {
        const compressedBlob = await imageCompression(imageFile, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1280,
          useWebWorker: true,
        });
        // Wrap the blob in a File with the original name and type
        const compressedFile = new File([compressedBlob], imageFile.name, {
          type: compressedBlob.type || imageFile.type,
        });
        setFile(compressedFile);
      } catch (err) {
        // fallback to original if compression fails
        setFile(imageFile);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 primary-text">
      {/* Judul */}
      <h3 className="text-center text-lg font-semibold mb-2">Foto</h3>
      <p className="text-center text-sm mb-6">
        Unggah gambar untuk memperkuat laporan.
      </p>

      {/* Upload Box */}
      <div className="mb-6">
        <label
          htmlFor="upload"
          className="w-full h-48 flex flex-col items-center justify-center border-2 dark:border-gray-400 border-blue-600 border-dashed rounded cursor-pointer hover:border-blue-500 transition"
        >
          <input
            id="upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="text-center dark:text-gray-400 text-blue-600">
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
          className="bg-transparent hover:bg-blue-600  w-full hover:text-white dark:text-white text-black font-semibold py-2 px-8 rounded border border-blue-600 transition"
        >
          KEMBALI
        </button>
        <button
          onClick={onNext}
          className="bg-blue-500 hover:bg-blue-600 font-semibold text-white w-full py-2 rounded"
        >
          KIRIM
        </button>
      </div>
    </div>
  );
};

export default StepFormUploadFoto;
