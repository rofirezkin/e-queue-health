import { apiRequest, baseApi, T_ApiResponse } from "../../base-api";

export async function getJadwalAktif(poliId: number) {
  return apiRequest(
    baseApi.get<T_ApiResponse<any>>(`/layanan/jadwal/aktif/${poliId}`)
  );
}
export type T_ApiJadwalAktifResponse = Awaited<
  ReturnType<typeof getJadwalAktif>
>;
