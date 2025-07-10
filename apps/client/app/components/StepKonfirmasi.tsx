interface Props {
  onBack: () => void;
}

export default function StepKonfirmasi({ onBack }: Props) {
  return (
    <div className="space-y-4 text-center">
      <h2 className="text-lg font-semibold">Konfirmasi Laporan</h2>
      <p className="text-sm text-gray-300">Pastikan semua data yang Anda masukkan sudah benar.</p>

      {/* Tempatkan ringkasan data di sini jika diperlukan */}

      <div className="flex justify-between">
        <button onClick={onBack} className="text-sm text-gray-400">← Kembali</button>
        <button className="bg-green-500 px-4 py-2 rounded">Kirim Laporan</button>
      </div>
    </div>
  );
}
