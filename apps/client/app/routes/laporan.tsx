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
  const handleSubmit = async () => {
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
        console.log(form);
        await axios.post("http://localhost:5000" + "/api/reports", form, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlUwNzA0MjUwMDAwMSIsImVtYWlsIjoicmlrYWR3aXV0YW1pMkBnbWFpbC5jb20iLCJuYW1lIjoiUmlrYSIsInBob3RvVVJMIjoiIiwicm9sZSI6InVzZXIiLCJhY3RpdmUiOjEsInByb3ZpZGVycyI6IltcImVtYWlsXCJdIiwiaWF0IjoxNzUyMTcxMjg2LCJleHAiOjE3NTIxNzMwODZ9.wAZjRmfaLTqtFG_fmPj6RJ-Tq1t43t1nfAifpalYHd8`,
          },
          withCredentials: true,
        });
      } else {
        await axios.post(
          "http://localhost:5000" + "/api/reports",
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
      navigate("/");
    } catch (e) {
      console.error("Error submitting report:", e);
      alert("Gagal mengirim laporan");
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
              next();
            }}
            onBack={back}
          />
        )}
        {step === 5 && <StepFormSuccess onNext={() => navigate("/")} />}
      </div>
    </div>
  );
}
