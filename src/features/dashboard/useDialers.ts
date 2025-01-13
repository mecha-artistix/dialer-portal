import { getDialerConfig } from "@/lib/services";
import { useQuery } from "@tanstack/react-query";

export function useDialers() {
  const {
    data: dialers,
    isLoading,
    isSuccess,
    error,
    isError,
  } = useQuery({
    queryKey: ["dialers"],
    queryFn: () => getDialerConfig(),
    enabled: true,
    retry: 0,
  });
  return { dialers, isLoading, isSuccess, error, isError };
}
