import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
// import { getRecordings } from "@/lib/services";
import { cn } from "@/lib/utils";
import { setPerPage, setPrevPage, setNextPage } from "../recordingsSlice";
import { Input } from "@/components/ui/input";
import FilterSelect from "./FilterSelect";
import { useEffect } from "react";
import { useViciStatusFilter } from "../useViciStatusFilter";
import { useViciAgentFilter } from "../useViciAgentFilter";
// import { useQuery } from '@tanstack/react-query';

type Props = { className: string; meta: Record<string, any> };

export default function Pagination({ className, meta }: Props) {
  const { pagination } = useAppSelector((state) => state.recordings);
  const dispatch = useAppDispatch();
  const { mutateStatus } = useViciStatusFilter();
  const { mutateAgent } = useViciAgentFilter();

  useEffect(() => {
    mutateStatus({ pagination });
  }, [pagination]);

  return (
    <div className={cn("flex gap-2 sticky top-0 bg-gray-200 rounded-sm p-2 z-50", className)}>
      <Button
        size="sm"
        variant="outline"
        onClick={() => dispatch(setPrevPage())}
        disabled={Boolean(pagination.page == 1)}
      >
        Previous
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => dispatch(setNextPage())}
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
