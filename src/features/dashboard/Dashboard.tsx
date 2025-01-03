import ActionBar from "./components/ActionBar";
import { AddDialerForm } from "./components/AddDialerForm";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DialersTable } from "./components/DialersTable";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setDialers, setIsAddingDialer } from "./dialerSlice";
import { useQuery } from "@tanstack/react-query";
import { getDialerConfig } from "@/lib/services";
import { useEffect } from "react";
import { LinearProgress } from "@/components/ui/LinearProgress";

function Dashboard() {
  const dispatch = useAppDispatch();
  const { isAddingDialer } = useAppSelector((state) => state.dialers);

  const { username } = useAppSelector((state) => state.user);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["dialers"],
    queryFn: () => getDialerConfig(),
    enabled: true,
    retry: 0,
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setDialers(data));
    }
  }, [isSuccess, data, dispatch]);

  return (
    <div>
      <h1 className="text-2xl">
        Welcome, <strong>{username}</strong>
      </h1>
      <h4 className="text-xl">Available Dialers</h4>
      <div className="relative">
        <Collapsible open={isAddingDialer}>
          <ActionBar>
            <CollapsibleTrigger
              onClick={() => dispatch(setIsAddingDialer(!isAddingDialer))}
              className="bg-black p-2 text-white rounded-sm"
            >
              Add Dialer
            </CollapsibleTrigger>
          </ActionBar>
          <CollapsibleContent className="absolute top-full left-0 z-50 mt-2 w-full max-w-md">
            <AddDialerForm />
          </CollapsibleContent>
        </Collapsible>
      </div>

      {isLoading && <LinearProgress />}
      {data && <DialersTable data={data} />}
    </div>
  );
}

export default Dashboard;

// {isError ? (
//   <ServerResponse type="error" message={JSON.stringify(error)} />
// ) : (
//   <DialersTable data={data} isLoading={isLoading} />
// )}
