"use client";

import React from "react";
import { useRecordings } from "../useRecordings";

function Recordings() {
  const { recordings } = useRecordings();
  console.log({ recordings });
  return <div>{JSON.stringify(recordings)}</div>;
}

export default Recordings;
