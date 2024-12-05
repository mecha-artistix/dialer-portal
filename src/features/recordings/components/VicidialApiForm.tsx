import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { NonAgentApiSchema, NonAgentApiSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { setRecordings, setQueryData } from "../recordingsSlice";
import { ServerResponse } from "@/components/styled/ServerResponse";
import { useEffect, useMemo, useState } from "react";
import { TServerResponse } from "@/types/server_response";
import { useLocation } from "react-router-dom";
import { getRecordings } from "@/lib/services";
import { formatDate } from "@/lib/utils";
import { z } from "zod";

const testValues = {
  dialer_url: "stsolution.i5.tel",
  user: "6666",
  pass: "hIzIJx2ZdU1Zk",
  date: "2024-10-24",
  folder_name: "vicidial",
};

function VicidialApiForm() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const selector = useAppSelector((state) => state.dialers);
  // const [isSingleAgent, setisSingleAgent] = useState(location.pathname === "/recordings-all-agents");
  const isSingleAgent = location.pathname === "/recordings-single-agent";
  const { formData } = location.state || {};

  const form = useForm<NonAgentApiSchemaType>({
    resolver: zodResolver(
      useMemo(() => {
        return NonAgentApiSchema.extend({
          agent_user: isSingleAgent
            ? z.string().min(1, "agent is required")
            : z.string().nullable().optional().or(z.literal("")),
        });
      }, [isSingleAgent]), // Update schema when isSingleAgent changes
    ),
    defaultValues: { ...testValues, agent_user: isSingleAgent ? "" : "" },
  });

  useEffect(() => {
    if (formData) {
      form.reset({
        dialer_url: formData.url || "",
        user: formData.user || "",
        pass: formData.pass || "",
        folder_name: formData.folder_name || "",
        agent_user: isSingleAgent ? "" : "1013",
        date: formatDate(new Date()),
      });
      console.log(isSingleAgent);
    }
  }, [formData, form]);
  console.log({ location, isSingleAgent });
  console.log({ formData });
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<NonAgentApiSchemaType> = async (data) => {
    const parsedData = NonAgentApiSchema.parse(data);
    console.log({ parsed_data: parsedData });
    dispatch(setQueryData(parsedData));
  };

  const onError = (err) => {
    console.log({ err });
  };
  return (
    <Card className="p-4">
      {/* <ServerResponse type={status.status} message={status.message} /> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)}>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-end">
            {/* DIALER URL */}
            <FormField
              control={form.control}
              name="dialer_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dialer Url</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="stsolution.i5.tel" />
                      </SelectTrigger>
                      <SelectContent>
                        {selector.dialers.map((el) => (
                          <SelectItem key={el.id} value={el.url}>
                            {el.url}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <Input {...field} disabled={isSubmitting} placeholder="User ID" type="text" required />
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
                    <Input {...field} disabled={isSubmitting} placeholder="Password" type="text" />
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
                <FormItem className={`${!isSingleAgent && "hidden"}`}>
                  <FormLabel>Agent User</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} placeholder="Agent User ID" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* FOLDER NAME */}
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

export default VicidialApiForm;

/*

    const getRecordings = async () => {
      try {
        const response = await apiFlask.post("/portal/recordings", parsedData);
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


*/
