import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { apiFlask } from "@/lib/interceptors";
import { getRecordings } from "@/lib/services";
import { ViciRecordsByStatusSchema } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
export function useViciStatusFilter() {
  //   const { pagination } = useAppSelector((state) => state.recordings);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { queryData } = useAppSelector((state) => state.recordings);
  const {
    mutate: mutateStatus,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({
      formData,
      pagination,
    }: {
      formData?: z.infer<typeof ViciRecordsByStatusSchema>;
      pagination?: { page: number; per_page: number };
    }) => {
      const data = formData || queryData;
      try {
        const response = await apiFlask.post("/portal/recordings", { ...data, ...pagination });
        console.log({ hookResoponse: response });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            throw error.response.data; // Throw full error response
          } else if (error.request) {
            throw { message: "No response received from server." };
          }
        }
        throw { message: "An unexpected error occurred." };
      }
    },
    onSuccess: (newData) => {
      queryClient.invalidateQueries({ queryKey: ["recordingsByStatus"] });
      queryClient.setQueryData(["recordingsByStatus"], newData);
    },
    onError: (error) => {
      // Set the error in the query cache
      queryClient.setQueryData(["recordingsByStatus"], { error });
    },
  });

  return { mutateStatus, isPending, isError, error };
}
