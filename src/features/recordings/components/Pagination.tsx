import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/reduxHooks";
// import { getRecordings } from "@/lib/services";
import { cn } from "@/lib/utils";
import { setPerPage } from "../recordingsSlice";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

import { RecordingsQueryKey, useViciRecords } from "../useViciRecordings";
// import { useQuery } from '@tanstack/react-query';

type Props = {
  className: string;
  meta: Record<string, any>;
  recordingsQueryKey: RecordingsQueryKey;
};

export default function Pagination({ className, meta, recordingsQueryKey }: Props) {
  const mutation = useViciRecords(recordingsQueryKey);
  const [pagination, setPagination] = useState({ page: 1, per_page: 50 });
  const dispatch = useAppDispatch();

  useEffect(() => {
    mutation.mutate({ pagination });
  }, [pagination]);

  return (
    <div className={cn("flex gap-2 sticky top-0 bg-gray-200 rounded-sm p-2 z-50", className)}>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
        disabled={mutation.isPending || Boolean(pagination.page == 1)}
      >
        Previous
      </Button>
      <Button
        size="sm"
        variant="outline"
        // onClick={() => dispatch(setNextPage())}
        onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
        disabled={mutation.isPending || Boolean(pagination.page == meta.total)}
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
