import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
// import { getRecordings } from "@/lib/services";
import { cn } from "@/lib/utils";
import { setPerPage, setPrevPage, setNextPage } from "../recordingsSlice";
import { Input } from "@/components/ui/input";
import FilterSelect from "./FilterSelect";
// import { useQuery } from '@tanstack/react-query';

type Props = { className: string; meta: Record<string, any> };

export default function Pagination({ className, meta }: Props) {
  const selector = useAppSelector((state) => state.recordings);
  const dispatch = useAppDispatch();

  return (
    <div className={cn("flex gap-2", className)}>
      <Button
        size="sm"
        variant="outline"
        onClick={() => dispatch(setPrevPage())}
        disabled={Boolean(selector.pagination.page == 1)}
      >
        Previous
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => dispatch(setNextPage())}
        disabled={Boolean(selector.pagination.page == selector.pageCount)}
      >
        Next
      </Button>
      <div className="flex gap-2 items-center text-sm">
        <p>Page Size</p>
        <div>
          <Input
            type="number"
            value={selector.pagination.per_page}
            onChange={(e) => dispatch(setPerPage(e.target.value))}
            name="per_page"
          />
        </div>
        <div>
          <FilterSelect />
        </div>
      </div>
      {meta && (
        <p>
          Total: {meta.total} Page: {meta.current}/{meta.pages}{" "}
        </p>
      )}
    </div>
  );
}
