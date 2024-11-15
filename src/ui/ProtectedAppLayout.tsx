import { Navigate, Outlet, useLocation, useNavigation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { useEffect } from "react";
import { logout } from "@/store/userSlice";
import { LinearProgress } from "@/components/ui/LinearProgress";
import { validateSession } from "@/lib/services";
import { Toaster } from "@/components/ui/toaster";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    console.log("protected effect");
    const validate = async () => {
      try {
        await validateSession();
      } catch (error: unknown) {
        dispatch(logout());
        throw error;
      }
    };
    validate();
  });

  return isAuthenticated ? (
    <div className="flex flex-col h-screen">
      <header className="w-full bg-gray-800 text-white p-4 shadow-md">
        <TopBar />
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-gray-900 text-gray-100 p-4 hidden md:block">
          <SideBar />
        </aside>
        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">{isLoading ? <LinearProgress /> : <Outlet />}</main>
        <Toaster />
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

export default AppLayout;
