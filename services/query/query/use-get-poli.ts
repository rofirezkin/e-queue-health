import { getPoli, T_ApiGetPoliResponse } from "@/services/api/poli/list-poli";
import { T_AxiosBaseError } from "@/services/base-api";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useMemo } from "react";

export type T_UseGetPoliptions = Partial<
  UseQueryOptions<T_ApiGetPoliResponse, T_AxiosBaseError>
>;

export const GET_POLI = "getPoli";

export function useGetPoli({ options }: { options?: T_UseGetPoliptions }) {
  const query = useQuery<T_ApiGetPoliResponse, T_AxiosBaseError>({
    queryKey: [GET_POLI],
    queryFn: () => getPoli(),
    ...options,
  });

  const data = useMemo(() => query.data?.data ?? [], [query.data]);

  return useMemo(() => ({ ...query, data }), [query, data]);
}
