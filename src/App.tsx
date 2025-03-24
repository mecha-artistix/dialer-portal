import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./features/dashboard/Dashboard";
import ProtectedAppLayout from "./ui/ProtectedAppLayout";
import "./index.css";
import { Account } from "./features/account/Account";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthLayout from "./ui/AuthLayout";
import RegisterForm from "./features/auth/components/RegisterForm";
import LoginForm from "./features/auth/components/LoginForm";
import Recordings from "./features/recordings/Recordings";
import ProtectedRoutes from "./ui/ProtectedRoutes";
import { Toaster } from "@/components/ui/toaster";
import Error from "./components/ui/error";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginForm /> },
      { path: "/register", element: <RegisterForm /> },
    ],
  },
  {
    element: (
      <ProtectedRoutes>
        <ProtectedAppLayout />
      </ProtectedRoutes>
    ),
    children: [
      { path: "/", element: <Dashboard />, errorElement: <Error /> },
      { path: "/account", element: <Account />, errorElement: <Error /> },
      { path: "/recordings", element: <Recordings />, errorElement: <Error /> },
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
        <Toaster />
      </QueryClientProvider>
    </div>
  );
}
export default App;
