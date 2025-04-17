import axios from "axios";

async function page() {
  const res = await axios.post("http://localhost:9898/api/agents-performance");
  const { data } = res;
  return (
    <div>
      <p>Agents Performance</p>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}

export default page;
