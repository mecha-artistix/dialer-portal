"use server";

function parseCSVToJSON(csv: string): Record<string, string>[] {
  const lines = csv.trim().split("\n");

  const headers = lines[0].split(",").map((header) => header.trim());

  const data = lines.slice(1).map((line) => {
    const values = line.split(",").map((value) => value.trim());
    const rowObject = headers.reduce(
      (obj, header, index) => {
        obj[header] = values[index] || "";
        return obj;
      },
      {} as Record<string, string>,
    );
    return rowObject;
  });

  return data;
}

export async function getCallDispoReportSA() {
  const url = `http://${process.env.NEXT_PUBLIC_SERVER}/vicidial/non_agent_api_V2.php?function=call_dispo_report&user=6666&pass=DAR3UI49T5MV2&campaigns=---ALL---&status_breakdown=1&show_percentages=1&statuses=---ALL---&user_groups=---ALL---&search_archived_data=checked`;
  try {
    const res = await fetch(url);
    const text = await res.text();
    const data = parseCSVToJSON(text);
    console.log({ data });
    return { status: "success", data };
  } catch (error) {
    return { status: "failed" };
  }
}
