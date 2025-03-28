import StatBox from "./components/statbox";
import useDispositions from "./useDispositions";

function Dispositions() {
  const { dispositions, isError, error, refetch } = useDispositions();
  const clickHandler = () => {
    refetch();
  };
  return (
    <>
      <button onClick={clickHandler}>Get</button>

      <div className="flex flex-row">
        <StatBox name="name" value="123123" />
      </div>
      {isError ? error?.message : <pre>{JSON.stringify(dispositions, null, 2)}</pre>}
    </>
  );
}

export default Dispositions;
