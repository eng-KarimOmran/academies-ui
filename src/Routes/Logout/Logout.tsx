import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Activity, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { ErrorAxios } from "@/types/axios";
import { logout } from "@/service/auth.service";
import { Spinner } from "@/components/ui/spinner";
import { useAuthState } from "@/store/AuthState";

export default function Logout() {
  const navigate = useNavigate();
  const [logoutAllDevices, setLogoutAllDevices] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useAuthState();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout(logoutAllDevices);
      setUser(null);
    } catch (error) {
      const err = error as ErrorAxios;
      toast.error(err.response?.data.message || "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog defaultOpen={true}>
      <DialogContent
        dir="rtl"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>هل أنت متأكد أنك تريد تسجيل الخروج؟</DialogTitle>
          <DialogDescription>
            سيؤدي هذا الإجراء إلى إغلاق جلستك وتسجيل خروجك من حسابك.
          </DialogDescription>
        </DialogHeader>

        <div className="my-4">
          <RadioGroup
            value={logoutAllDevices ? "true" : "false"}
            onValueChange={(val) => setLogoutAllDevices(val === "true")}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="false" id="r1" />
              <Label htmlFor="r1" className="cursor-pointer">
                تسجيل الخروج من هذا الجهاز فقط
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="true" id="r2" />
              <Label htmlFor="r2" className="cursor-pointer">
                تسجيل الخروج من جميع الأجهزة
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            إلغاء
          </Button>
          <Button
            variant="destructive"
            onClick={handleLogout}
            disabled={loading}
          >
            <Activity mode={loading ? "visible" : "hidden"}>
              <Spinner />
            </Activity>
            تسجيل الخروج
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}