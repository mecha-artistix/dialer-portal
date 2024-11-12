import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import { useAppSelector } from "@/hooks/reduxHooks";

function AppLayout() {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const location = useLocation();
  console.log(isAuthenticated);
  return isAuthenticated ? (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

export default AppLayout;
