import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RECORDINGS_COLUMNS } from "@/lib/constants";
// import { LinearProgress } from "@/components/ui/LinearProgress";
import Actions from "./Actions";
import { TRecording } from "@/types/recordings";
import { useRecordings } from "../useRecordings";

type Props = { data: TRecording[] };

function RecordingsTable({ data }: Props) {
  return (
    // <div className="max-h-full overflow-auto">
    //   {mutation.isPending && <LinearProgress />}
    <Table className="table-fixed w-full">
      <TableCaption>A list of recordings from dialer</TableCaption>
      <TableHeader>
        <TableRow>
          {RECORDINGS_COLUMNS.map((col) => (
            <TableHead key={col.key} className={`${col?.className}`}>
              {col.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.recording_id}>
            {" "}
            {/* or another truly unique field */}
            {RECORDINGS_COLUMNS.map((col) =>
              col.key === "actions" ? (
                <TableCell key={`${col.key}-${row.recording_id}`} className={col?.className}>
                  <Actions url={`${row.location}`} />
                </TableCell>
              ) : (
                <TableCell key={`${col.key}-${row.recording_id}`} className={col?.className}>
                  {row[col.key]}
                </TableCell>
              ),
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    // </div>
  );
}

export default RecordingsTable;
