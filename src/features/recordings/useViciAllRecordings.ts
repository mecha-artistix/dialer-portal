import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { getRecordings } from "@/lib/services";
import { ViciRecordsByAgentSchema } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

export function useViciAllRecordings() {
  const { queryData } = useAppSelector((state) => state.recordings);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { mutate: mutateAllRecordings, isPending } = useMutation({
    mutationFn: async ({
      formData,
      pagination,
    }: {
      formData?: z.infer<typeof ViciRecordsByAgentSchema>;
      pagination?: { page: number; per_page: number };
    }) => {
      const data = formData || queryData;
      const response = await getRecordings(data, pagination);
      console.log({ allHookResoponse: response });
      return response;
    },
    onSuccess: (newData) => {
      queryClient.invalidateQueries({ queryKey: ["recordingsAllAgent"] });
      queryClient.setQueryData(["recordingsAllAgent"], newData);
      //   dispatch()
    },
    onError: (error) => {
      // Set the error in the query cache
      queryClient.setQueryData(["recordingsAllAgent"], { error });
    },
  });

  return { mutateAllRecordings, isPending };
}
