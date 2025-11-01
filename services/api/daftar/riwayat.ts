import { apiRequest, baseApi, T_ApiResponse } from "../../base-api";

export type Trs_DaftarRiwayat = {
  id: number;
  pasien_id: number;
  poli_id: number;
  tanggal_daftar: string; // format: "YYYY-MM-DD"
  jadwal: string; // format: ISO date string e.g. "2025-10-27T09:30:00"
  keluhan: string;
  created_at: string;
  updated_at: string;
  antrean: {
    id: number;
    status: string; // contoh: "antri", "selesai", "menunggu"
    poli_id: number;
    pasien_id: number;
    created_at: string;
    updated_at: string;
    nomor_antrean: number;
    estimasi_waktu: string; // format ISO datetime string
    pendaftaran_online_id: number;
  } | null; // bisa null kalau belum ada antrean
};

export async function getDaftarRiwayat(pasienId: number) {
  return apiRequest(
    baseApi.get<T_ApiResponse<Trs_DaftarRiwayat[]>>(
      `/daftar/riwayat/${pasienId}`
    )
  );
}
export type T_ApiDaftarRiwayatResponse = Awaited<
  ReturnType<typeof getDaftarRiwayat>
>;
