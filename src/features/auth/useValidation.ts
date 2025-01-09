import { apiFlask } from "@/lib/interceptors";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function useValidation() {
  const queryClient = useQueryClient();
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
      // Return a complete user object by merging with cached data
      const cachedUser = queryClient.getQueryData(["user"]) || {};

      return { ...cachedUser, id: res.data.id };
      // return res;
    },
    enabled: false,
    refetchOnWindowFocus: false,
  });

  return { user, isValidating, refetch, isError, error };
}

export default useValidation;

//  isValid: !!user?.data?.id,
