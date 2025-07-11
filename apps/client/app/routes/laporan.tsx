import type { Route } from "./+types/laporan";
import { useState } from "react";
import Stepper from "../components/Stepper";
import StepJenisLaporan from "../components/StepJenisLaporan";
import StepFormDetailBarang from "~/components/StepFormDetailBarang";
import StepFormLokasiWaktu from "../components/StepFormLokasiWaktu";
import StepFormUploadFoto from "../components/StepFormUploadFoto";
import StepFormSuccess from "../components/StepFormSuccess";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "~/hooks/useSession";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export default function Laporan() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  let navigate = useNavigate();
  // Error state for user feedback
  const [error, setError] = useState<string | null>(null);
  // If user is not authenticated, redirect to login
  if (!user) {
    navigate("/auth");
    return null; // Prevent rendering the laporan component
  }
  // Collect all form data here
  const [formData, setFormData] = useState({
    tipeLaporan: null as "kehilangan" | "menemukan" | null,
    detailBarang: {
      namaBarang: "",
      jenisBarang: "",
      deskripsi: "",
      jumlahBarang: 1,
    },
    lokasiWaktu: {
      lokasi: "",
      latitude: 0,
      longitude: 0,
      waktu: "",
    },
    foto: null as File | null,
  });

  // Step 1: Pilih tipe laporan
  const handlePilihTipe = (tipe: "kehilangan" | "menemukan") => {
    setFormData((prev) => ({ ...prev, tipeLaporan: tipe }));
    setStep(2);
  };

  // Step 2: Detail barang
  const handleDetailBarang = (data: any) => {
    setFormData((prev) => ({ ...prev, detailBarang: data }));
  };

  // Step 3: Lokasi & waktu
  const handleLokasiWaktu = (data: any) => {
    setFormData((prev) => ({ ...prev, lokasiWaktu: data }));
  };

  // Step 4: Foto
  const handleFoto = (file: File | null) => {
    setFormData((prev) => ({ ...prev, foto: file }));
  };

  // Step 5: Submit
  const [createdReportId, setCreatedReportId] = useState<string | null>(null);
  const handleSubmit = async () => {
    setError(null);
    try {
      const hasFile = !!formData.foto;
      // Flatten and map formData to match Report and Barang structure
      const barang = {
        nama_barang: formData.detailBarang.namaBarang,
        jenis_barang: formData.detailBarang.jenisBarang,
        deskripsi: formData.detailBarang.deskripsi,
        jumlah: formData.detailBarang.jumlahBarang,
      };
      const laporan = {
        jenis_lap: formData.tipeLaporan,
        lokasi_nama: formData.lokasiWaktu.lokasi,
        latitude: formData.lokasiWaktu.latitude,
        longitude: formData.lokasiWaktu.longitude,
        waktu: formData.lokasiWaktu.waktu,
        status_lap: formData.tipeLaporan === "kehilangan" ? "lost" : "found",
        // foto will be handled below
      };

      let resp;
      if (hasFile) {
        const form = new FormData();
        Object.entries(barang).forEach(([key, value]) => {
          form.append(
            `barang[${key}]`,
            value !== undefined && value !== null ? String(value) : ""
          );
        });
        Object.entries(laporan).forEach(([key, value]) => {
          form.append(
            key,
            value !== undefined && value !== null ? String(value) : ""
          );
        });
        if (formData.foto) form.append("foto", formData.foto);
        resp = await axios.post(
          import.meta.env.VITE_API_URL + "/api/reports",
          form,
          {
            withCredentials: true,
          }
        );
      } else {
        resp = await axios.post(
          import.meta.env.VITE_API_URL + "/api/reports",
          {
            barang,
            ...laporan,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
      }
      setCreatedReportId(resp.data.id);
    } catch (e: any) {
      console.error("Error submitting report:", e);
      // Try to extract error message from response
      let message = "Gagal mengirim laporan. Silakan coba lagi.";
      if (e.response && e.response.data && e.response.data.message) {
        message = e.response.data.message;
      } else if (e.message) {
        message = e.message;
      }
      setError(message);
    }
  };

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 text-white flex flex-col items-center px-4 py-8">
      <h1 className="text-2xl primary-text font-bold mb-5 text-center">
        Laporkan Barang Hilang atau Ditemukan
      </h1>
      <p className="text-sm primary-text mb-14 text-center max-w-md">
        Sampaikan informasi barang secara detail untuk membantu proses pencarian
        atau pengembalian.
      </p>

      {error && (
        <div className="bg-red-500 text-white px-4 py-2 rounded mb-4 max-w-md text-center">
          {error}
        </div>
      )}

      <Stepper step={step} />

      <div className="mt-8 w-full max-w-md">
        {step === 1 && (
          <StepJenisLaporan
            onSelect={handlePilihTipe}
            value={formData.tipeLaporan}
          />
        )}
        {step === 2 && (
          <StepFormDetailBarang
            data={formData.detailBarang}
            setData={handleDetailBarang}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 3 && (
          <StepFormLokasiWaktu
            data={formData.lokasiWaktu}
            setData={handleLokasiWaktu}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 4 && (
          <StepFormUploadFoto
            file={formData.foto}
            setFile={handleFoto}
            onNext={async () => {
              await handleSubmit();
              // Only go to next step if no error
              if (!error) next();
            }}
            onBack={back}
          />
        )}
        {step === 5 && (
          <StepFormSuccess
            onNext={() => {
              if (createdReportId) {
                navigate(`/details/${createdReportId}`);
              } else {
                navigate("/");
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
