import { useMutation } from "@tanstack/react-query";
import { login as loginAPI } from "@/lib/services";
import { LoginSchemaType } from "@/schemas";
// const navigate = useNavigate();

function useLogin() {
  const {
    data: user,
    mutate: login,
    isPending: isLoggingIn,
  } = useMutation({
    mutationFn: (data: LoginSchemaType) => loginAPI(data),
    onSuccess(data) {
      console.log({ data });
      // save token to  local storage
      localStorage.setItem("token", data.data.token);
    },
  });

  return { login, isLoggingIn, user: user?.data };
}

export default useLogin;
