import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
("http://stsolution.i5.tel/vicidial/non_agent_api.php?source=test&function=recording_lookup&stage=tab&user=6666&pass=hIzIJx2ZdU1Zk&agent_user=1013&date=2024-10-24&duration=Y&header=YES");
//91.107.210.97/vicidial/non_agent_api_V2.php?function=recording_status_filter&user=6666&pass=DAR3UI49T5MV2&date=2025-04-15&agent_user=&duration=Y&header=YES&stage=tab&source=test&page=1&per_page=50&status=&phone_number=&lead_id=10160480

const getrecordings = async () => {
  const response = axios.get();
};

function useRecordings() {
  //   const ROOT_URL = process.env.ROOT_URL;
  const ROOT_URL =
    "http://91.107.210.97/vicidial/non_agent_api.php?source=test&function=recording_lookup&stage=tab&user=6666&pass=DAR3UI49T5MV2&agent_user=1013&date=2024-10-24&duration=Y&header=YES";

  const {
    data: recordings,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["recordings"],
    queryFn: async ({ data }) => {
      const response = await axios.get(`${ROOT_URL}/api/recordings`, data);
      return response;
    },
    enabled: false,
    retry: 0,
    select: (data) => {
      if (data?.error) {
        throw data.error;
      }
      return data;
    },
  });

  return { recordings, isLoading, isError, error };
}

export default useRecordings;

export function useMutateRecordings() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ viciFilterParams }) => {
      const viciReqParams = requiredForm || requiredParams;
      if (!viciReqParams.dialer_url || !viciReqParams.user || !viciReqParams.pass)
        throw new Error("Select A Dialer First");
      const viciFiltParams = filterForm || filterParams;
      const viciPaginParams = paginationForm || { ...pagination, page: 1 };
      // console.log("====useViciQueryform====");
      // console.log({ viciReqParams, viciFiltParams, viciPaginParams });
      const response = await getrecordings(viciFilterParams);
      return response;
    },
    onMutate: (variables) => {
      queryClient.invalidateQueries({ queryKey: [recordsQueryKey] });
      return variables;
    },
    onSuccess: (newData) => {
      // console.log({ variables, context });
      dispatch(setPageCount(Number(newData.total_records)));
      // queryClient.invalidateQueries({ queryKey: [recordsQueryKey] });
      queryClient.setQueryData([recordsQueryKey], newData);
    },
    onError: (error) => {
      console.log({ error });
      queryClient.invalidateQueries({ queryKey: [recordsQueryKey] });
      queryClient.setQueryData([recordsQueryKey], { error });
    },
  });
}
