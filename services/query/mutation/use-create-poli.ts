import {
  createPoli,
  T_ApiCreatePoliResponse,
  Trq_CreatePoli,
} from "@/services/api/poli/create";
import { T_AxiosBaseError } from "@/services/base-api";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export type T_UseCreatePoli = {
  options?: Partial<
    MutationOptions<T_ApiCreatePoliResponse, T_AxiosBaseError, Trq_CreatePoli>
  >;
};

export function useCreatePoli({ options }: T_UseCreatePoli = {}) {
  return useMutation({
    mutationFn: (payload: Trq_CreatePoli) => createPoli(payload),
    ...options,
  });
}
