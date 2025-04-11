import { DialerColumn } from "@/types/types";

export const dialerColumns: DialerColumn[] = [
  { key: "name", title: "Dialer Name", type: "input" },
  { key: "url", title: "Dialer Url", type: "input" },
  { key: "user", title: "User", type: "input" },
  { key: "folder_name", title: "Folder Name", type: "input" },
  { key: "pass", title: "Password", type: "input" },
  { key: "actions", title: "Actions", type: "action" },
];

export const DIALER_SERVER = "91.107.210.97";
export const DIALER_REPORTS = "http://91.107.210.97/vicidial/realtime_report.php";
