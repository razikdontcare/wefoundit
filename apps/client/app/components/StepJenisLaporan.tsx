interface Props {
  onSelect: (tipe: "kehilangan" | "menemukan") => void;
}

export default function StepJenisLaporan({ onSelect }: Props) {
  return (
    <div className="flex flex-col space-y-3 text-center">
      <p className="text-sm primary-text">
        Tentukan apakah Anda ingin melaporkan kehilangan atau penemuan barang.
      </p>
      <button
        onClick={() => onSelect("kehilangan")}
        className="border border-blue-500 py-2 rounded dark:hover:bg-white hover:bg-blue-500 transition dark:hover:text-black hover:text-white dark:text-white text-black"
      >
        Kehilangan Barang
      </button>
      <button
        onClick={() => onSelect("menemukan")}
        className="border border-blue-500 py-2 rounded dark:hover:bg-white hover:bg-blue-500 transition dark:hover:text-black hover:text-white dark:text-white text-black"
      >
        Menemukan Barang
      </button>
    </div>
  );
}
