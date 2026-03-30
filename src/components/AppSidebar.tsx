import { Sidebar, SidebarFooter } from "@/components/ui/sidebar";
import HeaderSidebar from "./HeaderSidebar";
import ContentSidebar from "./ContentSidebar";

export function AppSidebar() {
  return (
    <Sidebar side="right" collapsible="icon">
      <HeaderSidebar />
      <ContentSidebar />
      <SidebarFooter />
    </Sidebar>
  );
}
