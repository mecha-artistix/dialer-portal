import { Card, CardContent } from "@/components/ui/card";
import RecordingsTable from "./components/RecordingsTable";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/hooks/reduxHooks";
import { getrecordings } from "@/lib/services";
import { ServerResponse } from "@/components/styled/ServerResponse";
import { LinearProgress } from "@/components/ui/LinearProgress";
import RequiredParamsForm from "./components/RequiredParamsForm";
import FilterParamsForm from "./components/FilterParamsForm";
import Pagination from "./components/Pagination";

export const recordsQueryKey = "recordings";

function Recordings() {
  const { dialer, requiredParams, filterParams, pagination } = useAppSelector((state) => state.recordings);
  const {
    data: recordings,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [recordsQueryKey],
    queryFn: async () => {
      const response = await getrecordings(requiredParams, filterParams, pagination);
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
        {isLoading && <LinearProgress />}
        <FilterParamsForm />

        <CardContent>
          {isError && <ServerResponse type="error" message={error.message || JSON.stringify(error)} />}
          {recordings?.data?.length && (
            <>
              {/* <FilterParamsForm />   */}
              <Pagination meta={recordings} />
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
