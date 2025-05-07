# How to Pull, Create Docker Image, and Run the App

This guide will walk you through the steps required to pull the app, build a Docker image, and run it locally.

---

## 1. Fetch the Application

To get the latest version of the application, follow these steps:

1. **Navigate to the directory** where you want to fetch the app.

2. **Clone the repository** (if you haven't already):

   ```bash
   git clone https://github.com/mecha-artistix/dialer-portal.git
   cd dialer-portal
   ```

3. **Pull the latest changes from the repository**:

   ```bash
   git pull origin next-js
   ```

   This will pull the latest updates from the `next-js` branch of the repository.

---

## 2. Build the Docker Image

Once you have the latest version of the app, you need to build the Docker image. Here are the steps:

1. **Ensure you're in the `dialer-portal` directory** where the `Dockerfile` is located.

   ```bash
   cd /path/to/your/dialer-portal
   ```

2. **Build the Docker image** by running the following command:

   ```bash
   docker build -t dialerportal:latest .
   ```

## 3. Run the Docker Container

After the Docker image has been successfully built, you can run the application inside a Docker container:

1. **Run the container**, mapping the container's port `9898` to your local machine's port `9898`:
2. **Optional**: If you need to run it in detached mode (in the background), add the `-d` flag:

   ```bash
   docker run -d -p 9898:9898 dialerportal
   ```

---

## 4. Access the Application

Once the Docker container is running, you can access the app in your web browser at:

### {SERVER_IP}:9898

## App Setup & Database Initialization

The application initializes a MySQL connection pool at startup to ensure DB access is ready before handling any API routes.

---

### DB Pool Initialization

#### `src/app/global-setup.js`

## Repository and Docker Setup

## Real-Time Performance

This page displays real-time call disposition statistics and a live ViciDial report embedded via iframe.

### Features

- **Disposition Report (Real-time)**:  
  Fetched from ViciDial's `non_agent_api_V2.php` endpoint using a server action.

- **Live Realtime Report Iframe**:  
  Embedded using a URL pointing to ViciDial's `realtime_report.php`.

---

### Code Overview

#### `src/app/real-time-performance/page.tsx`

### Notes

The report is fetched using getCallDispoReportSA() from the Vicidial API.

The data is parsed from CSV to JSON using a utility function parseCSVToJSON.

React query is used on client side for query handling

## QA Portal

This page allows users to filter and retrieve call recordings from ViciDial via the non-agent API.

### Features

- **Filter Form**:  
  Users provide input to filter recordings (e.g., date, agent, duration).

- **Recordings Fetch**:  
  Calls ViciDial's `recording_lookup` API endpoint with query params.

---

### Code Overview

#### `src/app/qa-portal/page.tsx`

#### `src/actions/getRecordingsSA.ts`

## Agents Performance

This page displays recent performance data for agents, fetched from a local database populated with ViciDial logs.

### Features

- Fetches and displays agent data such as call time, duration, status, and comments.
- Data is retrieved from a local MySQL DB via a backend API.

---

### Code Overview

#### `src/app/agents-performance/page.tsx`

#### `src/app/api/agents-performance/route.ts`
