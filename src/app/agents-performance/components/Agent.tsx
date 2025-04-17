type Props = { status: string; comment: string; time: string };

function Agent({ status, comment, time }: Props) {
  return (
    <div className="bg-gray-500 text-white">
      <p>{time}</p>
      <p>{comment}</p>
      <p>{status}</p>
    </div>
  );
}

export default Agent;
