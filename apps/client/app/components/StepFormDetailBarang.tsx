import { useState } from "react";

interface StepFormDetailBarangProps {
  onBack: () => void;
  onNext: () => void;
  data: {
    namaBarang?: string;
    jenisBarang?: string;
    deskripsi?: string;
    jumlahBarang?: number;
  };
  setData: (data: any) => void;
}

export default function StepFormDetailBarang({
  onBack,
  onNext,
  data,
  setData,
}: StepFormDetailBarangProps) {
  const jumlahBarang = data.jumlahBarang ?? 1;

  const handleTambah = () =>
    setData({ ...data, jumlahBarang: jumlahBarang + 1 });
  const handleKurang = () => {
    if (jumlahBarang > 1) setData({ ...data, jumlahBarang: jumlahBarang - 1 });
  };

  return (
    <div className="max-w-3xl mx-auto black-text mt-8">
      <h2 className="text-center text-lg font-semibold mb-4 primary-text">
        Detail Barang
      </h2>

      <p className="text-center text-sm primary-text mb-6 py-2 px-4 rounded">
        Berikan informasi sejelas mungkin mengenai barang yang hilang atau
        ditemukan.
      </p>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Nama Barang"
          className="bg-white hover:bg-white w-full flex-1 px-4 py-2 rounded text-black"
          value={data.namaBarang || ""}
          onChange={(e) => setData({ ...data, namaBarang: e.target.value })}
        />
        <input
          type="text"
          placeholder="Jenis Barang"
          className="bg-white hover:bg-white w-full flex-1 px-4 py-2 rounded text-black"
          value={data.jenisBarang || ""}
          onChange={(e) => setData({ ...data, jenisBarang: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <textarea
          placeholder="Deskripsi"
          className="bg-white hover:bg-white w-full h-32 px-4 py-2 rounded text-black"
          value={data.deskripsi || ""}
          onChange={(e) => setData({ ...data, deskripsi: e.target.value })}
        ></textarea>
      </div>

      <div className="flex items-center justify-between sm:justify-start gap-4 mb-6">
        <label className="text-sm primary-text">Jumlah Barang</label>
        <div className="flex items-center gap-2">
          <button
            onClick={handleKurang}
            className="w-8 h-8 bg-blue-500 primary-text rounded"
          >
            -
          </button>
          <input
            type="number"
            value={jumlahBarang}
            readOnly
            className="w-12 h-8 text-center rounded primary-text"
          />
          <button
            onClick={handleTambah}
            className="w-8 h-8 bg-blue-500 primary-text rounded"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex justify-between gap-2">
        <button
          onClick={onBack}
          className="bg-transparent hover:bg-blue-600  w-full hover:text-white dark:text-white text-black font-semibold py-2 px-8 rounded border border-blue-600 transition"
        >
          KEMBALI
        </button>
        <button
          onClick={onNext}
          disabled={!data.namaBarang || !data.jenisBarang || !data.deskripsi}
          className="bg-blue-500 hover:bg-blue-600  w-full hover:text-white font-semibold py-2 px-8 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          SELANJUTNYA
        </button>
      </div>
    </div>
  );
}
