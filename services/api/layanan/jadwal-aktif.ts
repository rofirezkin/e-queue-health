import { apiRequest, baseApi, T_ApiResponse } from "../../base-api";

export type Trs_JadwalAktif = {
  id: number;
  poli_id: number;
  hari_operasional: string[]; // ✅ array of hari seperti ["Senin", "Selasa"]
  jam_operasional_start: string; // ✅ format "HH:mm:ss"
  jam_operasional_end: string; // ✅ format "HH:mm:ss"
  kuota_harian: number;
  created_at: string; // ✅ ISO datetime
  updated_at: string; // ✅ ISO datetime
};

export async function getJadwalAktif(poliId: number) {
  return apiRequest(
    baseApi.get<T_ApiResponse<Trs_JadwalAktif[]>>(
      `/layanan/jadwal/aktif/${poliId}`
    )
  );
}
export type T_ApiJadwalAktifResponse = Awaited<
  ReturnType<typeof getJadwalAktif>
>;
