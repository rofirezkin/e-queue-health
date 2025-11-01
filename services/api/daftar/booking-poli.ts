import { apiRequest, baseApi, T_ApiResponse } from "../../base-api";

export type Trq_BookingPoli = {
  poli_id: number;
  pasien_id: number;
  jadwal: string; // ISO datetime
  keluhan?: string;
  tanggal_daftar?: string; // YYYY-MM-DD
};

export type Trs_BookingPoli = {
  id: number;
  pasien_id: number;
  poli_id: number;
  tanggal_daftar: string;
  jadwal: string;
  keluhan: string;
  created_at: string;
  updated_at: string;
};

export async function bookingPoli(payload: Trq_BookingPoli) {
  return apiRequest(
    baseApi.post<T_ApiResponse<Trs_BookingPoli>>(`/daftar/create`, payload)
  );
}
export type T_ApiBookingPoliResponse = Awaited<ReturnType<typeof bookingPoli>>;
