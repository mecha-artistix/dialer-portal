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
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] h-screen">
      <header className="p-2">
        <TopBar />
      </header>
      <aside className="p-4 row-span-full px-8 flex flex-col gap-4">
        <div className="text-center mx-auto">
          <img src="/logo.png" width="150" height="150" alt="Logo" />
        </div>
        <SideBar />
      </aside>
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        {isLoading ? (
          <LinearProgress />
        ) : (
          <div className="container mx-auto">
            <Outlet />
          </div>
        )}
      </main>
      <Toaster />
    </div>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

export default AppLayout;
