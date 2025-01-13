import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogout() {
  const queryClient = useQueryClient();
  const { mutate: logout } = useMutation({
    mutationFn: async () => Promise.resolve(),
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
    },
  });

  return { logout };
}
