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
      jenis_lap: "menemukan";
      lokasi_nama: string;
      latitude: number;
      longitude: number;
      waktu: Date;
      status_lap: "found" | "claimed";
      created_at: Date;
      foto: string | null;
    };
