async function page() {
  const res = await fetch("http://localhost:9898/api/agents-performance");
  const data = await res.json();

  return (
    <div>
      <p>Agents Performance</p>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}

export default page;
