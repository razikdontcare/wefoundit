import type { Route } from "./+types/details";
import{ Undo2 } from "lucide-react";
import{ XCircle } from "lucide-react";
import{ CircleCheckBig } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export default function Details() {
  return (
    <div className="container mx-auto max-w-7xl flex-col justify-center items-center my-10 gap-4 box-primary py-4 px-4">
        <div className="flex justify-between items-center w-full rounded-md px-4 py-2">
            <Undo2/>
            <span className="min-w-[100px] flex flex-row justify-between items-center alert alert-danger text-white px-2 py-2 rounded-md text-xs font-bold gap-2">
                <XCircle className="text-red-500" />
                Belum Ditemukan
                {/* if (status === "not-found") {
                    <XCircle className="text-red-500" />
                    Belum Ditemukan
                }
                else if (status === "lost") {
                    <XCircle className="text-red-500" />
                    Belum Ditemukan
                }
                else if (status === "found") {
                    <CircleCheckBig className="text-green-500"/>
                    Sudah Ditemukan
                }
                else if (status === "claimed") {
                    <CircleCheckBig className="text-gray-500" />
                    Sudah Diklaim
                } */}
            </span>
        </div>
        <div className="flex flex-row items-center justify-center gap-10 px-4 py-2">
            <div className="rounded-2xl w-[70%] min-h-[36rem] border border-gray-300">
                <div className="relative aspect-[14/18] overflow-hidden rounded-2xl">
                    <img
                        src="https://picsum.photos/640/360"
                        alt="foto"
                        className="absolute w-full aspect-[14/18] object-cover object-center inset-0"
                    />
                </div>
            </div>
            <div className="flex flex-col items-start rounded-2xl w-full min-h-[38.5rem] border border-gray-300 p-4">
                <span className="px-2 py-1  alert alert-info rounded-md font-bold text-sm  ">
                    Handphone
                </span>
                <h1 className="text-2xl font-bold py-3">MiawPhone 7</h1>
                <p className="text-sm">Found on Thursday, April 17 at 15:46 PM</p>
                <p className="text-sm">Found by rikadoescare</p>
                    <br/>
                <p className="text-sm">Ditemukan MiawPhone 7 warna putih dalam kondisi menyala dan tidak terkunci. Case warna coklat, ada stiker kecil di belakang. Ditemukan sekitar pukul 3 sore di dekat bangku kantin. Buat yang merasa kehilangan, bisa klaim dengan hubungi dan kirim bukti</p>
                    <br/>
                <p className="text-sm">Jumlah Barang Ditemukan: 1</p>
                <p className="text-sm">Lokasi Ditemukan: Kantin Matematika</p>
                <p className="text-sm">Status: Belum Ditemukan</p>
                <div className="rounded-md w-full min-h-[14rem] border border-gray-300">
                    <div className="relative aspect-[16/5.5] overflow-hidden rounded-md">
                        <img
                            src="https://picsum.photos/640/360"
                            alt="foto"
                            className="absolute w-full aspect-[16/5.5] object-cover object-center inset-0"
                        />
                    </div>
                </div>
                <br/>
                <div className="btn-primary rounded-md w-full min-h-[3rem]">
                    <span className="flex items-center justify-center py-3 text-sm font-bold uppercase">
                        Claim
                    </span>
                </div>
            </div>
        </div>
    </div>
  );
}