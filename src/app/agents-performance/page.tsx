import axios from "axios";
import Agent from "./components/Agent";

async function page() {
  let data = {};
  try {
    const res = await axios.post("http://localhost:9898/api/agents-performance");
    data = res.data.data;
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    data = { error };
  }

  return (
    <div>
      <p>Agents Performance</p>
      <div>
        {data?.map((row) => (
          <div key={row.lead_id}>
            <Agent />
            <p>{row.user}</p>
            <p>{row.lead_id}</p>
            <p>{row.phone_number}</p>
            <p>{row.Duration}</p>
            <p>{row.campaign_id}</p>
            <p>{row.comments}</p>
            <p>{row.status}</p>
          </div>
        ))}
      </div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}

export default page;
