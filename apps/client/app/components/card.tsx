import { useState } from "react";
import { Compass, Info } from "lucide-react";

export default function Card({ data }: { data?: any }) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <div className=" w-full max-w-xs md:max-w-sm min-h-[540px] h-auto mx-auto bg-gray-300 text-black dark:bg-gray-700 dark:text-white drop-shadow-2xl rounded-md overflow-hidden">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={"http://localhost:5000/api/file/" + data.foto}
            alt={data.barang.nama_barang}
            className="absolute w-full aspect-video object-cover object-center inset-0"
          />

          <div className="absolute right-4 rounded-md">
            <span className="alert alert-danger text-white px-2 py-1 rounded-md text-xs font-bold absolute top-2 left-2">
              {data.jenis_lap === "kehilangan" ? "Lost" : "Found"}
            </span>
          </div>
        </div>
        <div className="p-4 sm:p-5 flex flex-col gap-3">
          <div className=" flex md:flex-wrap flex-col md:flex-row items-start md:items-center md:justify-between">
            <span className="px-2 py-1  alert alert-info rounded-md font-bold text-sm  ">
              {data.barang.jenis_barang}
            </span>

            <span className="italic text-black dark:text-white md:ml-7 text-xs md:text-s">
              Lost Around{" "}
              {new Date(data.waktu).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="">
            <span className="text-2xl font-bold py-3">
              {data.barang.nama_barang}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <Compass /> {data.lokasi_nama}
          </div>

          <div className="flex gap-2 items-center">
            <Info /> x{data.barang.jumlah}
          </div>

          <div className="text-sm">{data.barang.deskripsi}</div>

          <div className="flex flex-col w-full gap-2">
            <div className="border-1 border-blue-600 rounded-md">
              <span className="flex items-center justify-center py-2 text-sm font-bold uppercase">
                Details
              </span>
            </div>
            <div
              className={`cursor-pointer rounded-md py-2 text-sm font-bold uppercase text-white flex items-center justify-center ${
                isClicked ? "bg-green-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={() => setIsClicked(true)}
            >
              <span className="flex items-center justify-center py-2 text-sm font-bold uppercase">
                {isClicked ? "Founded" : "I Found It"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
