import { cn } from "@/lib/utils";

type Props = {
  name: string;
  value: string;
};

function StatBox({ name, value }: Props) {
  const bgColor = "bg-red-500";
  return (
    <div className={cn("px-4 py-2 rounded text-center", bgColor)}>
      <p className="text-sm">{name}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}

export default StatBox;
