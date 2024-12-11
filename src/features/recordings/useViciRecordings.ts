// import { useAppSelector } from "@/hooks/reduxHooks";
import { apiFlask } from "@/lib/interceptors";
import { ViciAllRecordsSchema } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
// type RecordingQueryType = "recordingsByStatus" | "recordingsByAgent" | "allRecordings";
export type RecordingsQueryKey = "recordingsAllAgent" | "recordingsByStatus" | "recordingsByAgent"; // also queryClients

export function useViciRecords(recordingsQueryKey: RecordingsQueryKey) {
  const queryClient = useQueryClient();
  // const { queryData } = useAppSelector((state) => state.recordings);

  const mutation = useMutation({
    mutationFn: async ({
      formData,
      pagination,
    }: {
      formData?: z.infer<typeof ViciAllRecordsSchema>;
      pagination?: { page: number; per_page: number };
    }) => {
      // const data = formData || queryData;
      if (!formData) throw new Error("Submit the form");
      try {
        const response = await apiFlask.post("/portal/recordings", { ...formData, ...pagination });

        console.log(`---response from useViciRecords ${recordingsQueryKey}---`);
        console.log({ APIdata: response.data });

        return response?.data || response;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            throw error.response.data;
          } else if (error.request) {
            throw { message: "No response received from server." };
          }
        }
        throw { message: "An unexpected error occurred." };
      }
    },
    onSuccess: (newData) => {
      //   const queryKey = getQueryKey(recordingsQueryKey);
      queryClient.invalidateQueries({ queryKey: [recordingsQueryKey] });
      queryClient.setQueryData([recordingsQueryKey], newData);
    },
    onError: (error) => {
      //   const queryKey = getQueryKey(recordingsQueryKey);
      queryClient.setQueryData([recordingsQueryKey], { error });
    },
  });

  return mutation;
}
