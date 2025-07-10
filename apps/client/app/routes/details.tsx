import type { Route } from "./+types/details";
import { StepBack, Undo2 } from "lucide-react";
import { XCircle } from "lucide-react";
import { CircleCheckBig } from "lucide-react";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export default function Details({ params }: { params: { id: string } }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="rounded-lg container mx-auto max-w-7xl flex-col justify-center items-center my-10 gap-4 box-primary py-4 px-4">
        <div className="flex justify-between items-center w-full rounded-md px-4 py-2">
          <Undo2 onClick={() => navigate(-1)} className="cursor-pointer" />
          <span className="min-w-[100px] flex flex-row justify-between items-center alert alert-danger text-white px-2 py-2 rounded-md text-xs font-bold gap-2">
            <XCircle className="text-red-500" />
            Belum Ditemukan
            {/* if (status === "found") {
                        <XCircle className="text-red-500" />
                        Belum Diklaim
                    }
                    else if (status === "lost") {
                        <XCircle className="text-red-500" />
                        Belum Ditemukan
                    }
                    else if (status === "founded") {
                        <CircleCheckBig className="text-green-500"/>
                        Sudah Diklaim
                    }
                    else if (status === "claimed") {
                        <CircleCheckBig className="text-gray-500" />
                        Sudah Ditemukan
                    } */}
          </span>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 px-4 py-2">
          <div className="rounded-2xl w-full lg:w-[45%] min-h-[20rem] border border-gray-300">
            <div className="relative aspect-[14/18] overflow-hidden rounded-2xl">
              <img
                src="https://picsum.photos/640/360"
                alt="foto"
                className="absolute w-full aspect-[14/18] object-cover object-center inset-0"
              />
            </div>
          </div>
          <div className="flex flex-col items-start rounded-2xl w-full lg:w-[55%] border border-gray-300 p-4 mt-4 lg:mt-0">
            <span className="px-2 py-1  alert alert-info rounded-md font-bold text-sm  ">
              Handphone
            </span>
            <h1 className="text-2xl font-bold py-2">MiawPhone 7</h1>
            <p className="text-sm">Found on Thursday, April 17 at 15:46 PM</p>
            <p className="text-sm">Found by rikadoescare</p>
            <p className="text-sm py-4">
              {
                "Ditemukan MiawPhone 7 warna putih dalam kondisi menyala dan tidak terkunci. Case warna coklat, ada stiker kecil di belakang. Ditemukan sekitar pukul 3 sore di dekat bangku kantin. Buat yang merasa kehilangan, bisa klaim dengan hubungi dan kirim bukti"
              }
            </p>
            <div className="flex justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span>Jumlah Barang Ditemukan</span>
                <span>Lokasi Ditemukan</span>
                <span>Status</span>
              </div>
              <div className="flex flex-col gap-1">
                <span>: {"1"}</span>
                <span>: {"1"}</span>
                <span>: {"2"}</span>
              </div>
            </div>
            <div className="flex flex-col w-full py-2">
              <div className="rounded-md w-full border border-gray-300 overflow-hidden">
                <div className="relative aspect-video sm:aspect-[16/5.5]">
                  <img
                    src="https://picsum.photos/640/360"
                    alt="foto"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
            <button className="btn-primary rounded-md w-full min-h-[3rem] cursor-pointer">
              <a
                href={`/chat/${params.id}`}
                className="flex items-center justify-center py-3 text-sm font-bold uppercase"
              >
                Hubungi Pelapor
              </a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
