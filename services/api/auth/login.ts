import { apiRequest, baseApi, T_ApiResponse } from "../../base-api";

export type Trq_Login = {
  no_hp: string;
  password: string;
};
export type Trs_Login = {
  token: string;
  id: number;
  role: string;
};

export async function login(payload: Trq_Login) {
  console.log("Login payload:", payload);
  return apiRequest(
    baseApi.post<T_ApiResponse<Trs_Login>>(`/auth/login`, payload)
  );
}
export type T_ApiLoginResponse = Awaited<ReturnType<typeof login>>;
