import type { Route } from "./+types/laporan";
import { useState } from "react";
import Stepper from "../components/Stepper";
import StepJenisLaporan from "../components/StepJenisLaporan";
import StepFormKehilangan from "../components/StepFormKehilangan";
import StepFormPenemuan from "../components/StepFormPenemuan";
import StepFormLokasiWaktu from "../components/StepFormLokasiWaktu";
import StepKonfirmasi from "../components/StepKonfirmasi";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export default function Laporan() {
  const [step, setStep] = useState(1);
  const [tipeLaporan, setTipeLaporan] = useState<"kehilangan" | "menemukan" | null>(null);

  const handlePilihTipe = (tipe: "kehilangan" | "menemukan") => {
    setTipeLaporan(tipe);
    setStep(2);
  };

  const next = () => setStep(prev => prev + 1);
  const back = () => setStep(prev => prev - 1);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-2xl font-bold mb-2 text-center">Laporkan Barang Hilang atau Ditemukan</h1>
      <p className="text-sm text-gray-300 mb-6 text-center max-w-md">
        Sampaikan informasi barang secara detail untuk membantu proses pencarian atau pengembalian.
      </p>

      <Stepper step={step} />

      <div className="mt-8 w-full max-w-md">
        {step === 1 && <StepJenisLaporan onSelect={handlePilihTipe} />}
        {step === 2 && tipeLaporan === "kehilangan" && <StepFormKehilangan onNext={next} onBack={back} />}
        {step === 2 && tipeLaporan === "menemukan" && <StepFormPenemuan onNext={next} onBack={back} />}
        {step === 3 && <StepFormLokasiWaktu />}
        {/* Langkah 4 misal bisa diisi "Selesai" */}
      </div>
    </div>
  );
}
