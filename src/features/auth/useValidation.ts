import { apiFlask } from "@/lib/interceptors";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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
      const token = localStorage.getItem("token");
      if (!token) throw new Error("token not found");

      const res = await axios.get(import.meta.env.VITE_FLASK_API + "/auth/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Return a complete user object by merging with cached data
      console.log(res);
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
