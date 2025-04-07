import StatBox from "./statbox";

type Props = { data: Record<string, string> };

export default function DialerDispositions({ data }: Props) {
  const { ["TOTAL CALLS"]: TOTAL_CALLS, CAMPAIGN, ...rest } = data;

  return (
    <div className="my-2">
      <div>
        <p>
          Campaign : <strong>{CAMPAIGN}</strong>
        </p>
        <p>
          Total Calls : <strong>{TOTAL_CALLS}</strong>
        </p>
      </div>
      <div className="flex gap-2">
        {Object.keys(rest).map((el) => (
          <StatBox name={el} value={rest[el]} />
        ))}
      </div>
    </div>
  );
}
