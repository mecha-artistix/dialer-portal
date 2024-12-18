// dialer_url, user, pass, date

import { ViciFilterParams, ViciFilterParamsType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useViciQueryMutation } from "../useViciQueryMutation";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { statusOptions } from "../constants";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setFilterParams, setIsFilterPopoverOpen } from "../recordingsSliceV2";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ServerResponse } from "@/components/styled/ServerResponse";

const testValues = {
  date: "2024-10-24",
  folder_name: "vicidial",
  agent_user: "1001",
  status: ["A"],
};

function FilterParamsForm() {
  const { filterParams, isFilterPopoverOpen } = useAppSelector((state) => state.recordingsV1);
  const dispatch = useAppDispatch();
  // const [open, setOpen] = useState(false);
  const filterMutation = useViciQueryMutation();
  const form = useForm<ViciFilterParamsType>({
    resolver: zodResolver(ViciFilterParams),
    defaultValues: {
      date: filterParams.date,
      agent_user: filterParams.agent_user,
      status: filterParams.status,
      folder_name: filterParams.folder_name,
      phone_number: filterParams.phone_number,
    },
  });

  const clearFiltersHandler = () => {
    form.reset({ agent_user: "", date: "", folder_name: "", phone_number: "", status: [] });
  };

  const onSubmitHandler = (data: ViciFilterParamsType) => {
    console.log("Form Submit Triggered", { data });
    const parsedData = ViciFilterParams.parse(data);
    try {
      // const parsedData = ViciRequiredParams.parse(data);
      console.log("Parsed Form Data:", parsedData);
      dispatch(setFilterParams(parsedData));
      filterMutation.mutate(
        { filterForm: parsedData },
        {
          onSuccess: () => {
            dispatch(setIsFilterPopoverOpen(false));
          },
        },
      );
      // setOpen(false);
    } catch (error) {
      console.error("Form Submission Error:", error);
      // Optional: Add error toast or user notification
    }
  };

  return (
    <Dialog
      open={isFilterPopoverOpen}
      onOpenChange={(open) => {
        dispatch(setIsFilterPopoverOpen(open));
      }}
    >
      <DialogTrigger>{/* <Button>Filter</Button> */}</DialogTrigger>

      <DialogContent className="max-w-fit">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitHandler)}>
            <DialogHeader>
              <DialogTitle>Apply Filters to get filtered data</DialogTitle>
              <DialogDescription>
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-end">
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
                            disabled={filterMutation.isPending}
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

                  <FormField
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
                                    field.value?.length
                                      ? field?.value?.map((status) => status).join(", ")
                                      : "Select status"
                                  }
                                  disabled={filterMutation.isPending}
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
                      <FormItem>
                        <FormLabel>Agent User</FormLabel>
                        <FormControl>
                          <Input
                            className="input-sm"
                            {...field}
                            disabled={filterMutation.isPending}
                            placeholder="Agent User ID"
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
                            disabled={filterMutation.isPending}
                            placeholder="7706569145"
                            type="text"
                            className="input-sm"
                          />
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
                          <Input
                            {...field}
                            disabled={filterMutation.isPending}
                            placeholder="vicidial"
                            type="text"
                            className="input-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </DialogDescription>
              {filterMutation.isError && (
                <ServerResponse
                  type="error"
                  message={filterMutation.error.message || JSON.stringify(filterMutation.error)}
                />
              )}
            </DialogHeader>
            {/* SUBMIT BUTTON */}

            <DialogFooter className="mt-2">
              <Button
                type="button"
                variant="outline"
                size="lg"
                disabled={filterMutation.isPending}
                onClick={clearFiltersHandler}
              >
                Clear Filters
              </Button>
              <Button type="submit" variant="default" size="lg" disabled={filterMutation.isPending}>
                {filterMutation.isPending ? "Applying..." : "Apply"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default FilterParamsForm;
