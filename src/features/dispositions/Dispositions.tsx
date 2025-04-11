import { Button } from "@/components/ui/button";
import StatBox from "./components/statbox";
import useDispositions from "./useDispositions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Dispositions() {
  const { dispositions, isError, error } = useDispositions();

  const campaigns = dispositions?.map(({ ["TOTAL CALLS"]: totalCalls, CAMPAIGN }) => ({
    totalCalls,
    CAMPAIGN,
  }));
  return (
    <>
      <div className="flex flex-row"></div>
      {dispositions && (
        <Tabs defaultValue="TOTAL" className="">
          <TabsList className="bg-slate-200 p-2">
            {campaigns.map((dialer) => (
              <TabsTrigger
                key={dialer.CAMPAIGN || "NAN"}
                value={dialer.CAMPAIGN || "NAN"}
                className="border border-slate-300 rounded-sm gap-2"
              >
                {dialer.CAMPAIGN || "NAN"}
              </TabsTrigger>
            ))}
          </TabsList>
          {dispositions.map((campaign) => (
            <TabsContent key={campaign.CAMPAIGN || "NAN"} value={campaign.CAMPAIGN || "NAN"}>
              <div>
                <p>
                  Total Calls: <strong>{campaign["TOTAL CALLS"]}</strong>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {Object.keys(campaign)
                    .filter((key) => key != "TOTAL CALLS" && key != "CAMPAIGN")
                    .map((key) => (
                      <StatBox key={key} name={key} value={campaign[key]} />
                    ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
      {/* {isError ? error?.message : <pre>{JSON.stringify(dispositions, null, 2)}</pre>} */}
      {isError && error?.message}
    </>
  );
}

export default Dispositions;
