import {
    bookingPoli,
    T_ApiBookingPoliResponse,
    Trq_BookingPoli,
} from "@/services/api/daftar/booking-poli";
import { T_AxiosBaseError } from "@/services/base-api";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export type T_UseCreateDaftar = {
  options?: Partial<
    MutationOptions<
      T_ApiBookingPoliResponse,
      T_AxiosBaseError,
      Trq_BookingPoli
    >
  >;
};

export function useCreateDaftar({ options }: T_UseCreateDaftar = {}) {
  return useMutation({
    mutationFn: (payload: Trq_BookingPoli) => bookingPoli(payload),
    ...options,
  });
}
