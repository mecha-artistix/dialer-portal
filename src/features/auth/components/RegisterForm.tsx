import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { RegisterSchema, RegisterSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CardWrapper from "@/components/styled/CardWrapper";
import { register } from "@/store/userSlice";
import { useNavigate } from "react-router-dom";
import { ServerResponse } from "@/components/styled/ServerResponse";
import { useEffect } from "react";

function RegisterForm() {
  const navigate = useNavigate();
  const userSelector = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "", username: "" },
  });

  function onSubmit(data: RegisterSchemaType) {
    const parsedData = RegisterSchema.parse(data);
    dispatch(register(parsedData));
  }

  useEffect(() => {
    if (userSelector.isAuthenticated) {
      navigate("/");
    }
  }, [userSelector.isAuthenticated]);

  const {
    formState: { isSubmitting, errors },
  } = form;

  return (
    <CardWrapper
      headerLabel="Welcome!"
      backButtonLabel="Already a member? Click here to login now"
      backButtonHref="/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* EMAIL */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your Email" type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* USETNAME */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your Username" type="text" disabled={userSelector.loading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* PASSWORD */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your Email" type="password" disabled={userSelector.loading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SUBMIT */}
          <Button type="submit" className="w-full" disabled={userSelector.loading}>
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
      <ServerResponse type="error" message={JSON.stringify(errors)} />
    </CardWrapper>
  );
}

export default RegisterForm;
