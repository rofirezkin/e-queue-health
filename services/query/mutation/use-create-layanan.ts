import {
  createLayanan,
  T_ApiCreateLayananResponse,
  Trq_CreateLayanan,
} from "@/services/api/layanan/create";
import { T_AxiosBaseError } from "@/services/base-api";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export type T_UseCreateLayanan = {
  options?: Partial<
    MutationOptions<
      T_ApiCreateLayananResponse,
      T_AxiosBaseError,
      Trq_CreateLayanan
    >
  >;
};

export function useCreateLayanan({ options }: T_UseCreateLayanan = {}) {
  return useMutation({
    mutationFn: (payload: Trq_CreateLayanan) => createLayanan(payload),
    ...options,
  });
}
