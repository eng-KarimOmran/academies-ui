import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { logout } from "@/service/auth.service";
import { useAuthState } from "@/store/AuthState";
import type { LogoutDto } from "@/DTOs/auth.dto";
import { LogoutSchema } from "@/validations/auth.validation";

export default function Logout() {
  const { setUser } = useAuthState();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LogoutDto>({
    resolver: zodResolver(LogoutSchema),
    defaultValues: { allDevices: false },
  });

  const onSubmit = async (data: LogoutDto) => {
    try {
      await logout(data.allDevices);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name="allDevices"
        render={({ field }) => (
          <RadioGroup
            value={field.value ? "true" : "false"}
            onValueChange={(val) => field.onChange(val === "true")}
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
        )}
      />
      {errors.allDevices && (
        <p className="text-red-500">{errors.allDevices.message}</p>
      )}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "جاري تسجيل الخروج..." : "تأكيد الخروج"}
      </Button>
    </form>
  );
}