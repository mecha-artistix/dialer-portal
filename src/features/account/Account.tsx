import { Button } from "@/components/ui/button";
import ActionBar from "./components/ActionBar";
import { AddDialerForm } from "./components/AddDialerForm";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DialersTable } from "./components/DialersTable";

export function Account() {
  return (
    <div>
      <div className="relative">
        <Collapsible>
          <ActionBar>
            <CollapsibleTrigger>
              <Button>Add Dialer</Button>
            </CollapsibleTrigger>
          </ActionBar>
          <CollapsibleContent className="absolute top-full left-0 z-50 mt-2 w-full max-w-md">
            <AddDialerForm />
          </CollapsibleContent>
        </Collapsible>
      </div>
      <DialersTable />
    </div>
  );
}
