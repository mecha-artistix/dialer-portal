import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
// import { login } from "@/store/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import CardWrapper from "@/components/styled/CardWrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ServerResponse } from "@/components/styled/ServerResponse";
import { LinkBtn } from "@/components/styled/LinkBtn";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { TServerResponse } from "@/types/server_response";
import useLogin from "../useLogin";

/*
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
*/
function LoginForm() {
  const [status, setStatus] = useState<TServerResponse>({ status: "", message: "" });
  const { login, isLoggingIn } = useLogin();
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const from = state?.from?.pathname || "/";

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { username: "john_doe", password: "securepassword123" },
  });

  const {
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    // await delay(2000);

    // dispatch(login(data)).then(() => {
    //   const updatedIsAuthenticated = userState.isAuthenticated;
    //   console.log("Updated isAuthenticated:", updatedIsAuthenticated);
    //   navigate(from, { replace: true });
    // });
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
                    <Input {...field} disabled={userState.loading} placeholder="username" type="text" key="username" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password */}
            <FormField
              control={form.control}
              disabled={isSubmitting}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="*******" type="password" disabled={userState.loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* CODE */}
          </div>
          <ServerResponse type={status.status} message={status.message} />

          <LinkBtn label="Forget Password?" href="/auth/reset" />
          <Button type="submit" className="w-full" disabled={userState.loading}>
            {userState.loading ? "Submitting..." : "Submit"}
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
