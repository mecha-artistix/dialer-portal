import { getRecordings } from "@/lib/services";
import { useQuery } from "@tanstack/react-query";

export const useRecordingsQuery = (queryParams) => {
  return useQuery({
    queryKey: ["recordings", queryParams],
    queryFn: () => getRecordings(queryParams),
    enabled: Object.keys(queryParams).length > 0,
    // keepPreviousData: true, // Maintain previous data while loading next page
    staleTime: 5000, // Data considered fresh for 5 seconds
    cacheTime: 30 * 60 * 1000, // Cache for 30 minutes
  });
};
