import { RegisterSchema, RegisterSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ServerResponse } from "@/components/styled/ServerResponse";
import useRegisterUser from "../useRegisterUser";

function RegisterForm() {
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "", username: "" },
  });
  const { register, isRegistering, isError, error } = useRegisterUser();
  function onSubmit(data: RegisterSchemaType) {
    const parsedData = RegisterSchema.parse(data);
    register(parsedData, { onSettled: () => form.reset() });
    // dispatch(register(parsedData));
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          {/* EMAIL */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your Email" type="email" disabled={isRegistering} />
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
                  <Input {...field} placeholder="Enter your Username" type="text" disabled={isRegistering} />
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
                  <Input {...field} placeholder="Enter your Email" type="password" disabled={isRegistering} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SUBMIT */}
          <Button type="submit" className="w-full" disabled={isRegistering}>
            {isRegistering ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
    </>
  );
}

export default RegisterForm;
