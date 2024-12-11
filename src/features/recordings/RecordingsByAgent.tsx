import { useAppSelector } from "@/hooks/reduxHooks";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { getRecordings } from "@/lib/services";
import VicidialApiForm from "./components/VicidialApiForm";
import { Actions } from "./components/Actions";
import Pagination from "./components/Pagination";
import { ServerResponse } from "@/components/styled/ServerResponse";
import { LinearProgress } from "@/components/ui/LinearProgress";
import { columns } from "./constants";

function Recordings() {
  const { queryData, pagination } = useAppSelector((state) => state.recordings);
  const isQueryDataValid = queryData !== null;

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["recordingsByAgent"],
    queryFn: async () => {
      const data = { ...queryData, agent_user: "" };
      const response = await getRecordings(data, pagination);
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

  if (isSuccess) console.log({ query_success: data });

  return (
    <div className="flex flex-col gap-2 relative">
      <h1 className="text-3xl font-bold mb-2">Get Recordings For Single Agent</h1>
      <VicidialApiForm recordingsQueryKey="recordingsByAgent" />
      <Pagination
        recordingsQueryKey="recordingsByAgent"
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
            {data?.data?.map((row, i) => (
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
