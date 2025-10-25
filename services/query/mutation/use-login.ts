import {
  login,
  T_ApiLoginResponse,
  Trq_Login,
} from "@/services/api/auth/login";
import { T_AxiosBaseError } from "@/services/base-api";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export type T_UseLogin = {
  options?: Partial<
    MutationOptions<T_ApiLoginResponse, T_AxiosBaseError, Trq_Login>
  >;
};

export function useLogin({ options }: T_UseLogin = {}) {
  return useMutation({
    mutationFn: (payload: Trq_Login) => login(payload),
    ...options,
  });
}
