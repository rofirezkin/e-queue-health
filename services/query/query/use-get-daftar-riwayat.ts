import {
  getDaftarRiwayat,
  T_ApiDaftarRiwayatResponse,
} from "@/services/api/daftar/riwayat";
import { T_AxiosBaseError } from "@/services/base-api";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useMemo } from "react";

export type T_UseGetDaftarRiwayatOptions = Partial<
  UseQueryOptions<T_ApiDaftarRiwayatResponse, T_AxiosBaseError>
>;

export const GET_DAFTAR_RIWAYAT = "getDaftarRiwayat";

export function useGetDaftarRiwayat({
  pasienId,
  options,
}: {
  pasienId: number;
  options?: T_UseGetDaftarRiwayatOptions;
}) {
  const query = useQuery<T_ApiDaftarRiwayatResponse, T_AxiosBaseError>({
    queryKey: [GET_DAFTAR_RIWAYAT, pasienId],
    queryFn: () => getDaftarRiwayat(pasienId),
    ...options,
  });

  const data = useMemo(() => query.data?.data ?? [], [query.data]);

  return useMemo(() => ({ ...query, data }), [query, data]);
}
