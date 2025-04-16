import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ViciFilterParams, ViciFilterParamsType } from "@/utils/schemas";
import { Command } from "lucide-react";

const filterParams = {};

function ViciFilterParamsForm() {
  //   const filterMutation = useViciQueryMutation();
  const form = useForm<ViciFilterParamsType>({
    resolver: zodResolver(ViciFilterParams),
    defaultValues: {
      date: "filterParams?.date",
      agent_user: "filterParams.agent_user",
      status: "filterParams.status",
      lead_id: "filterParams.lead_id",
      phone_number: "filterParams.phone_number",
    },
  });

  //   const clearFiltersHandler = () => {
  //     form.reset({ agent_user: "", date: "", phone_number: "", status: [] });
  //   };

  const onSubmitHandler = (data: ViciFilterParamsType) => {
    const parsedData = ViciFilterParams.parse(data);
    try {
      // const parsedData = ViciRequiredParams.parse(data);
      console.log("Parsed Form Data:", parsedData);
      //   dispatch(setFilterParams(parsedData));
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)}>
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
                                field.value?.length ? field?.value?.map((status) => status).join(", ") : "Select status"
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
                        disabled={filterMutation.isPending}
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
            </div>
          </DialogDescription>
          {/* {filterMutation.isError && (
                <ServerResponse
                  type="error"
                  message={filterMutation.error.message || JSON.stringify(filterMutation.error)}
                />
              )} */}
        {/* SUBMIT BUTTON */}

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
      </form>
    </Form>
  );
}

export default ViciFilterParamsForm;
