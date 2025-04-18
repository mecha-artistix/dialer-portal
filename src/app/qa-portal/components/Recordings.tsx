"use client";

import React from "react";
import { useRecordings } from "../useRecordings";
import RecordingsTable from "./RecordingsTable";

function Recordings() {
  const { recordings } = useRecordings();
  return (
    <div>
      {recordings?.message && <p>recordings.message</p>}
      {recordings?.data && <RecordingsTable data={recordings?.data} />}
    </div>
  );
}

export default Recordings;
