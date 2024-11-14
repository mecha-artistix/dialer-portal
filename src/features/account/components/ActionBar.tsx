import { Card } from "@/components/ui/card";
import React from "react";

interface IActionBar {
  children: React.ReactNode;
}

const ActionBar: React.FC<IActionBar> = ({ children }) => {
  return <Card className="flex justify-between items-center shadow-sm p-2 border rounded-sm">{children}</Card>;
};

export default ActionBar;
