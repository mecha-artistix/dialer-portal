import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TranscriptionsForm, TranscriptionsFormType } from "@/schemas";
import { statusOptions } from "@/features/recordings/constants";
import useTranscriptions from "../useTranscriptions";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useQueryClient } from "@tanstack/react-query";

function ConfigurTranscriptionsForm() {
  const selector = useAppSelector((state) => state.recordings);
  const form = useForm<TranscriptionsFormType>({
    resolver: zodResolver(TranscriptionsForm),
    defaultValues: { email: "" },
  });
  const { mutate, isPending } = useTranscriptions();
  const queryClient = useQueryClient();

  const onSubmit = (data: TranscriptionsFormType) => {
    const { dialer_url } = selector.requiredParams;
    const { status } = selector.filterParams;
    const recordingData = queryClient.getQueryData(["recordings"]);
    // console.log({ email: data.email, dialer_url, status, recordings: recordingData.data });

    if (status)
      mutate({ email: data.email, dialer: dialer_url, status, recordings: recordingData.data.map((i) => i.location) });
  };

  // get status - recordings of specific status
  // get dialer - email recording to customers of the dialer

  return (
    <>
      {/* <p>status: {selector.filterParams.status}</p>
      <p>Dialer: {selector.requiredParams.dialer_url}</p> */}
      <p>To send transcriptios of below rendered list.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email" />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}

export default ConfigurTranscriptionsForm;

{
  /* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Status</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="STATUS" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button type="submit" variant="default" size="lg" disabled={isPending}>
            {isPending ? "Sending..." : "Send"}
          </Button>
        </form>
      </Form> */
}
