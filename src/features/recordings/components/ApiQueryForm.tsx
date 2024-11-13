import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { apiFlask } from "@/lib/interceptors";
import { NonAgentApiSchema, NonAgentApiSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { setRecordings } from "../recordingsSlice";
import { ServerResponse } from "@/components/styled/ServerResponse";
import { useState } from "react";
import { TServerResponse } from "@/types/server_response";
import { AxiosError } from "axios";

const defaultValues = {
  dialer_url: "stsolution.i5.tel",
  user: "6666",
  pass: "hIzIJx2ZdU1Zk",
  agent_user: "1013",
  stage: "tab",
  date: "2024-11-13",
};

function ApiQueryForm() {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<TServerResponse>({ status: "", message: "" });
  const form = useForm<NonAgentApiSchemaType>({
    resolver: zodResolver(NonAgentApiSchema),
    defaultValues: {
      dialer_url: "stsolution.i5.tel",
      user: "6666",
      pass: "hIzIJx2ZdU1Zk",
      agent_user: "1013",
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
        dispatch(setRecordings([]));
        // Check if response contains data and handle accordingly
        if (response && response.length > 0) {
          dispatch(setRecordings(response));
          setStatus({ status: "success", message: "Recordings found" });
        } else {
          setStatus({ status: "error", message: "No recordings found" });
        }
      } catch (error: unknown) {
        // Handle network errors or no response from server
        if (!error.response) {
          setStatus({ status: "error", message: "Network error. Please check your connection." });
        } else if (error.response.status === 404) {
          setStatus({ status: "error", message: "Endpoint not found (404)." });
        } else if (error.response.status === 500) {
          setStatus({
            status: "error",
            message: error.response.data?.error || "Server error (500). Please try again later.",
          });
        } else {
          // Default error handling for other response errors
          setStatus({
            status: "error",
            message: error.response.data?.error || "An unknown error occurred.",
          });
        }
      }
    };

    getRecordings();
  };
  return (
    <Card className="p-4">
      <ServerResponse type={status.status} message={status.message} />
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

            {/* SUBMIT BUTTON */}
            {/* <div className="flex items-center justify-center"> */}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Fetching Data" : "Submit"}
            </Button>
            {/* </div> */}
          </div>
        </form>
      </Form>
    </Card>
  );
}

export default ApiQueryForm;
