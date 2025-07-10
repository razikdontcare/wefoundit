import type { Route } from "./+types/laporan";
import { useState } from "react";
import Stepper from "../components/Stepper";
import StepJenisLaporan from "../components/StepJenisLaporan";
import StepFormKehilangan from "../components/StepFormKehilangan";
import StepFormPenemuan from "../components/StepFormPenemuan";
import StepFormLokasiWaktu from "../components/StepFormLokasiWaktu";
import StepFormUploadFoto from "../components/StepFormUploadFoto";
import StepFormSuccess from "../components/StepFormSuccess";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export default function Laporan() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [tipeLaporan, setTipeLaporan] = useState<"kehilangan" | "menemukan" | null>(null);

  const handlePilihTipe = (tipe: "kehilangan" | "menemukan") => {
    setTipeLaporan(tipe);
    setStep(2);
  };

  const next = () => setStep(prev => prev + 1);
  const back = () => setStep(prev => prev - 1);

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 text-white flex flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-screen-md">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-4 text-center primary-text">
          Laporkan Barang Hilang atau Ditemukan
        </h1>
        <p className="text-sm text-center mb-10 primary-text max-w-lg mx-auto">
          Sampaikan informasi barang secara detail untuk membantu proses pencarian atau pengembalian.
        </p>

        {/* Stepper */}
        <Stepper step={step} />

        {/* Content */}
        <div className="mt-8">
          {step === 1 && <StepJenisLaporan onSelect={handlePilihTipe} />}
          {step === 2 && tipeLaporan === "kehilangan" && (
            <StepFormKehilangan onNext={next} onBack={back} />
          )}
          {step === 2 && tipeLaporan === "menemukan" && (
            <StepFormPenemuan onNext={next} onBack={back} />
          )}
          {step === 3 && (
            <StepFormLokasiWaktu onNext={() => setStep(4)} onBack={() => setStep(2)} />
          )}
          {step === 4 && (
            <StepFormUploadFoto onNext={() => setStep(5)} onBack={() => setStep(3)} />
          )}
          {step === 5 && <StepFormSuccess onNext={() => navigate('/')} />}
        </div>
      </div>
    </div>
  );
}
