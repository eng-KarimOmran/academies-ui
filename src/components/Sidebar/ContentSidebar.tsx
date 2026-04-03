import { RiSchoolLine } from "@remixicon/react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Link, useLocation } from "react-router-dom";

export default function ContentSidebar() {
  const currentPath = useLocation().pathname;

  const links = [
    { path: "/dashboard/academies", title: "الأكاديميات", icon: RiSchoolLine },
  ];

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {links.map((link) => (
              <SidebarMenuItem key={link.title}>
                <SidebarMenuButton
                  className={
                    link.path === currentPath
                      ? "bg-sidebar-accent"
                      : "bg-sidebar"
                  }
                  tooltip={link.title}
                  asChild
                >
                  <Link to={link.path}>
                    <link.icon />
                    <span>{link.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
