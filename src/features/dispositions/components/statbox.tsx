import { cn } from "@/lib/utils";

type Props = {
  name: string;
  value: string;
};

function StatBox({ name, value }: Props) {
  const bgColor = "bg-red-500";
  return (
    <div className={cn("px-4 py-2 rounded text-center", bgColor)}>
      <p className="text-md font-bold">{name}</p>
      <div className="text ">
        <p>{value.split(" ")[0]}</p>
        <p className="font-bold">{value.split(" ")[1]}</p>
      </div>
    </div>
  );
}

export default StatBox;
