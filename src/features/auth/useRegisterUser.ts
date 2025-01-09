import { toast } from "@/hooks/use-toast";
import { apiFlask } from "@/lib/interceptors";
import { RegisterSchemaType } from "@/schemas";
import { useMutation } from "@tanstack/react-query";

export default function useRegisterUser() {
  const {
    mutate: register,
    isPending: isRegistering,
    isError,
    error,
  } = useMutation({
    mutationFn: (data: RegisterSchemaType) => apiFlask.post(import.meta.env.VITE_FLASK_API + "/auth/register", data),
    onSuccess: ({ data }) => {
      toast({
        title: "Success!",
        description: `${data.user.username} registered successfully.`,
        variant: "default",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast({
        title: "Success!",
        description: `user registeration failed. ${error?.response?.data?.error}`,
        variant: "destructive",
        duration: 3000,
      });
    },
  });

  return { register, isRegistering, isError, error };
}
