import { useState } from "react";
import { Compass, Info } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";

export default function Card({ data }: { data?: any }) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="w-full max-w-xs md:max-w-sm min-h-[540px] mx-auto bg-gray-300 text-black dark:bg-gray-700 dark:text-white drop-shadow-2xl rounded-lg overflow-hidden flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={`${import.meta.env.VITE_API_URL}/api/file/${data.foto}`}
          alt={data.barang.nama_barang}
          className="absolute w-full h-full object-cover object-center inset-0"
        />
        <span className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-bold z-10">
          {data.jenis_lap === "kehilangan" ? "Lost" : "Found"}
        </span>
      </div>
      <div className="p-5 flex flex-col gap-4 flex-1">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-md font-bold text-sm">
            {data.barang.jenis_barang}
          </span>
          <span className="italic text-black dark:text-white text-xs md:text-sm">
            Lost Around{" "}
            {new Date(data.waktu).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <span className="text-2xl font-bold">{data.barang.nama_barang}</span>
        <div className="flex gap-2 items-center text-sm">
          <Compass className="w-4 h-4" /> {data.lokasi_nama}
        </div>
        <div className="flex gap-2 items-center text-sm">
          <Info className="w-4 h-4" /> x{data.barang.jumlah || ""}
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-200">
          {data.barang.deskripsi}
        </div>
        <div className="flex flex-col w-full gap-2 mt-auto">
          <Button
            className="border border-blue-600 rounded-md py-2 text-sm font-bold uppercase text-blue-700 dark:text-blue-300 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-800 transition"
            asChild
          >
            <Link to={"/details/" + data.id}>Details</Link>
          </Button>
          <Button
            className={`rounded-md py-2 text-sm font-bold uppercase text-white flex items-center justify-center w-full transition ${
              isClicked
                ? "bg-green-500"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            }`}
            onClick={() => setIsClicked(true)}
            type="button"
          >
            {isClicked ? "Founded" : "I Found It"}
          </Button>
        </div>
      </div>
    </div>
  );
}
