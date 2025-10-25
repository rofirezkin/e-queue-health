import {
  createPasien,
  T_ApiCreatePasienResponse,
  Trq_CreatePasien,
} from "@/services/api/pasien/create";
import { T_AxiosBaseError } from "@/services/base-api";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export type T_UseCreatePasien = {
  options?: Partial<
    MutationOptions<
      T_ApiCreatePasienResponse,
      T_AxiosBaseError,
      Trq_CreatePasien
    >
  >;
};

export function useCreatePasien({ options }: T_UseCreatePasien = {}) {
  return useMutation({
    mutationFn: (payload: Trq_CreatePasien) => createPasien(payload),
    ...options,
  });
}
