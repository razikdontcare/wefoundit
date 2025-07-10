import type { Route } from "./+types/details";
import { StepBack, Undo2 } from "lucide-react";
import { XCircle } from "lucide-react";
import { CircleCheckBig } from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios";
import ViewOnlyMapWrapper from "~/components/ViewOnlyMapWrapper";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export async function loader({ params }: Route.LoaderArgs) {
  // Example API call to fetch details by ID (uncomment and adjust as needed)
  const response = await axios.get(
    `http://localhost:5000/api/reports/${params.id}`,
    {
      withCredentials: true,
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch details");
  }

  const userResponse = await axios.get(
    "http://localhost:5000/api/auth/users/" + response.data.user_id,
    {
      withCredentials: true,
    }
  );

  if (userResponse.status !== 200) {
    throw new Error("Error fetching user data");
  }
  return { laporan: response.data, user: userResponse.data.data }; // Return the details data for rendering
}

export default function Details({
  params,
  loaderData,
}: {
  params: { id: string };
  loaderData: Route.ComponentProps;
}) {
  const navigate = useNavigate();
  const { laporan: data, user } = loaderData as any;
  return (
    <>
      <div className="rounded-lg container mx-auto max-w-7xl flex-col justify-center items-center my-10 gap-4 box-primary py-4 px-4">
        <div className="flex justify-between items-center w-full rounded-md px-4 py-2">
          <Undo2 onClick={() => navigate(-1)} className="cursor-pointer" />
          <span
            className={`min-w-[100px] flex flex-row justify-between items-center alert ${
              data.status_lap === "founded" || data.status_lap === "claimed"
                ? "alert-success"
                : "alert-danger"
            } text-white px-2 py-2 rounded-md text-xs font-bold gap-2`}
          >
            {data.status_lap === "founded" || data.status_lap === "claimed" ? (
              <CircleCheckBig className="text-white" />
            ) : (
              <XCircle className="text-white" />
            )}
            {data.status_lap === "founded"
              ? "Sudah Ditemukan"
              : data.status_lap === "claimed"
              ? "Sudah Diklaim"
              : data.status_lap === "lost"
              ? "Belum Ditemukan"
              : "Belum Diklaim"}
          </span>
        </div>
        <div className="flex flex-row items-center justify-center gap-10 px-4 py-2">
          <div className="rounded-2xl w-[70%] min-h-[36rem] border border-gray-300">
            <div className="relative aspect-[14/18] overflow-hidden rounded-2xl">
              <img
                src={"http://localhost:5000/api/file/" + data.foto}
                alt={data.barang.nama_barang}
                className="absolute w-full aspect-[14/18] object-cover object-center inset-0"
              />
            </div>
          </div>
          <div className="flex flex-col items-start rounded-2xl w-full min-h-[38.5rem] border border-gray-300 p-4">
            <span className="px-2 py-1  alert alert-info rounded-md font-bold text-sm  ">
              {data.barang.jenis_barang}
            </span>
            <h1 className="text-2xl font-bold py-2">
              {data.barang.nama_barang}
            </h1>
            <p className="text-sm">
              Found on{" "}
              {new Date(data.waktu).toLocaleDateString("en-US", {
                calendar: "gregory",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-sm">Found by {user.name}</p>
            <p className="text-sm py-4">{data.barang.deskripsi}</p>
            <div className="flex justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span>Jumlah Barang Ditemukan</span>
                <span>Lokasi Ditemukan</span>
                <span>Status</span>
              </div>
              <div className="flex flex-col gap-1">
                <span>: {data.barang.jumlah}</span>
                <span>: {data.lokasi_nama}</span>
                <span>
                  : {data.jenis_lap === "kehilangan" ? "Lost" : "Found"}
                </span>
              </div>
            </div>
            <div className="flex flex-col w-full py-2">
              <div className="rounded-md w-full min-h-[14rem] border border-gray-300">
                <div className="relative aspect-[16/5.5] overflow-hidden rounded-md">
                  <ViewOnlyMapWrapper
                    lat={data.latitude as number}
                    lng={data.longitude as number}
                    zoom={15}
                  />
                </div>
              </div>
            </div>
            <button className="btn-primary rounded-md w-full min-h-[3rem] cursor-pointer">
              <a
                href={`/chat/${user.id}`}
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
