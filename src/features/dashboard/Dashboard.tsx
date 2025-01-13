import ActionBar from "./components/ActionBar";
import { AddDialerForm } from "./components/AddDialerForm";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DialersTable } from "./components/DialersTable";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setDialers, setIsAddingDialer } from "./dialerSlice";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { LinearProgress } from "@/components/ui/LinearProgress";
import { useDialers } from "./useDialers";

function Dashboard() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { isAddingDialer } = useAppSelector((state) => state.dialers);
  const { dialers, isLoading, isSuccess, isError, error } = useDialers();

  const user = queryClient.getQueryData(["user"]);
  console.log(user);
  useEffect(() => {
    if (isSuccess && dialers) {
      dispatch(setDialers(dialers));
    }
  }, [isSuccess, dialers, dispatch]);

  if (isError) console.log(error);

  return (
    <div>
      <h1 className="text-2xl">
        Welcome, <strong>{user?.username}</strong>
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
      {dialers && <DialersTable data={dialers} />}
      {isError && <p>{JSON.stringify(error?.response?.data)}</p>}
    </div>
  );
}

export default Dashboard;

// {isError ? (
//   <ServerResponse type="error" message={JSON.stringify(error)} />
// ) : (
//   <DialersTable data={data} isLoading={isLoading} />
// )}
