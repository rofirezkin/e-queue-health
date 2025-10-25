import { apiRequest, baseApi, T_ApiResponse } from "../../base-api";

export type Trq_CreatePasien = {
  nama: string;
  no_hp: string;
  password: string;
  role?: string;
};

export async function createPasien(payload: Trq_CreatePasien) {
  return apiRequest(
    baseApi.post<T_ApiResponse<any>>(`/pasien/create`, payload)
  );
}
export type T_ApiCreatePasienResponse = Awaited<
  ReturnType<typeof createPasien>
>;
