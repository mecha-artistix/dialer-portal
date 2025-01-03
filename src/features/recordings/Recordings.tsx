import { Card, CardContent } from "@/components/ui/card";
import RecordingsTable from "./components/RecordingsTable";
import { useAppSelector } from "@/hooks/reduxHooks";
import { ServerResponse } from "@/components/styled/ServerResponse";
import { LinearProgress } from "@/components/ui/LinearProgress";
import RequiredParamsForm from "./components/RequiredParamsForm";
import FilterParamsForm from "./components/FilterParamsForm";
import Pagination from "./components/Pagination";
import useRecordings from "./useRecordings";

export const recordsQueryKey = "recordings";

function Recordings() {
  const { dialer } = useAppSelector((state) => state.recordings);
  const { recordings, isLoading, isError, error } = useRecordings();

  return (
    <div className="flex flex-col gap-2 mb-2">
      <RequiredParamsForm />

      <Card className="p-2">
        {/* <CardTitle>cardtitle</CardTitle> */}
        {/* <CardHeader>Dialer Name: {dialer}</CardHeader> */}
        {isLoading && <LinearProgress />}
        <FilterParamsForm />

        <CardContent>
          {isError && <ServerResponse type="error" message={error?.message || JSON.stringify(error)} />}
          {recordings?.data && (
            <>
              {/* <FilterParamsForm />   */}
              <Pagination meta={recordings} />
              <RecordingsTable data={recordings.data} dialerName={dialer} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Recordings;
