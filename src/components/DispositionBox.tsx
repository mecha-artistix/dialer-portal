"use client";

import { cn } from "@/lib/utils";

type Props = { name: string; value: string };

const DispositionBox = ({ name, value }: Props) => {
  const number = value.split(" ")[0];
  const percentage = parseFloat(value.split(" ")[1].match(/-?\d+(\.\d+)?/)?.[0] ?? "0");

  let bgColor = "";
  switch (name) {
    case "XFER":
      // bgColor = percentage > 50 ? "bg-green-500 text-white" : "bg-red-500 text-white";
      bgColor = "bg-red-500 text-white";
      break;
    case "DNC":
      bgColor = "bg-red-500 text-white";
      break;
    // case "XFER":
    //   bgColor = "bg-red-500 text-white";
    //   break;

    default:
      bgColor = "bg-stone-300 text-stone-900";
      break;
  }

  return (
    <div className={cn("px-4 py-2 rounded text-center", bgColor)}>
      <p className="text-md font-bold">{name}</p>
      <div className="text">
        <p>{number}</p>
        <p className="font-bold">{percentage}%</p>
      </div>
    </div>
  );
};

export default DispositionBox;
