import type { Route } from "./+types/chat";
import{ StepBack, Undo2 } from "lucide-react";
import{ XCircle } from "lucide-react";
import{ CircleCheckBig } from "lucide-react";
import { useNavigate } from "react-router";
import ChatCard from "~/components/chat-card";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export default function Chat({ params }: { params: { id: string } }) {
    const navigate = useNavigate();
  return (
    <>
        <div className="rounded-lg container mx-auto max-w-7xl flex-col justify-center items-center my-10 gap-4 box-primary py-4 px-4">
            <div className="flex justify-between items-center w-full rounded-md px-4 py-2">
                <Undo2 onClick={() => navigate(-1)} className="cursor-pointer"/>
                <h1 className="text-2xl font-bold">Chat (Count Unread chat)</h1>
                <div></div>
            </div>
            <div className="flex flex-row items-center justify-center gap-2 px-4 py-2">
                <div className="flex flex-col rounded-2xl w-[70%] min-h-[36rem] gap-2">
                    <div className="flex items-center justify-center w-full ">
                        <input type="text" placeholder="Search" className="border border-gray-300 rounded-md p-2 w-full" />
                    </div>
                    {/* Placeholder for chat list */}
                    <ChatCard />
                    <ChatCard />
                </div>
                <div className="flex flex-col items-start rounded-2xl w-full min-h-[38.5rem] border border-gray-300 p-4">
                    <span className="px-2 py-1  alert alert-info rounded-md font-bold text-sm  ">
                        Handphone
                    </span>
                    <h1 className="text-2xl font-bold py-2">MiawPhone 7</h1>
                    <p className="text-sm">Found on Thursday, April 17 at 15:46 PM</p>
                    <p className="text-sm">Found by rikadoescare</p>
                    <p className="text-sm py-4">{"Ditemukan MiawPhone 7 warna putih dalam kondisi menyala dan tidak terkunci. Case warna coklat, ada stiker kecil di belakang. Ditemukan sekitar pukul 3 sore di dekat bangku kantin. Buat yang merasa kehilangan, bisa klaim dengan hubungi dan kirim bukti"}</p>
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
                        <div className="rounded-md w-full min-h-[14rem] border border-gray-300">
                            <div className="relative aspect-[16/5.5] overflow-hidden rounded-md">
                                <img
                                    src="https://picsum.photos/640/360"
                                    alt="foto"
                                    className="absolute w-full aspect-[16/5.5] object-cover object-center inset-0"
                                    />
                            </div>
                        </div>
                    </div>
                    <button className="btn-primary rounded-md w-full min-h-[3rem] cursor-pointer">
                        <a href={`/chat/${params.id}`} className="flex items-center justify-center py-3 text-sm font-bold uppercase">
                            Hubungi Pelapor
                        </a>
                    </button>
                </div>
            </div>
        </div>
    </>
  );
}