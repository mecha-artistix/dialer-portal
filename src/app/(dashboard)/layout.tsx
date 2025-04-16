// import RouteLoader from "@/components/ui/RouteLoader";
import SideBar from "@/components/ui/SideBar";
import TopBar from "@/components/ui/TopBar";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] h-screen">
      <header className="p-2">
        <TopBar />
      </header>
      <aside className="p-4 row-span-full px-8 flex flex-col gap-4">
        <div className="text-center mx-auto">
          <Image src="/logo.png" width="150" height="150" alt="Logo" />
        </div>
        <SideBar />
      </aside>
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <div className="container mx-auto">
          {/* <RouteLoader /> */}
          {children}
        </div>
      </main>
    </div>
  );
}
