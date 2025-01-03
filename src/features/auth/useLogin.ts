import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "@/lib/services";
import { LoginSchemaType } from "@/schemas";
import { useToast } from "@/hooks/use-toast";
// const navigate = useNavigate();

function useLogin() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    data: user,
    mutate: login,
    isPending: isLoggingIn,
  } = useMutation({
    mutationFn: (data: LoginSchemaType) => loginAPI(data),
    onSuccess(data) {
      console.log(data.data.user.id);
      // save token to  local storage
      queryClient.setQueryData(["user"], data.data.user.id);
      localStorage.setItem("token", data.data.token);
      toast({
        title: "Success!",
        description: "successfully logged in.",
        variant: "default",
        duration: 3000,
      });
    },
    onError: (error) => {
      console.log("eror from onError", error);
      toast({
        title: "Failed!",
        description: "Your  request failed.",
        variant: "destructive",
        duration: 3000,
      });
    },
  });

  return { login, isLoggingIn, user: user?.data };
}

export default useLogin;
