import { ServerResponse } from "@/components/styled/ServerResponse";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { apiFlask } from "@/lib/interceptors";
import { AddDialerFormType, AddDialerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { setIsAddingDialer } from "../dialerSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function AddDialerForm() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const form = useForm<AddDialerFormType>({
    resolver: zodResolver(AddDialerSchema),
    defaultValues: {
      name: "",
      url: "",
      user: "",
      pass: "",
      folder_name: "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (parsedData: AddDialerFormType) => {
      const response = await apiFlask.post("/portal/configure-dialer", parsedData);
      console.log(response);
      return response.data.dialer; // Return the new item
    },
    // onMutate: async (id) => {
    // const prev = queryClient.getQueryData(["dialers"])
    // console.log(prev)
    // },
    onSettled: () => {},
    onSuccess: (newDialer) => {
      dispatch(setIsAddingDialer(false));

      queryClient.setQueryData(["dialers"], (oldData: AddDialerFormType[] | undefined) => {
        return oldData ? [...oldData, newDialer] : [newDialer];
      });
    },
  });
  const onSubmit: SubmitHandler<AddDialerFormType> = async (data) => {
    const parsedData = AddDialerSchema.parse(data);
    console.log(parsedData);
    createMutation.mutate(parsedData);

    try {
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Card className="p-4">
      <ServerResponse type="" message="" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-end">
            {/* DIALER NAME */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dialer Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} placeholder="solutions" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Folder NAME */}
            <FormField
              control={form.control}
              name="folder_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Folder Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} placeholder="vicidial" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DIALER URL */}
            <FormField
              control={form.control}
              name="url"
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
