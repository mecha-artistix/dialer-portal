import { Suspense } from "react";
import ViciFilterParams from "./components/ViciFilterParamsForm";
import Recordings from "./components/Recordings";
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
        <div className="max-h-full overflow-auto">
          <Recordings />
        </div>
      </Suspense>
    </div>
  );
}

export default page;
