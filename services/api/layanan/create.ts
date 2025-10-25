import { apiRequest, baseApi, T_ApiResponse } from "../../base-api";

export type Trq_CreateLayanan = {
  poli_id: number;
  hari_operasional: string[]; // e.g. ["Senin", "Selasa", ...]
  jam_operasional_start: string; // "08:00"
  jam_operasional_end: string; // "13:00"
  kuota_harian: number;
};

export async function createLayanan(payload: Trq_CreateLayanan) {
  return apiRequest(
    baseApi.post<T_ApiResponse<any>>(`/layanan/create`, payload)
  );
}
export type T_ApiCreateLayananResponse = Awaited<
  ReturnType<typeof createLayanan>
>;
