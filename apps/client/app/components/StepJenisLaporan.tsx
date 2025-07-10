interface Props {
  onSelect: (tipe: "kehilangan" | "menemukan") => void;
}

export default function StepJenisLaporan({ onSelect }: Props) {
  return (
    <div className="flex flex-col space-y-3 text-center">
      <p className="text-sm text-gray-300">
        Tentukan apakah Anda ingin melaporkan kehilangan atau penemuan barang.
      </p>
      <button
        onClick={() => onSelect("kehilangan")}
        className="border border-white py-2 rounded hover:bg-white hover:text-black transition"
      >
        Kehilangan Barang
      </button>
      <button
        onClick={() => onSelect("menemukan")}
        className="border border-white py-2 rounded hover:bg-white hover:text-black transition"
      >
        Menemukan Barang
      </button>
    </div>
  );
}
