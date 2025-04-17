import axios from "axios";
import Agent from "./components/Agent";

const staticData = [
  {
    time: "2025-04-16T11:41:46.000Z",
    user: "10021",
    lead_id: 10146348,
    phone_number: "9489990785",
    Duration: null,
    campaign_id: "NewBot",
    comments: "TEST",
    status: "DNQ",
  },
  {
    time: "2025-03-31T18:07:32.000Z",
    user: "10027",
    lead_id: 10146344,
    phone_number: "9489007700",
    Duration: 17,
    campaign_id: "NewBot",
    comments: "TEST",
    status: "DAIR",
  },
  {
    time: "2025-04-16T14:36:55.000Z",
    user: "10060",
    lead_id: 10146344,
    phone_number: "9489007700",
    Duration: 31,
    campaign_id: "NewBot",
    comments: "TEST",
    status: "NP",
  },
  {
    time: "2025-04-03T17:15:42.000Z",
    user: "10039",
    lead_id: 10146341,
    phone_number: "9489007316",
    Duration: 7,
    campaign_id: "NewBot",
    comments: "TEST",
    status: "DAIR",
  },
  {
    time: "2025-04-08T14:33:16.000Z",
    user: "10039",
    lead_id: 10146341,
    phone_number: "9489007316",
    Duration: 17,
    campaign_id: "NewBot",
    comments: "TEST",
    status: "DAIR",
  },
];

async function page() {
  let data = [];

  try {
    const res = await fetch("http://91.107.210.97:9898/api/agents-performance", {
      method: "POST",
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const result = await res.json();
    data = result.data || [];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return (
    <div>
      <p>Agents Performance</p>
      <div className="flex gap-2">
        {data.length > 0 &&
          data?.map((row) => (
            <div key={row.lead_id}>
              <Agent comment={row.comments} status={row.status} time={row.Duration} />
            </div>
          ))}
        {/* {data.length == 0 &&
          staticData?.map((row) => (
            <div key={row.lead_id}>
              <Agent comment={row.comments} status={row.status} time={`${row.Duration}`} />
            </div>
          ))} */}
      </div>
    </div>
  );
}

export default page;
