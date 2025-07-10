'use client';

import { CheckCircle2 } from 'lucide-react'; // atau kamu bisa pakai SVG sendiri

interface StepFormSuccessProps {
  onNext: () => void;
}

const StepFormSuccess = ({ onNext }: StepFormSuccessProps) => {
  return (
    <div className="max-w-2xl mx-auto px-4 text-white text-center">
      {/* Header */}
      <div className="mb-2">
        {/* <div className="w-16 h-[2px] bg-white mx-auto mb-2" /> */}
        <h2 className="text-2xl font-bold">Berhasil!</h2>
        <p className="text-sm text-gray-300 mt-1 mb-6">Laporan Kamu berhasil disimpan.</p>
      </div>

      {/* Icon Centang */}
      <div className="flex justify-center mb-8">
        <div className="text-green-400">
          <CheckCircle2 size={150} strokeWidth={2.5} />
        </div>
      </div>

      {/* Tombol Lanjut */}
      <button
        onClick={onNext}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded w-full max-w-sm mx-auto"
      >
        SELESAI
      </button>
    </div>
  );
};

export default StepFormSuccess;
