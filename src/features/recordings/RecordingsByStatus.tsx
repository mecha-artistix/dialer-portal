import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import VicidialApiForm from "./components/VicidialApiForm";
import { Actions } from "./components/Actions";
import Pagination from "./components/Pagination";
import { setPageCount } from "./recordingsSlice";
import { ServerResponse } from "@/components/styled/ServerResponse";
import { useEffect } from "react";
import { LinearProgress } from "@/components/ui/LinearProgress";
import { useLocation } from "react-router-dom";
import { columns } from "./constants";
import { apiFlask } from "@/lib/interceptors";

function RecordingsByStatus() {
  // const recordingsState = useAppSelector((state) => state.recordings);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.recordings);
  const isQueryDataValid = selector.queryData !== null;

  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["recordingsByStatus", selector.queryData, selector.pagination],
    queryFn: async ({ queryKey }) => {
      const [_key, queryData, pagination] = queryKey;
      // return getRecordings({ ...queryData, agent_user: "" }, pagination);
      const response = await apiFlask.post("/portal/recordings", { ...queryData, agent_user: "", pagination });
      return response.data;
    },
    enabled: false,
    retry: 0,
    refetchOnMount: "always",
    staleTime: 0,
  });
  if (isError) console.log("error in status records", error);
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setPageCount(data.total_pages));
    }
  }, [isSuccess, data, dispatch]);

  if (isSuccess) console.log({ success: data });

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold mb-2">Get Recordings By Status</h1>
      <VicidialApiForm refetch={refetch} />
      <Pagination
        className="my-4"
        meta={{
          total: data?.total_records,
          pages: data?.total_pages,
          showing: data?.showing,
          current: data?.current_page,
        }}
      />
      {isError && (
        <ServerResponse type="error" message={error?.response?.data?.error || error.message || JSON.stringify(error)} />
      )}
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

export default RecordingsByStatus;
