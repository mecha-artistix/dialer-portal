import { apiFlask } from "@/lib/interceptors";
import { useQuery } from "@tanstack/react-query";

function useDispositions() {
  const {
    data: dispositions,
    isLoading,
    refetch,
    error,
    isError,
  } = useQuery({
    queryKey: ["dispositions"],
    queryFn: async () => {
      const response = await apiFlask.get("/dispositions");

      return response.data;
    },
    enabled: true,
    retry: 0,
    refetchInterval: 5000,
  });

  return {
    dispositions,
    isLoading,
    refetch,
    error,
    isError,
  };
}

export default useDispositions;
