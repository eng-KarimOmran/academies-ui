import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { refresh } from "@/service/auth.service";
import { useAuthState } from "@/store/AuthState";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import NavTop from "@/components/NavTop/NavTop";
import type { ErrorAxios } from "@/types/axios";
import { toast } from "sonner";

export default function ProtectedLayout() {
  const [loading, setLoading] = useState(true);
  const { setUser, user } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await refresh();
        setUser(res.data.data);
      } catch (error) {
        const err = error as ErrorAxios;
        setUser(null);
        toast.error(err.response?.data.message ?? "حدث خطأ غير متوقع");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [setUser, navigate]);

  if (loading) {
    return (
      <section className="w-full h-dvh flex justify-center items-center">
        <Spinner size={24} />
      </section>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-background">
        <NavTop />
        <section className="p-2">
          <Outlet />
        </section>
      </main>
    </SidebarProvider>
  );
}
