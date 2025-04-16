"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SideBarLinkProps = { href: string; to: string };
const SideBarLink = ({ href, to }: SideBarLinkProps) => {
  const pathname = usePathname();
  const varClass = pathname === `/${href}` ? "bg-gray-900 text-white p-2" : "";
  return (
    <Link href={`/${href}`}>
      <li className={cn("capitalize hover:bg-gray-900 hover:text-white p-2", varClass)}>{to}</li>
    </Link>
  );
};

export default SideBarLink;
