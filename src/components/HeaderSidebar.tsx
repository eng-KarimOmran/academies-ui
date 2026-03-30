import { RiSchoolLine } from "@remixicon/react";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Link } from "react-router-dom";

export default function HeaderSidebar() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-[slot=sidebar-menu-button]:p-1.5!"
          >
            <Link to="/dashboard" className="flex items-center gap-5">
              <RiSchoolLine className="size-5!" />
              <span className="text-base font-semibold">إدارة الأكاديمية</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
