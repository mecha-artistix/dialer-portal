import { getCallDispoReportSA } from "@/actions/dispositionsSA";
import DispoTabs from "./components/DispoTabs";
import { DIALER_SERVER } from "@/lib/constants";

async function page() {
  const dispoReport = await getCallDispoReportSA();

  return (
    <div className="flex flex-col gap-4">
      Real Time Performance
      {dispoReport.status === "success" && dispoReport?.data && <DispoTabs dispositions={dispoReport.data} />}
      {dispoReport.status === "failed" && <p>Server Failed to respond dispositions report</p>}
      <div>
        <iframe
          src={`http://${DIALER_SERVER}/vicidial/realtime_report.php`}
          width="100%"
          height="500"
          style={{ border: "none" }}
          title="Real Time Reports"
          // onLoad={onIframeLoad}
        />
      </div>
    </div>
  );
}

export default page;
