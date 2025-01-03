import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./features/dashboard/Dashboard";
import ProtectedAppLayout from "./ui/ProtectedAppLayout";
import "./index.css";
import { Account } from "./features/account/Account";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthLayout from "./ui/AuthLayout";
import RegisterForm from "./features/auth/components/RegisterForm";
import LoginForm from "./features/auth/components/LoginForm";
import Recordings from "./features/recordings/Recordings";

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

      { path: "/recordings", element: <Recordings /> },
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
