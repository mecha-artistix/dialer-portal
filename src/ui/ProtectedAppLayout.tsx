import { Outlet, useNavigation } from "react-router-dom";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { LinearProgress } from "@/components/ui/LinearProgress";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
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
    </div>
  );
}

export default AppLayout;
