import { apiFlask } from "@/lib/interceptors";
import { useQuery } from "@tanstack/react-query";

function useUsers() {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await apiFlask.get("/auth/all-users");
      console.log({ user: response });
      return response;
    },
  });

  return { users, isLoading, isError, error };
}

export default useUsers;
