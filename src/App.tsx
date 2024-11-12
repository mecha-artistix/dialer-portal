import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./features/dashboard/Dashboard";
import Auth from "./features/auth/Auth";
import ProtectedAppLayout from "./ui/ProtectedAppLayout";
import "./index.css";

const router = createBrowserRouter([
  { path: "/login", element: <Auth /> },
  {
    element: <ProtectedAppLayout />,
    children: [{ path: "/", element: <Dashboard /> }],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
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