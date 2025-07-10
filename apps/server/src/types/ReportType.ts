export type Report =
  | {
      id: string;
      user_id: string;
      barang_id: string;
      jenis_lap: "kehilangan";
      lokasi_nama: string;
      latitude: number;
      longitude: number;
      waktu: Date;
      status_lap: "lost" | "founded";
      created_at: Date;
      foto: string | null;
    }
  | {
      id: string;
      user_id: string;
      barang_id: string;
      jenis_lap: "penemuan";
      lokasi_nama: string;
      latitude: number;
      longitude: number;
      waktu: Date;
      status_lap: "found" | "claimed";
      created_at: Date;
      foto: string | null;
    };

export type Barang = {
  id: number;
  nama_barang: string;
  jenis_barang: string;
  deskripsi: string;
  jumlah: number;
};
