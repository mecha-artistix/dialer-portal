import { apiFlask } from "@/lib/interceptors";
import { useQuery } from "@tanstack/react-query";

function useValidation() {
  const {
    data: user,
    isLoading: isValidating,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await apiFlask.get("/auth/protected");
      return res;
    },
    enabled: false, // Prevent auto-fetch on mount
    refetchOnWindowFocus: false, // Disable auto-refetch on window focus
  });

  return { user, isValidating, refetch, isError, error };
}

export default useValidation;

//  isValid: !!user?.data?.id,
