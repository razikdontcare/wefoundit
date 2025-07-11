export default function SmallCard({ data }: { data?: any }) {
  return (
    <div className="w-full min-h-[15rem] bg-gray-300 text-black dark:bg-gray-700 dark:text-white drop-shadow-2xl rounded-md overflow-hidden flex flex-col">
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-blue-200 dark:bg-blue-900 rounded font-semibold text-xs">
            {data.barang.jenis_barang}
          </span>
          <span className="italic text-black dark:text-white text-xs">
            Lost around{" "}
            {new Date(data.waktu).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <span className="text-xl font-bold mt-1 mb-2 truncate">
          {data.barang.nama_barang}
        </span>

        <div className="relative w-full aspect-video rounded overflow-hidden mt-1">
          <img
            src={import.meta.env.VITE_API_URL + "/api/file/" + data?.foto}
            alt={data.barang.nama_barang}
            className="w-full h-full object-cover object-center"
          />
          <span
            className={`absolute top-2 left-2 px-3 py-1 rounded-md text-xs font-bold
            ${
              data.jenis_lap === "kehilangan"
                ? "bg-red-600 text-white"
                : "bg-blue-600 text-white"
            }
          `}
          >
            {data.jenis_lap === "kehilangan" ? "Lost" : "Found"}
          </span>
        </div>
      </div>
    </div>
  );
}
