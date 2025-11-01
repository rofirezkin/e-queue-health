import { apiRequest, baseApi, T_ApiResponse } from "../../base-api";

export type Trq_CreatePoli = {
  nama_poli: string;
};

export type Trs_ListPoli = {
  id: number;
  nama_poli: string;
  created_at: string;
  updated_at: string;
};

export async function getPoli() {
  return apiRequest(baseApi.get<T_ApiResponse<Trs_ListPoli[]>>(`/poli`));
}
export type T_ApiGetPoliResponse = Awaited<ReturnType<typeof getPoli>>;
