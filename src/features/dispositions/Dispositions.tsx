import { Button } from "@/components/ui/button";
import StatBox from "./components/statbox";
import useDispositions from "./useDispositions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Dispositions() {
  const { dispositions, isError, error, refetch } = useDispositions();
  const clickHandler = () => {
    refetch();
  };
  const campaigns = dispositions?.map(({ ["TOTAL CALLS"]: totalCalls, CAMPAIGN }) => ({
    totalCalls,
    CAMPAIGN,
  }));
  return (
    <>
      <Button onClick={clickHandler}>Get campaigns</Button>

      <div className="flex flex-row"></div>
      {dispositions && (
        <Tabs defaultValue="account" className="">
          <TabsList>
            {campaigns.map((dialer) => (
              <TabsTrigger value={dialer.CAMPAIGN || "NAN"}>{dialer.CAMPAIGN || "NAN"}</TabsTrigger>
            ))}
          </TabsList>
          {dispositions.map((campaign) => (
            <TabsContent value={campaign.CAMPAIGN || "NAN"}>
              <div>
                <p>
                  Total Calls: <strong>{campaign["TOTAL CALLS"]}</strong>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {Object.keys(campaign)
                    .filter((key) => key != "TOTAL CALLS" && key != "CAMPAIGN")
                    .map((key) => (
                      <StatBox name={key} value={campaign[key]} />
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
