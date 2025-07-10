interface Props {
  onSelect: (tipe: "kehilangan" | "menemukan") => void;
}

export default function StepJenisLaporan({ onSelect }: Props) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 text-center w-full">
      <div className="w-full max-w-md space-y-4">
        <p className="text-sm text-gray-700 dark:text-white">
          Tentukan apakah Anda ingin melaporkan kehilangan atau penemuan barang.
        </p>

        <button
          onClick={() => onSelect("kehilangan")}
          className="w-full border border-blue-500 py-2 rounded dark:hover:bg-white hover:bg-blue-500 transition dark:hover:text-black hover:text-white dark:text-white text-black"
        >
          Kehilangan Barang
        </button>

        <button
          onClick={() => onSelect("menemukan")}
          className="w-full border border-blue-500 py-2 rounded dark:hover:bg-white hover:bg-blue-500 transition dark:hover:text-black hover:text-white dark:text-white text-black"
        >
          Menemukan Barang
        </button>
      </div>
    </div>
  );
}
