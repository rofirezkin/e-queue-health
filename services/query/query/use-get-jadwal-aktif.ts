import {
  getJadwalAktif,
  T_ApiJadwalAktifResponse,
} from "@/services/api/layanan/jadwal-aktif";
import { T_AxiosBaseError } from "@/services/base-api";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useMemo } from "react";

export type T_UseGetJadwalAktifOptions = Partial<
  UseQueryOptions<T_ApiJadwalAktifResponse, T_AxiosBaseError>
>;

export const GET_JADWAL_AKTIF = "getJadwalAktif";

export function useGetJadwalAktif({
  poliId,
  options,
}: {
  poliId: number;
  options?: T_UseGetJadwalAktifOptions;
}) {
  const query = useQuery<T_ApiJadwalAktifResponse, T_AxiosBaseError>({
    queryKey: [GET_JADWAL_AKTIF, poliId],
    queryFn: () => getJadwalAktif(poliId),
    ...options,
  });

  const data = useMemo(() => query.data?.data ?? [], [query.data]);

  return useMemo(() => ({ ...query, data }), [query, data]);
}
