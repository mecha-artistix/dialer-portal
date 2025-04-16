async function page() {
  const res = await fetch("/api/agent-performance");
  const data = res.json;

  return <div>Audio Performance {JSON.stringify(data)}</div>;
}

export default page;
