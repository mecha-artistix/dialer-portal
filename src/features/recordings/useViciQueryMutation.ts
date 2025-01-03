import { ViciFilterParamsType, ViciRequiredParamsType } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { recordsQueryKey } from "./Recordings";
import { getrecordings } from "@/lib/services";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { TPagination } from "@/types/types";
import { setPageCount } from "./recordingsSlice";

type MutationFNProps = {
  requiredForm?: ViciRequiredParamsType;
  filterForm?: ViciFilterParamsType;
  paginationForm?: TPagination;
};

export function useViciQueryMutation() {
  const dispatch = useAppDispatch();
  const { requiredParams, filterParams, pagination } = useAppSelector((state) => state.recordings);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ requiredForm, filterForm, paginationForm }: MutationFNProps) => {
      const viciReqParams = requiredForm || requiredParams;
      if (!viciReqParams.dialer_url || !viciReqParams.user || !viciReqParams.pass)
        throw new Error("Select A Dialer First");
      const viciFiltParams = filterForm || filterParams;
      const viciPaginParams = paginationForm || { ...pagination, page: 1 };
      // console.log("====useViciQueryform====");
      // console.log({ viciReqParams, viciFiltParams, viciPaginParams });
      const response = await getrecordings(viciReqParams, viciFiltParams, viciPaginParams);
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

  return mutation;
}

// export function useQueryFormMutation() {
//   const queryClient = useQueryClient();
//   const queryMutation = useMutation({
//     mutationFn: async (data: ViciRequiredParamsType) => {
//       const response = await getRecordings(data);
//       return response;
//     },
//     onSuccess: (newData) => {
//       queryClient.invalidateQueries({ queryKey: [recordsQueryKey] });
//       queryClient.setQueryData([recordsQueryKey], newData);
//     },
//     onError: (error) => {
//       queryClient.setQueryData([recordsQueryKey], { error });
//     },
//   });
//   return queryMutation;
// }

// export function useRecordingFilterMutation() {
//   const queryClient = useQueryClient();
//   const filterMutation = useMutation({
//     mutationFn: async (filter: ViciFilterParamsType) => {
//       const data = { ...setQueryData, ...filter };
//       const response = await getRecordings(data);
//       return response;
//     },
//     onSuccess: (newData) => {
//       queryClient.invalidateQueries({ queryKey: [recordsQueryKey] });
//       queryClient.setQueryData([recordsQueryKey], newData);
//     },
//     onError: (error) => {
//       queryClient.setQueryData([recordsQueryKey], { error });
//     },
//   });
//   return filterMutation;
// }
