import { Suspense } from "react";
import ViciFilterParams from "./components/ViciFilterParamsForm";
// import RecordingsTable from "./components/RecordingsTable";

function page() {
  // const data = useRecordings();
  return (
    <div>
      QA Portal
      <div>
        <ViciFilterParams />
      </div>
      <Suspense>
        <div className="max-h-full overflow-auto">{/* <RecordingsTable data={data} /> */}</div>
      </Suspense>
    </div>
  );
}

export default page;
