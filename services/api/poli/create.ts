import { apiRequest, baseApi, T_ApiResponse } from "../../base-api";

export type Trq_CreatePoli = {
  nama_poli: string;
};

export async function createPoli(payload: Trq_CreatePoli) {
  return apiRequest(baseApi.post<T_ApiResponse<any>>(`/poli/create`, payload));
}
export type T_ApiCreatePoliResponse = Awaited<ReturnType<typeof createPoli>>;
