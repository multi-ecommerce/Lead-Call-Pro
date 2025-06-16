"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  ChartColumn,
  Phone,
  FileBarChart,
  User,
  Settings,
  PanelRightOpen,
} from "lucide-react";

interface DashboardSideNavProps {
  closeSidebar?: () => void;
}

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: ChartColumn,
  },
  {
    name: "Calls",
    href: "/dashboard/calls",
    icon: Phone,
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: FileBarChart,
  },
  {
    name: "Profile & Billings",
    href: "/dashboard/profile&billings",
    icon: User,
  },
  {
    name: "Compaign Settings",
    href: "/dashboard/compaign-settings",
    icon: Settings,
  },
];

export default function DashboardSideNav({
  closeSidebar,
}: DashboardSideNavProps) {
  const pathname = usePathname();
  return (
    <div>
      <div className="flex justify-between items-center px-3 h-12">
        <p className="text-sm font-bold">LOGO</p>
        <button
          onClick={closeSidebar}
          className="lg:hidden text-gray-600 hover:text-black cursor-pointer"
        >
          <PanelRightOpen size={16} />
        </button>
      </div>
      <>
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "w-full flex h-16 items-center justify-start gap-2 py-1 max-md:px-4 text-[0.8rem] font-medium hover:bg-gray-300 hover:text-black  md:justify-start md:p-2 md:px-3 group",
                { "bg-[#dc3545] text-[#fff]": pathname === link.href }
              )}
            >
              <LinkIcon
                className={cn("w-6 ", {
                  "fill-white": pathname === link.href,
                })}
                size={20}
              />
              <p className="text-[1rem]">{link.name}</p>
            </Link>
          );
        })}
      </>
    </div>
  );
}
