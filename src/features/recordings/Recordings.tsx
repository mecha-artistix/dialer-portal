import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { apiFlask } from "@/lib/interceptors";
import { useEffect } from "react";
import { setRecordings } from "./recordingsSlice";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ApiQueryForm from "./components/ApiQueryForm";

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
];

function Recordings() {
  const recordingsState = useAppSelector((state) => state.recordings);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const getRecordings = async () => {
  //     const response = await apiFlask("/recordings");
  //     console.log(response);
  //     dispatch(setRecordings(response));
  //   };
  //   getRecordings();
  // }, []);

  return (
    <div>
      <ApiQueryForm />
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
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
              {columns.map((col, i) => (
                <TableCell key={i} className={col?.className}>
                  {row[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Recordings;
