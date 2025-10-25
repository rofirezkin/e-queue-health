import { apiRequest, baseApi, T_ApiResponse } from "../../base-api";

export type Trq_BookingPoli = {
  poli_id: number;
  pasien_id: number;
  jadwal: string; // ISO datetime
  keluhan?: string;
  tanggal_daftar?: string; // YYYY-MM-DD
};

export async function bookingPoli(payload: Trq_BookingPoli) {
  return apiRequest(
    baseApi.post<T_ApiResponse<any>>(`/daftar/create`, payload)
  );
}
export type T_ApiBookingPoliResponse = Awaited<ReturnType<typeof bookingPoli>>;
