import ErrorMessageForm from "@/components/Form/ErrorMessageForm";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { InputProps } from "@/types/form";
import type { LoginDto } from "@/DTOs/auth.dto";
import { LoginSchema } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Activity } from "react";
import { login } from "@/service/auth.service";
import { toast } from "sonner";
import type { ErrorAxios } from "@/types/axios";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "@/store/AuthState";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuthState();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginDto>({
    resolver: zodResolver(LoginSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<LoginDto> = async (data) => {
    try {
      const res = await login(data);
      setUser(res.data.data);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      const err = error as ErrorAxios;
      toast.error(err.response?.data.message || "حدث خطأ غير متوقع");
    }
  };

  const inputs: InputProps<LoginDto>[] = [
    {
      label: "رقم الهاتف",
      id: "phone",
      name: "phone",
      type: "tel",
      placeholder: "01xxxxxxxxx",
    },
    {
      label: "كلمة المرور",
      id: "password",
      name: "password",
      type: "password",
      placeholder: "",
    },
  ];

  return (
    <section className="w-full h-dvh flex justify-center items-center">
      <main className="w-full max-w-sm p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>تسجيل الدخول</CardTitle>
              <CardDescription>
                أدخل رقم هاتفك لتسجيل الدخول إلى حسابك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                {inputs.map((i) => (
                  <div className="grid gap-2" key={i.id}>
                    <Label htmlFor={i.id}>{i.label}</Label>
                    <Input
                      id={i.id}
                      type={i.type}
                      disabled={isSubmitting}
                      {...register(i.id)}
                    />
                    {errors[i.id] && (
                      <ErrorMessageForm message={errors[i.id]?.message} />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                <Activity mode={isSubmitting ? "visible" : "hidden"}>
                  <Spinner />
                </Activity>
                تسجيل الدخول
              </Button>
            </CardFooter>
          </Card>
        </form>
      </main>
    </section>
  );
}
