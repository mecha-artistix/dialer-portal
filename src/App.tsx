import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./features/dashboard/Dashboard";
import ProtectedAppLayout from "./ui/ProtectedAppLayout";
import "./index.css";
import { Account } from "./features/account/Account";
import RecordingsSingleAgent from "./features/recordings/RecordingsByAgent";
import RecordingsAllAgent from "./features/recordings/RecordingsAllAgent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RecordingsByStatus from "./features/recordings/RecordingsByStatus";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthLayout from "./ui/AuthLayout";
import RegisterForm from "./features/auth/components/RegisterForm";
import LoginForm from "./features/auth/components/LoginForm";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginForm /> },
      { path: "/register", element: <RegisterForm /> },
    ],
  },
  {
    element: <ProtectedAppLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/account", element: <Account /> },
      { path: "/recordings-single-agent", element: <RecordingsSingleAgent /> },
      { path: "/recordings-all-agents", element: <RecordingsAllAgent /> },
      { path: "/recordings-by-status", element: <RecordingsByStatus /> },
    ],
  },
]);
const queryClient = new QueryClient();
function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}
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
