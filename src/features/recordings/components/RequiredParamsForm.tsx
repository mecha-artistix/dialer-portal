// dialer_url, user, pass, date

import { getDialerConfig } from "@/lib/services";
import { ViciRequiredParams, ViciRequiredParamsType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useViciQueryMutation } from "../useViciQueryMutation";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setDialer, setRequiredParams } from "../recordingsSliceV2";

const testValues = {
  dialer_url: "stsolution.i5.tel",
  user: "6666",
  pass: "hIzIJx2ZdU1Zk",
  date: "2024-10-24",
  folder_name: "vicidial",
};
function RequiredParamsForm() {
  const queryMutation = useViciQueryMutation();
  const dispatch = useAppDispatch();

  const form = useForm<ViciRequiredParamsType>({
    resolver: zodResolver(ViciRequiredParams),
    defaultValues: {
      dialer_url: testValues.dialer_url,
      user: testValues.user,
      pass: testValues.pass,
      date: "",
    },
  });

  const {
    data: dialers,
    isSuccess,
    isError: isDialersError,
    error: dialersError,
  } = useQuery({
    queryKey: ["dialers"],
    queryFn: getDialerConfig,
    enabled: true,
  });

  // useEffect(() => {
  //   if (isSuccess && dialers && dialers.length > 0) {
  //     const dialer = dialers[-1];
  //     form.reset({ dialer_url: dialer.url, user: dialer.user, pass: dialer.pass });
  //   }
  // }, [dialers, form, isSuccess]);

  const onSubmit = (data: ViciRequiredParamsType) => {
    console.log("Form Submit Triggered", { data });
    const parsedData = ViciRequiredParams.parse(data);
    try {
      console.log("Parsed Form Data:", parsedData);
      dispatch(setRequiredParams(parsedData));
      queryMutation.mutate({ requiredForm: data, filterForm: {} });
    } catch (error) {
      console.error("Form Submission Error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-end">
          {/* DIALER SELECT */}
          <FormField
            control={form.control}
            name="dialer_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dialer</FormLabel>
                <FormControl>
                  <Select
                    disabled={queryMutation.isPending}
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      const selectedDialer = dialers?.find((dialer) => dialer.url === value);
                      if (selectedDialer) {
                        form.setValue("user", selectedDialer.user);
                        form.setValue("pass", selectedDialer.pass);
                        dispatch(setDialer(selectedDialer.name));
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Dialer" />
                    </SelectTrigger>
                    <SelectContent>
                      {isDialersError && <SelectItem value="error">{`${dialersError}`}</SelectItem>}
                      {dialers?.map((el) => (
                        <SelectItem key={el.id} value={el.url}>
                          {el.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* USER FIELD */}
          <FormField
            control={form.control}
            name="user"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User</FormLabel>
                <FormControl>
                  <Input {...field} disabled={queryMutation.isPending} placeholder="User ID" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* PASSWORD FIELD */}
          <FormField
            control={form.control}
            name="pass"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} disabled={queryMutation.isPending} placeholder="Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* DATE */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input {...field} disabled={queryMutation.isPending} placeholder="YYYY-MM-DD" type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* SUBMIT BUTTON */}
          <Button type="submit" disabled={queryMutation.isPending}>
            {queryMutation.isPending ? "Fetching Data" : "Get Recordings"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default RequiredParamsForm;
