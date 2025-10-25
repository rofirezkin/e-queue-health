import {
  createStaff,
  T_ApiCreateStaffResponse,
  Trq_CreateStaff,
} from "@/services/api/pasien/staff";
import { T_AxiosBaseError } from "@/services/base-api";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export type T_UseCreateStaff = {
  options?: Partial<
    MutationOptions<T_ApiCreateStaffResponse, T_AxiosBaseError, Trq_CreateStaff>
  >;
};

export function useCreateStaff({ options }: T_UseCreateStaff = {}) {
  return useMutation({
    mutationFn: (payload: Trq_CreateStaff) => createStaff(payload),
    ...options,
  });
}
