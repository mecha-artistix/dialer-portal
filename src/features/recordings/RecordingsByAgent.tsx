import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { getRecordings } from "@/lib/services";
import VicidialApiForm from "./components/VicidialApiForm";
import { Actions } from "./components/Actions";
import Pagination from "./components/Pagination";
import { setPageCount } from "./recordingsSlice";
import { ServerResponse } from "@/components/styled/ServerResponse";
import { useEffect } from "react";
import { LinearProgress } from "@/components/ui/LinearProgress";
import { useLocation } from "react-router-dom";
import { columns } from "./constants";

interface LeadData {
  lead_id: string;
  location: string;
  recording_id: string;
  start_time: string;
  status: string;
  user: string;
}

// {
//   "lead_id": "12112285",
//   "location": "http://49.13.132.97/RECORDINGS/MP3/20241024-115453_9856370652-all.mp3",
//   "recording_id": "414425",
//   "start_time": "2024-10-24 11:54:53",
//   "status": "A",
//   "user": "1013"
// }

function Recordings() {
  // const recordingsState = useAppSelector((state) => state.recordings);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.recordings);
  const isQueryDataValid = selector.queryData !== null;

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["recordingsByAgent", selector.queryData, selector.pagination, selector.statusFilter, location.pathname],
    queryFn: () => getRecordings(selector.queryData, selector.pagination, selector.statusFilter),
    enabled: isQueryDataValid,
    // enabled: false,
    retry: 0,
    // keepPreviousData: true,
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setPageCount(data.total_pages));
    }
  }, [isSuccess, data, dispatch]);

  if (isError) {
    // return <ServerResponse type="error" message={error.message}/>
  }

  return (
    <div className="flex flex-col gap-2 relative">
      <h1 className="text-3xl font-bold mb-2">Get Recordings For Single Agent</h1>
      <VicidialApiForm />
      <Pagination
        className="my-4"
        meta={{
          total: data?.total_records,
          pages: data?.total_pages,
          showing: data?.showing,
          current: data?.current_page,
        }}
      />
      {isError && <ServerResponse type="error" message={JSON.stringify(error)} />}
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Table>
          <TableCaption>A list of recordings.</TableCaption>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key}>{col.title}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((row, i) => (
              <TableRow key={i}>
                {columns.map((col, i) =>
                  col.key === "actions" ? (
                    <TableCell key={`${col.key}i`}>
                      <Actions url={row.location as string} />
                    </TableCell>
                  ) : (
                    <TableCell key={`${col.key}i`} className={col?.className}>
                      {row[col.key]}
                    </TableCell>
                  ),
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default Recordings;
