import { useAppSelector } from "@/hooks/reduxHooks";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ApiQueryForm from "./components/ApiQueryForm";

import { Actions } from "./components/Actions";

interface LeadData {
  lead_id: string;
  location: string;
  recording_id: string;
  start_time: string;
  url: string;
  user: string;
}

const columns = [
  { key: "lead_id", title: "Lead Id" },
  { key: "location", title: "Location" },
  { key: "recording_id", title: "Recording Id" },
  { key: "start_time", title: "Start Time" },
  { key: "url", title: "Url", className: "w-10" },
  { key: "user", title: "User" },
  { key: "actions", title: "Actions" },
];

function Recordings() {
  const recordingsState = useAppSelector((state) => state.recordings);

  return (
    <div>
      <ApiQueryForm />
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
          {recordingsState.recordings.map((row, i) => (
            <TableRow key={i}>
              {columns.map((col, i) =>
                col.key === "actions" ? (
                  <TableCell>
                    <Actions url={row.url as string} />
                  </TableCell>
                ) : (
                  <TableCell key={i} className={col?.className}>
                    {row[col.key]}
                  </TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Recordings;
