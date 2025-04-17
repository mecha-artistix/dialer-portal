import axios from "axios";

async function page() {
  let data = {};
  try {
    const res = await axios.post("http://localhost:9898/api/agents-performance");
    data = res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    data = { error };
  }

  return (
    <div>
      <p>Agents Performance</p>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}

export default page;
