import { apiRequest, baseApi, T_ApiResponse } from "../../base-api";

export async function getDaftarRiwayat(pasienId: number) {
  return apiRequest(
    baseApi.get<T_ApiResponse<any>>(`/daftar/riwayat/${pasienId}`)
  );
}
export type T_ApiDaftarRiwayatResponse = Awaited<
  ReturnType<typeof getDaftarRiwayat>
>;
