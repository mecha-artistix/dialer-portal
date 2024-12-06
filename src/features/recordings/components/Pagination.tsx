import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
// import { getRecordings } from "@/lib/services";
import { cn } from "@/lib/utils";
import { setPerPage, setPrevPage, setNextPage } from "../recordingsSlice";
import { Input } from "@/components/ui/input";
import FilterSelect from "./FilterSelect";
import { useEffect, useRef, useState } from "react";
import { useViciStatusFilter } from "../useViciStatusFilter";
import { useViciAgentFilter } from "../useViciAgentFilter";
import { useViciAllRecordings } from "../useViciAllRecordings";
// import { useQuery } from '@tanstack/react-query';

type Props = {
  className: string;
  meta: Record<string, any>;
  queryType: "recordingsByStatus" | "recordingsByAgent" | "allRecordings";
};

export default function Pagination({ className, meta, queryType }: Props) {
  const { queryData } = useAppSelector((state) => state.recordings);
  const [pagination, setPagination] = useState({ page: 1, per_page: 50 });
  const dispatch = useAppDispatch();
  const { mutateStatus } = useViciStatusFilter();
  const { mutateAgent } = useViciAgentFilter();
  const { mutateAllRecordings } = useViciAllRecordings();

  useEffect(() => {
    if (queryType === "recordingsByStatus") mutateStatus({ pagination });
    if (queryType === "recordingsByAgent") mutateAgent({ pagination });
    if (queryType === "allRecordings") mutateAllRecordings({ pagination });
  }, [pagination]);

  return (
    <div className={cn("flex gap-2 sticky top-0 bg-gray-200 rounded-sm p-2 z-50", className)}>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
        disabled={Boolean(pagination.page == 1)}
      >
        Previous
      </Button>
      <Button
        size="sm"
        variant="outline"
        // onClick={() => dispatch(setNextPage())}
        onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
        disabled={Boolean(pagination.page == meta.total)}
      >
        Next
      </Button>
      <div className="flex gap-2 items-center text-sm">
        <p>Page Size</p>
        <div>
          <Input
            type="number"
            value={pagination.per_page}
            onChange={(e) => dispatch(setPerPage(e.target.value))}
            onClick={(e) => setPagination({ ...pagination, per_page: Number(e.target.value) })}
            name="per_page"
          />
        </div>
        {/* <div>
          <FilterSelect />
        </div> */}
      </div>
      {meta && (
        <p>
          Total: {meta.total} Page: {meta.current}/{meta.pages}{" "}
        </p>
      )}
    </div>
  );
}
