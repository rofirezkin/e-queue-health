import { apiRequest, baseApi, T_ApiResponse } from "../../base-api";

export type Trq_CreateStaff = {
  nama: string;
  no_hp: string;
  password: string;
  role: string; // e.g. "petugas"
};

export async function createStaff(payload: Trq_CreateStaff) {
  return apiRequest(baseApi.post<T_ApiResponse<any>>(`/pasien/staff`, payload));
}
export type T_ApiCreateStaffResponse = Awaited<ReturnType<typeof createStaff>>;
