interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function StepFormPenemuan({ onNext, onBack }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Form Penemuan Barang</h2>
      <input className="w-full p-2 rounded text-black" placeholder="Nama Barang" />
      <input className="w-full p-2 rounded text-black" placeholder="Lokasi Ditemukan" />

      <div className="flex justify-between">
        <button onClick={onBack} className="text-sm text-gray-400">← Kembali</button>
        <button onClick={onNext} className="bg-blue-500 px-4 py-2 rounded">Selanjutnya</button>
      </div>
    </div>
  );
}
