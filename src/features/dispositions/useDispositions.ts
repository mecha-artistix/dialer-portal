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
      const response = await apiFlask.get("/call-dispositions");

      console.log({ response });

      return response;
    },
    enabled: false,
    retry: 0,
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
