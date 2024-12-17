import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import RecordingsTable from "./components/RecordingsTable";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/hooks/reduxHooks";
import { getRecordingsV1 } from "@/lib/services";
import { ServerResponse } from "@/components/styled/ServerResponse";
import { LinearProgress } from "@/components/ui/LinearProgress";
import RequiredParamsForm from "./components/RequiredParamsForm";
import FilterParamsForm from "./components/FilterParamsForm";
import PaginationV1 from "./components/PaginationV1";
import FilterSheet from "./components/FilterSheet";

export const recordsQueryKey = "recordingsV1";

function Recordings() {
  const { dialer, requiredParams, filterParams, pagination } = useAppSelector((state) => state.recordingsV1);
  const {
    data: recordings,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: [recordsQueryKey],
    queryFn: async () => {
      const response = await getRecordingsV1(requiredParams, filterParams, pagination);
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
  // if (isSuccess) console.log({ recordings });
  return (
    <div className="flex flex-col gap-2 mb-2">
      <RequiredParamsForm />

      <Card className="p-2">
        {/* <CardTitle>cardtitle</CardTitle> */}
        {/* <CardHeader>Dialer Name: {dialer}</CardHeader> */}
        <CardDescription>{/* <FilterSheet /> */}</CardDescription>
        <CardContent>
          {isLoading && <LinearProgress />}

          {isError && <ServerResponse type="error" message={error.message || JSON.stringify(error)} />}
          {recordings?.data?.length && (
            <>
              {/* <FilterParamsForm />   */}
              <PaginationV1 meta={recordings} />
              <RecordingsTable data={recordings.data} dialerName={dialer} />
            </>
          )}
        </CardContent>

        {/* <CardFooter>Pagination</CardFooter> */}
      </Card>
    </div>
  );
}

export default Recordings;
