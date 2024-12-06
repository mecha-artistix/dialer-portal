import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { getRecordings } from "@/lib/services";
import { ViciRecordsByAgentSchema } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { number, z } from "zod";
export function useViciAgentFilter() {
  const { pagination } = useAppSelector((state) => state.recordings);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { mutate: mutateAgent, isPending } = useMutation({
    mutationFn: async ({
      data,
      pagination,
    }: {
      data: z.infer<typeof ViciRecordsByAgentSchema>;
      pagination: { page: number; per_page: number };
    }) => {
      const response = await getRecordings(data, pagination);
      console.log({ agentHookResoponse: response });
      return response;
    },
    onSuccess: (newData) => {
      queryClient.invalidateQueries({ queryKey: ["recordingsByAgent"] });
      queryClient.setQueryData(["recordingsByAgent"], newData);
      //   dispatch()
    },
    onError: (error) => {
        // Set the error in the query cache
        queryClient.setQueryData(["recordingsByAgent"], { error });
      },
  });

  return { mutateAgent, isPending };
}
