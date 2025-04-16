"use client";

import { cn } from "@/lib/utils";

type Props = { name: string; value: string };

const DispositionBox = ({ name, value }: Props) => {
  const number = value.split(" ")[0];
  const percentage = parseFloat(value.split(" ")[1].match(/-?\d+(\.\d+)?/)?.[0] ?? "0");

  const bgColor = { XFER: percentage < 50 ? "bg-red-500" : "bg-green-500" };
  return (
    <div className={cn("px-4 py-2 rounded text-center", bgColor.XFER)}>
      <p className="text-md font-bold">{name}</p>
      <div className="text">
        <p>{number}</p>
        <p className="font-bold">{percentage}%</p>
      </div>
    </div>
  );
};

export default DispositionBox;
