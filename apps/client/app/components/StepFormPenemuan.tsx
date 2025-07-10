import { useState } from "react";

interface StepFormPenemuanProps {
  onBack: () => void;
  onNext: () => void;
}

export default function StepFormKehilangan({onBack, onNext}: StepFormPenemuanProps) {
  const [jumlahBarang, setJumlahBarang] = useState(1);

  const handleTambah = () => setJumlahBarang((prev) => prev + 1);
  const handleKurang = () => {
    if (jumlahBarang > 1) setJumlahBarang((prev) => prev - 1);
  };

  return (
    <div className="max-w-3xl mx-auto text-white mt-8">
      <h2 className="text-center text-lg font-semibold mb-4">Detail Barang</h2>

      <p className="text-center text-sm text-gray-300 mb-6 py-2 px-4 rounded">
        Berikan informasi sejelas mungkin mengenai barang yang hilang atau ditemukan.
      </p>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Nama Barang"
          className="bg-white hover:bg-white w-full flex-1 px-4 py-2 rounded text-black"
        />
        <input
          type="text"
          placeholder="Jenis Barang"
          className="bg-white hover:bg-white w-full flex-1 px-4 py-2 rounded text-black"
        />
      </div>

      <div className="mb-4">
        <textarea
          placeholder="Deskripsi"
          className="bg-white hover:bg-white w-full h-32 px-4 py-2 rounded text-black"
        ></textarea>
      </div>

      <div className="flex items-center justify-between sm:justify-start gap-4 mb-6">
        <label className="text-sm text-gray-300">Jumlah Barang</label>
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
            className="w-12 h-8 text-center rounded text-white"
          />
          <button
            onClick={handleTambah}
            className="w-8 h-8 bg-blue-500 text-white rounded"
          >
            +
          </button>
        </div>
      </div>

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
}
