import { useState } from "react";

interface StepFormKehilanganProps {
  onBack: () => void;
  onNext: () => void;
}

export default function StepFormKehilangan({ onBack, onNext }: StepFormKehilanganProps) {
  const [jumlahBarang, setJumlahBarang] = useState(1);

  const handleTambah = () => setJumlahBarang((prev) => prev + 1);
  const handleKurang = () => {
    if (jumlahBarang > 1) setJumlahBarang((prev) => prev - 1);
  };

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8 max-w-4xl mx-auto text-black dark:text-white">
      <h2 className="text-center text-xl font-semibold mb-4">Detail Barang</h2>

      <p className="text-center text-sm text-gray-700 dark:text-gray-300 mb-6 py-2 px-4 rounded">
        Berikan informasi sejelas mungkin mengenai barang yang hilang atau ditemukan.
      </p>

      {/* Nama dan Jenis Barang */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Nama Barang"
          className="bg-white w-full px-4 py-2 rounded text-black"
        />
        <input
          type="text"
          placeholder="Jenis Barang"
          className="bg-white w-full px-4 py-2 rounded text-black"
        />
      </div>

      {/* Deskripsi */}
      <div className="mb-4">
        <textarea
          placeholder="Deskripsi"
          className="bg-white w-full h-32 px-4 py-2 rounded text-black"
        ></textarea>
      </div>

      {/* Jumlah Barang */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-6">
        <label className="text-sm mb-2 sm:mb-0">Jumlah Barang</label>
        <div className="flex items-center gap-2">
          <button
            onClick={handleKurang}
            className="w-8 h-8 bg-blue-500 text-white rounded"
          >
            -
          </button>
          <input
            type="number"
            value={jumlahBarang}
            readOnly
            className="w-12 h-8 text-center rounded bg-transparent border dark:border-gray-300 border-blue-600 primary-text"
          />
          <button
            onClick={handleTambah}
            className="w-8 h-8 bg-blue-500 text-white rounded"
          >
            +
          </button>
        </div>
      </div>

      {/* Navigasi Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onBack}
          className="bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-2 px-6 rounded transition w-full"
        >
          KEMBALI
        </button>
        <button
          onClick={onNext}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded transition w-full"
        >
          SELANJUTNYA
        </button>
      </div>
    </div>
  );
}
