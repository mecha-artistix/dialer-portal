import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  NonAgentApiSchema,
  NonAgentApiSchemaType,
  ViciAllRecordsSchema,
  ViciRecordsByAgentSchema,
  ViciRecordsByStatusSchema,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { setQueryData } from "../recordingsSlice";
import { ServerResponse } from "@/components/styled/ServerResponse";
import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getDialerConfig } from "@/lib/services";
import { formatDate } from "@/lib/utils";
import { z, ZodObject } from "zod";
import { QueryObserverResult, RefetchOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { setDialers } from "@/features/account/dialerSlice";
import { statusOptions } from "../constants";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { apiFlask } from "@/lib/interceptors";
import { useViciStatusFilter } from "../useViciStatusFilter";
import { useViciAgentFilter } from "../useViciAgentFilter";
import { useViciAllRecordings } from "../useViciAllRecordings";

const testValues = {
  dialer_url: "stsolution.i5.tel",
  user: "6666",
  pass: "hIzIJx2ZdU1Zk",
  date: "2024-10-24",
  folder_name: "vicidial",
};

type VicidialApiFormProps = {
  refetch?: (options?: RefetchOptions) => Promise<QueryObserverResult>;
  queryKey?: any[];
  queryType: "recordingsByStatus" | "recordingsByAgent" | "allRecordings";
};

const formResolver: Record<string, z.ZodObject<any>> = {
  "/recordings-by-status": ViciRecordsByStatusSchema,
  "/recordings-single-agent": ViciRecordsByAgentSchema,
};

type FormFields = z.infer<typeof ViciAllRecordsSchema> &
  Partial<z.infer<typeof ViciRecordsByAgentSchema>> &
  Partial<z.infer<typeof ViciRecordsByStatusSchema>>;

function VicidialApiForm({ queryType }: VicidialApiFormProps) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const dialerSelector = useAppSelector((state) => state.dialers);
  const recordingsSelector = useAppSelector((state) => state.recordings);
  // const [isSingleAgent, setisSingleAgent] = useState(location.pathname === "/recordings-all-agents");
  const isSingleAgent = location.pathname === "/recordings-single-agent";
  const isRecordingsByStatus = location.pathname === "/recordings-by-status";
  const { formData } = location.state || {};

  const form = useForm<FormFields>({
    resolver: zodResolver(formResolver[location.pathname] || ViciAllRecordsSchema),
    defaultValues: { statusFilter: [], agent_user: "" },
  });
  // console.log({ pathname: location.pathname, resolverShape: formResolver[location.pathname]?.shape });

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

  useEffect(() => {
    if (isSuccess && dialers) {
      dispatch(setDialers(dialers));
    }
  }, [isSuccess, dialers, dispatch]);

  useEffect(() => {
    if (formData) {
      form.reset({
        dialer_url: formData.url || "",
        user: formData.user || "",
        pass: formData.pass || "",
        folder_name: formData.folder_name || "",
        // agent_user: isSingleAgent ? "" : "1013",
        date: formatDate(new Date()),
      });
    }
  }, [formData, form]);

  const {
    formState: { isSubmitting },
  } = form;

  const { mutateStatus, isPending, isError, error } = useViciStatusFilter();
  const { mutateAgent } = useViciAgentFilter();
  const { mutateAllRecordings } = useViciAllRecordings();
  function onDialerSelectChange(field) {
    // form.setValue("user", "hello");
    form.reset({
      dialer_url: field,
      user: dialers.find((dialer) => dialer.url === field).user,
      pass: dialers.find((dialer) => dialer.url === field).pass,
      folder_name: dialers.find((dialer) => dialer.url === field).folder_name,
    });
  }

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const parsedData = NonAgentApiSchema.parse(data);
    dispatch(setQueryData(parsedData));
    if (queryType === "recordingsByStatus") {
      mutateStatus({ data: parsedData });
    }
    if (queryType === "recordingsByAgent") {
      mutateAgent({ data: parsedData });
    }
    if (queryType === "allRecordings") {
      mutateAllRecordings({ data: parsedData });
    }
  };

  return (
    <>
      <Card className="p-4">
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
                      <Select value={field.value} onValueChange={(field) => onDialerSelectChange(field)}>
                        <SelectTrigger>
                          <SelectValue placeholder="stsolution.i5.tel" />
                        </SelectTrigger>
                        <SelectContent>
                          {dialerSelector.dialers.map((el) => (
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

              {/* Status Filter */}

              <FormField
                control={form.control}
                name="statusFilter"
                render={({ field }) => (
                  <FormItem className={`${!isRecordingsByStatus && "hidden"}`}>
                    <FormLabel>Select Filter</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <div className="relative w-full">
                            <Input
                              {...field}
                              value={
                                field.value?.length ? field.value.map((status) => status).join(", ") : "Select status"
                              }
                              disabled={isSubmitting}
                              placeholder="Filters ..."
                              type="text"
                            />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-full">
                          <Command>
                            <CommandInput placeholder="Search..." />
                            <CommandList>
                              {statusOptions.map((option) => (
                                <CommandItem key={option}>
                                  <Checkbox
                                    checked={field.value?.includes(option)}
                                    onCheckedChange={(checked) => {
                                      const newValue = checked
                                        ? [...(field.value || []), option]
                                        : field.value?.filter((v) => v !== option) || [];
                                      field.onChange(newValue);
                                    }}
                                    className="mr-2"
                                  />
                                  <span>{option}</span>
                                </CommandItem>
                              ))}
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
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
      {isError && <ServerResponse type="error" message={error.message} />}
    </>
  );
}

export default VicidialApiForm;

/*

  const form = useForm<NonAgentApiSchemaType>({
    resolver: zodResolver(
      useMemo(() => {
        return NonAgentApiSchema.extend({
          agent_user: isSingleAgent
            ? z.string().min(1, "agent is required")
            : z.string().nullable().optional().or(z.literal("")),
          // statusfilter: isRecordingsByStatus
          //   ? z.array(z.string()).min(1, "At least one status must be selected")
          //   : z.array(z.string()).nullable().optional(),
        });
      }, [isSingleAgent, isRecordingsByStatus]), // Update schema when isSingleAgent changes
    ),
    defaultValues: { ...testValues, agent_user: "" },
  });
  const triggerQuery = async (data) => {
    try {
      const res = await queryClient.fetchQuery({
        queryKey: ["recordingsByStatus", data, recordingsSelector],
        queryFn: async () => {
          const response = await apiFlask.post("/portal/recordings", {
            ...data,
            agent_user: "",
            pagination: recordingsSelector.pagination,
          });
          return response.data;
        },
      });

      // Manually set the query data
      queryClient.setQueryData(
        ["recordingsByStatus", recordingsSelector.queryData, recordingsSelector.pagination],
        res,
      );

      return res;
    } catch (error) {
      // Manually set the query error
      queryClient.setQueryData(
        ["recordingsByStatus", recordingsSelector.queryData, recordingsSelector.pagination],
        error,
      );
      throw error;
    }
  };


  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await apiFlask.post("/portal/recordings", {
        ...data,
        agent_user: "",
        pagination: recordingsSelector.pagination,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recordingsByStatus"] });
    },
  });
*/
