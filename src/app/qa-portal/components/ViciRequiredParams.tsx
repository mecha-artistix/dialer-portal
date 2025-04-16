import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import React from "react";
import { useForm } from "react-hook-form";

function ViciRequiredParams() {
  const form = useForm<ViciRequiredParamsType>({
    resolver: zodResolver(ViciRequiredParams),
    defaultValues: {
      dialer_url: testValues.dialer_url,
      user: testValues.user,
      pass: testValues.pass,
      // date: "",
    },
  });

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
                      {dialers &&
                        dialers?.length > 0 &&
                        dialers?.map((el) => (
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

          {/* SUBMIT BUTTON */}
          <Button type="submit" disabled={queryMutation.isPending}>
            Apply Filter
            {/* {queryMutation.isPending ? "Fetching Data" : "Get Recordings"} */}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ViciRequiredParams;
