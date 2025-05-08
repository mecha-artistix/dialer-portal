"use client";

import React from "react";
import { useRecordings } from "../useRecordings";
import RecordingsTable from "./RecordingsTable";

function Recordings() {
  const { recordings, isError, error } = useRecordings();
  return (
    <div>
      {isError && <p>Error: {error?.message}</p>}
      {recordings?.data && <RecordingsTable data={recordings?.data?.data} />}
    </div>
  );
}

export default Recordings;
