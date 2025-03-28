export function generateJSONFromVicidialTabData(tabData: string) {
  // Split the input data into rows
  const rows = tabData.split("\n");

  // Extract the header row and map it into a list of column names
  const headers = rows[0].split(",").map((header) => header.trim());

  // Initialize an empty array to store the JSON objects
  const data = [];

  // Loop through the remaining rows and process each row into a JSON object
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].trim();

    // Skip empty rows
    if (row === "") continue;

    const values = row.split(",").map((value) => value.trim());

    // Generate an object for the current row
    const rowData = {};

    // Populate the rowData object with key-value pairs
    for (let j = 0; j < headers.length; j++) {
      rowData[headers[j]] = values[j] || null; // In case of missing values
    }

    // Add the current row's data to the data array
    data.push(rowData);
  }

  return data;
}
