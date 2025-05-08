"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ViciFilterParams, ViciFilterParamsType } from "@/utils/schemas";
import { useRecordingsMutation } from "../useRecordings";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { statusOptions } from "@/lib/constants";

// const filterParams = {};

function ViciFilterParamsForm() {
  //   const recordingsMutation = useViciQueryMutation();
  const form = useForm<ViciFilterParamsType>({
    resolver: zodResolver(ViciFilterParams),
    defaultValues: {
      date: "",
      agent_user: "",
      // status: [""],
      lead_id: "",
      phone_number: "",
    },
  });

  const clearFiltersHandler = () => {
    // form.reset({ agent_user: "", date: "", phone_number: "", status: [] });
    form.reset({ agent_user: "", date: "", phone_number: "" });
  };
  const recordingsMutation = useRecordingsMutation();
  const onSubmitHandler = (data: ViciFilterParamsType) => {
    const parsedData = ViciFilterParams.parse(data);
    try {
      // const parsedData = ViciRequiredParams.parse(data);
      console.log("Parsed Form Data:", parsedData);
      //   dispatch(setFilterParams(parsedData));
      recordingsMutation.mutate(
        { ...data },
        // {
        //   onSuccess: () => {
        //     dispatch(setIsFilterPopoverOpen(false));
        //   },
        // },
      );
      // setOpen(false);
    } catch (error) {
      console.error("Form Submission Error:", error);
      // Optional: Add error toast or user notification
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)}>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-6 items-end">
          {/* DATE */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Date</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={recordingsMutation.isPending}
                    placeholder="YYYY-MM-DD"
                    type="date"
                    className="input-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status Filter */}

          {/* <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Status(s)</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="relative w-full">
                        <Input
                          {...field}
                          className="input-sm"
                          value={
                            field.value?.length ? field?.value?.map((status) => status).join(", ") : "Select status"
                          }
                          disabled={recordingsMutation.isPending}
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
          /> */}

          {/* AGENT USER */}

          <FormField
            control={form.control}
            name="agent_user"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent User</FormLabel>
                <FormControl>
                  <Input
                    className="input-sm"
                    {...field}
                    disabled={recordingsMutation.isPending}
                    placeholder="Agent User ID"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* LEAD ID */}

          <FormField
            control={form.control}
            name="lead_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lead Id</FormLabel>
                <FormControl>
                  <Input
                    className="input-sm"
                    {...field}
                    disabled={recordingsMutation.isPending}
                    placeholder="11191"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PHONE NUMBER */}
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={recordingsMutation.isPending}
                    placeholder="7706569145"
                    type="text"
                    className="input-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SUBMIT BUTTON */}
          <div className="flex gap-1">
            <Button type="submit" variant="default" size="lg" disabled={recordingsMutation.isPending}>
              {recordingsMutation.isPending ? "Applying..." : "Apply"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled={recordingsMutation.isPending}
              onClick={clearFiltersHandler}
            >
              Clear Filters
            </Button>
          </div>
        </div>
        {/* {recordingsMutation.isError && (
                <ServerResponse
                  type="error"
                  message={recordingsMutation.error.message || JSON.stringify(recordingsMutation.error)}
                />
              )} */}
      </form>
    </Form>
  );
}

export default ViciFilterParamsForm;
