import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./features/dashboard/Dashboard";
import Auth from "./features/auth/Auth";
import ProtectedAppLayout from "./ui/ProtectedAppLayout";
import "./index.css";
import { Account } from "./features/account/Account";
import RecordingsSingleAgent from "./features/recordings/Recordings";
import RecordingsAllAgent from "./features/recordings/RecordingsAllAgent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const router = createBrowserRouter([
  { path: "/login", element: <Auth /> },
  {
    element: <ProtectedAppLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/account", element: <Account /> },
      { path: "/recordings-single-agent", element: <RecordingsSingleAgent /> },
      { path: "/recordings-all-agents", element: <RecordingsAllAgent /> },
      // { path: "/recordings-all-agents", element: <RecordingsSingleAgent /> },
    ],
  },
]);
const queryClient = new QueryClient();
function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}

export default App;

/*

// ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { RootState } from "@/store/store";
import { useAppSelector } from "@/hooks/reduxHooks";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector((state: RootState) => state.user.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" />;
};


*/
