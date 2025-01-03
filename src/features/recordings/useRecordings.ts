import { useQuery } from "@tanstack/react-query";
import { recordsQueryKey } from "./Recordings";
import { getrecordings } from "@/lib/services";
import { useAppSelector } from "@/hooks/reduxHooks";

function useRecordings() {
  const { requiredParams, filterParams, pagination } = useAppSelector((state) => state.recordings);

  const {
    data: recordings,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [recordsQueryKey],
    queryFn: async () => {
      const response = await getrecordings(requiredParams, filterParams, pagination);
      return response;
    },
    enabled: false,
    retry: 0,
    select: (data) => {
      if (data?.error) {
        throw data.error;
      }
      return data;
    },
  });

  return { recordings, isLoading, isError, error };
}

export default useRecordings;
