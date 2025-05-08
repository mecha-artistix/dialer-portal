"use client";

import { getRecordingsSA } from "@/actions/recordingsSA";
import { ViciFilterParamsType } from "@/utils/schemas";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
("http://stsolution.i5.tel/vicidial/non_agent_api.php?source=test&function=recording_lookup&stage=tab&user=6666&pass=hIzIJx2ZdU1Zk&agent_user=1013&date=2024-10-24&duration=Y&header=YES");
//91.107.210.97/vicidial/non_agent_api_V2.php?function=recording_status_filter&user=6666&pass=DAR3UI49T5MV2&date=2025-04-15&agent_user=&duration=Y&header=YES&stage=tab&source=test&page=1&per_page=50&status=&phone_number=&lead_id=10160480

const QUERYKEY = "recordings";

export function useRecordings() {
  const {
    data: recordings,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [QUERYKEY],
    queryFn: async () => {
      const response = await getRecordingsSA();
      console.log(response);
      return response;
    },
    enabled: false,
    retry: 0,
    // select: (data) => {
    //   if (data?.message) {
    //     throw new Error(data.message);
    //   }
    //   return data;
    // },
  });

  return { recordings, isLoading, isError, error };
}

export function useRecordingsMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (viciFilterParams: ViciFilterParamsType) => {
      //   const viciPaginParams = paginationForm || { ...pagination, page: 1 };
      // console.log("====useViciQueryform====");
      // console.log({ viciReqParams, viciFiltParams, viciPaginParams });
      const response = await getRecordingsSA(viciFilterParams);
      return response;
    },
    onMutate: (variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERYKEY] });
      return variables;
    },
    onSuccess: (newData) => {
      // console.log({ variables, context });
      //   dispatch(setPageCount(Number(newData.total_records)));
      // queryClient.invalidateQueries({ queryKey: [QUERYKEY] });
      queryClient.setQueryData([QUERYKEY], newData);
    },
    onError: (error) => {
      console.log({ error });
      queryClient.setQueryData([QUERYKEY], () => {
        throw error; // or: return { error: true, message: error.message }
      });
    },
  });

  return mutation;
}
