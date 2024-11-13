import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { apiFlask } from "@/lib/interceptors";
import { NonAgentApiSchema, NonAgentApiSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { setRecordings } from "../recordingsSlice";
import { ServerResponse } from "@/components/styled/ServerResponse";
import { useState } from "react";
import { TServerResponse } from "@/types/server_response";

function ApiQueryForm() {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<TServerResponse>({ status: "", message: "" });
  const form = useForm<NonAgentApiSchemaType>({
    resolver: zodResolver(NonAgentApiSchema),
    defaultValues: {
      dialer_url: "78.46.61.254",
      source: "test",
      user: "superadmin",
      pass: "NMm8397hjdbcs",
      agent_user: "7001",
      stage: "tab",
      date: "2024-11-13",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = (data) => {
    const parsedData = NonAgentApiSchema.parse(data);
    console.log(parsedData);

    const getRecordings = async () => {
      try {
        const response = await apiFlask.post("/recordings", parsedData);
        console.log(response);
      } catch (error) {
        setStatus({ status: "error", message: error.response.data.error });
      }

      dispatch(setRecordings(response));
    };
    getRecordings();
  };
  return (
    <Card className="p-4">
      <ServerResponse type={status.status} message={status.message} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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

            {/* SOURCE */}
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} placeholder="test" type="text" />
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

            {/* AGENT USER */}
            <FormField
              control={form.control}
              name="agent_user"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agent User</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} placeholder="Agent User ID" type="text" />
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
                    <Input {...field} disabled={isSubmitting} placeholder="YYYY-MM-DD" type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DURATION */}
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue="Y">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Y">Yes</SelectItem>
                        <SelectItem value="N">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* HEADER */}
            <FormField
              control={form.control}
              name="header"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Header</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue="YES">
                      <SelectTrigger>
                        <SelectValue placeholder="Include Header?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="YES">Yes</SelectItem>
                        <SelectItem value="NO">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* STAGE */}
            <FormField
              control={form.control}
              name="stage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stage</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue="tab">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tab">Tab</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PHONE (Optional) */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} placeholder="Phone Number" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SUBMIT BUTTON */}
            <div className="flex items-center justify-center">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Fetching Data" : "Submit"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Card>
  );
}

export default ApiQueryForm;
