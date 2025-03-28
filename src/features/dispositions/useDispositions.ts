import { generateJSONFromVicidialTabData } from "@/utils/tabtoJson";
import { useQuery } from "@tanstack/react-query";

function useDispositions() {
  const {
    data: dispositions,
    isLoading,
    refetch,
    error,
    isError,
  } = useQuery({
    queryKey: ["dispositions"],
    queryFn: async () => {
      const response = await fetch(
        "http://91.107.210.97/vicidial/non_agent_api_V2.php?function=call_dispo_report&user=6666&pass=DAR3UI49T5MV2&campaigns=---ALL---&status_breakdown=1&show_percentages=1&statuses=---ALL---&user_groups=---ALL---&search_archived_data=checked",
      );
      const textData = await response.text();
      const jsonData = generateJSONFromVicidialTabData(textData);
      console.log({ jsonData });

      return textData;
    },
    enabled: false,
    retry: 0,
  });

  return {
    dispositions,
    isLoading,
    refetch,
    error,
    isError,
  };
}

export default useDispositions;
