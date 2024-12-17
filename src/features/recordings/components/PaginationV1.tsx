import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
// import { getRecordings } from "@/lib/services";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useViciQueryMutation } from "../useViciQueryMutation";
import { setNextPage, setPerPage, setPrevPage } from "../recordingsSliceV2";
import { TRecording, TViciResponse } from "@/types/recordings";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FilterParamsForm from "./FilterParamsForm";
// import { useQuery } from '@tanstack/react-query';

type Props = {
  className?: string;
  meta: TViciResponse<TRecording>;
};

export default function PaginationV1({ className, meta }: Props) {
  const paginMutation = useViciQueryMutation();
  const { pagination, pageCount } = useAppSelector((state) => state.recordingsV1);
  const dispatch = useAppDispatch();
  // const [pagination, setPagination] = useState({ page: 1, per_page: 50 });

  useEffect(() => {
    console.log(pagination);
    paginMutation.mutate({ paginationForm: pagination });
  }, [pagination]);

  return (
    <div className={cn("flex gap-2 bg-gray-200 rounded-sm p-2 z-50", className)}>
      <Button
        size="icon"
        variant="outline"
        onClick={() => dispatch(setPrevPage())}
        disabled={paginMutation.isPending || Boolean(pagination.page == 1)}
      >
        <ChevronLeft />
      </Button>
      <Button
        size="icon"
        variant="outline"
        // onClick={() => dispatch(setNextPage())}
        onClick={() => dispatch(setNextPage())}
        disabled={paginMutation.isPending || Boolean(pagination.page == pageCount)}
      >
        <ChevronRight />
      </Button>
      <div className="flex gap-2 items-center">
        <p>Page Size</p>
        <div>
          <Input
            type="text"
            value={pagination.per_page}
            onChange={(e) => dispatch(setPerPage(Number(e.target.value)))}
            // onClick={(e) => setPagination({ ...pagination, per_page: Number(e.target.value) })}
            name="per_page"
            className="h-6 w-7 p-0 rounded-none"
          />
        </div>
        {/* <div>
          <FilterSelect />
        </div> */}

        {meta && (
          <span>
            <strong>Total Recordings:</strong> {meta.total_records} <strong>Page: </strong>
            {meta.current_page}/{meta.total_pages}
          </span>
        )}
      </div>
      <FilterParamsForm />
    </div>
  );
}
