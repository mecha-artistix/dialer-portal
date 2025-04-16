"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LinearProgress } from "./LinearProgress";

export default function RouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 400); // adjust delay as needed
    return () => clearTimeout(timeout);
  }, [pathname]);

  return loading ? <LinearProgress /> : null;
}
