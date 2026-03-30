import { Sidebar } from "@/components/ui/sidebar";
import HeaderSidebar from "./HeaderSidebar";
import ContentSidebar from "./ContentSidebar";
import FooterSidebar from "./FooterSidebar";

export function AppSidebar() {
  return (
    <Sidebar side="right" collapsible="icon">
      <HeaderSidebar />
      <ContentSidebar />
      <FooterSidebar />
    </Sidebar>
  );
}
