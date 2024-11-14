import { ServerResponse } from "@/components/styled/ServerResponse";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { apiFlask } from "@/lib/interceptors";
import { AddDialerFormType, AddDialerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function AddDialerForm() {
  const dispatch = useAppDispatch();
  const form = useForm<AddDialerFormType>({
    resolver: zodResolver(AddDialerSchema),
  });
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data) => {
    const parsedData = AddDialerSchema.parse(data);
    try {
      const response = await apiFlask.post("/portal/configure-dialer", parsedData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    console.log(onSubmit);
  };

  return (
    <Card className="p-4">
      <ServerResponse type="" message="" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-end">
            {/* DIALER URL */}
            <FormField
              control={form.control}
              name="dialer_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dialer Url</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} placeholder="stsolution.i5.tel" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* USER */}
            <FormField
              control={form.control}
              name="user"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} placeholder="User ID" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* PASSWORD */}
            <FormField
              control={form.control}
              name="pass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} placeholder="Password" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Fetching Data" : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
