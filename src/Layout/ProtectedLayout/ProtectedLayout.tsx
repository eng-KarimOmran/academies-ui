import { AppSidebar } from "@/components/AppSidebar";
import { ModeToggle } from "@/components/ModeToggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { refresh } from "@/service/auth.service";
import { useAuthState } from "@/store/AuthState";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useAuthState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await refresh();
        setUser(res.data.data);
      } catch (error) {
        if (error) {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [setUser]);

  if (loading) {
    return (
      <section className="w-full h-dvh flex justify-center items-center">
        <Spinner size={24} />
      </section>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <ModeToggle />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
