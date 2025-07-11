interface Props {
  onSelect: (tipe: "kehilangan" | "menemukan") => void;
  value?: "kehilangan" | "menemukan" | null;
}

export default function StepJenisLaporan({ onSelect, value }: Props) {
  return (
    <div className="flex flex-col space-y-3 text-center">
      <p className="text-sm primary-text">
        Tentukan apakah Anda ingin melaporkan kehilangan atau penemuan barang.
      </p>
      <button
        onClick={() => onSelect("kehilangan")}
        className={`cursor-pointer border border-blue-500 py-2 rounded transition dark:text-white text-black dark:hover:bg-white hover:bg-blue-500 dark:hover:text-black hover:text-white ${
          value === "kehilangan" ? "bg-blue-500 text-white" : ""
        }`}
      >
        Kehilangan Barang
      </button>
      <button
        onClick={() => onSelect("menemukan")}
        className={`cursor-pointer border border-blue-500 py-2 rounded transition dark:text-white text-black dark:hover:bg-white hover:bg-blue-500 dark:hover:text-black hover:text-white ${
          value === "menemukan" ? "bg-blue-500 text-white" : ""
        }`}
      >
        Menemukan Barang
      </button>
    </div>
  );
}
