"use client";

import { getRecordingsSA } from "@/actions/recordingsSA";
import { ViciFilterParamsType } from "@/utils/schemas";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
("http://stsolution.i5.tel/vicidial/non_agent_api.php?source=test&function=recording_lookup&stage=tab&user=6666&pass=hIzIJx2ZdU1Zk&agent_user=1013&date=2024-10-24&duration=Y&header=YES");
//91.107.210.97/vicidial/non_agent_api_V2.php?function=recording_status_filter&user=6666&pass=DAR3UI49T5MV2&date=2025-04-15&agent_user=&duration=Y&header=YES&stage=tab&source=test&page=1&per_page=50&status=&phone_number=&lead_id=10160480

const QUERYKEY = "recordings";

// const getrecordings = async (viciParams: ViciFilterParamsType) => {
//   const ROOT_URL = process.env.NEXT_PUBLIC_DIALER;
//   const DIALER_USER = process.env.NEXT_PUBLIC_DIALER_USER;
//   const DIALER_PASSWORD = process.env.NEXT_PUBLIC_DIALER_PASSWORD;
//   const url = `${ROOT_URL}/vicidial/non_agent_api_V2.php?function=recording_status_filter&user=${DIALER_USER}&pass=${DIALER_PASSWORD}&header=YES&stage=tab&source=test&date=${"2025-04-15"}&agent_user=&duration=Y&page=1&per_page=50&status=&phone_number=&lead_id=${""}`;
//   try {
//     const response = await axios.get(url, { responseType: "text" });
//     const html = response.data;
//     // extract plain text from the body
//     const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
//     const bodyText = match ? match[1].split("<")[0].trim() : "";
//     // example: "ERROR: recording_lookup NO RECORDINGS FOUND - 6666|1013||2024-10-24|"
//     const parts = bodyText.split(" - ");
//     const message = parts[0];
//     const data = parts[1]?.split("|");

//     console.log({ message, data });
//     return { message, data };
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       if (error.response) {
//         throw error.response.data; // Throw full error response
//       } else if (error.request) {
//         throw { message: "No response received from server." };
//       }
//     }
//     throw { message: "An unexpected error occurred." };
//   }
// };

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
      return response;
    },
    enabled: false,
    retry: 0,
    select: (data) => {
      if (data?.message) {
        throw data.message;
      }
      return data;
    },
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
      queryClient.invalidateQueries({ queryKey: [QUERYKEY] });
      queryClient.setQueryData([QUERYKEY], { error });
    },
  });

  return mutation;
}
