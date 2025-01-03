import { useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import CardWrapper from "@/components/styled/CardWrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LinkBtn } from "@/components/styled/LinkBtn";
import { Button } from "@/components/ui/button";
import useLogin from "../useLogin";

/*
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
*/
function LoginForm() {
  const { login, isLoggingIn } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const from = state?.from?.pathname || "/";

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { username: "john_doe", password: "securepassword123" },
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    login(data, {
      onSuccess: () => {
        navigate(from, { replace: true });
      },
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Dont have an account? Click here to get registered now"
      backButtonHref="/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoggingIn} placeholder="username" type="text" key="username" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="*******" type="password" disabled={isLoggingIn} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* CODE */}
          </div>

          <LinkBtn label="Forget Password?" href="/auth/reset" />
          <Button type="submit" className="w-full" disabled={isLoggingIn}>
            {isLoggingIn ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default LoginForm;

/*
 // function handleLogin() {
  //   dispatch(login());
  //   navigate(from, { replace: true });
  // }

*/
