import { RiLayout2Line } from "@remixicon/react";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export default function HeaderSidebar() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-[slot=sidebar-menu-button]:p-1.5!"
            asChild
          >
            <Link to="/dashboard" className="flex items-center gap-5">
              <RiLayout2Line className="size-5!" />
              <span className="text-base font-semibold">لوحة التحكم</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <Separator />
    </SidebarHeader>
  );
}
