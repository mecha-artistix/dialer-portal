import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { columns } from "../constants";
import { Actions } from "./Actions";
import { TRecording } from "@/types/recordings";
import { LinearProgress } from "@/components/ui/LinearProgress";
import { useViciQueryMutation } from "../useViciQueryMutation";

type RecordingsTableProps = {
  data: TRecording[];
  dialerName?: string | null;
};
function RecordingsTable({ data, dialerName }: RecordingsTableProps) {
  const mutation = useViciQueryMutation();

  return (
    <div className="max-h-full overflow-auto">
      {mutation.isPending && <LinearProgress />}
      <Table className="table-fixed w-full">
        <TableCaption>A list of recordings from {dialerName}</TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key} className={`${col?.className}`}>
                {col.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              {columns.map((col) =>
                col.key === "actions" ? (
                  <TableCell key={`${col.key}`} className={`${col?.className}`}>
                    <Actions url={`${row.location}`} />
                  </TableCell>
                ) : (
                  <TableCell key={`${col.key}`} className={`${col?.className}`}>
                    {row[col.key]}
                  </TableCell>
                ),
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default RecordingsTable;
