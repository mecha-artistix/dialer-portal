import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import RouteLoader from "@/components/ui/RouteLoader";
import SideBar from "@/components/ui/SideBar";
import TopBar from "@/components/ui/TopBar";
import Image from "next/image";
import { CientProviders } from "@/utils/clientProviders";
import "@/app/global-setup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dialer Testing Portal",
  description: "A portal where clients can test overall performace of dialer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CientProviders>
          <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] h-screen">
            <header className="p-2">
              <TopBar />
            </header>
            <aside className="py-4 row-span-full px-4 flex flex-col gap-4 bg-amber-200">
              <div className="text-center mx-auto bg-white px-2">
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
        </CientProviders>
      </body>
    </html>
  );
}
