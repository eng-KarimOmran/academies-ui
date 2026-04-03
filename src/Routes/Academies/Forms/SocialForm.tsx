import ErrorMessageForm from "@/components/Form/ErrorMessageForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateAcademy } from "@/service/academy.service";
import type { AcademyDetails } from "@/types/academy";
import type { ErrorAxios } from "@/types/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Platform as PlatformEnum } from "@/types/enums";
import { platform, url } from "@/validations/common.validation";

type SocialFormProps = {
  academy: AcademyDetails;
  action: "addSocial" | "updateSocial" | "deleteSocial";
  socialId?: string;
  setIsOpen: (value: boolean) => void;
};

export default function SocialForm({
  academy,
  action,
  socialId,
  setIsOpen,
}: SocialFormProps) {
  const queryClient = useQueryClient();

  const existingSocial = academy.socialMediaPlatforms?.find(
    (s) => s.id === socialId,
  );

  const schema = z.object({
    platform,
    url,
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      platform: existingSocial ? existingSocial.platform : undefined,
      url: existingSocial ? existingSocial.url : "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      let socialMediaList =
        academy.socialMediaPlatforms?.map((s) => ({
          platform: s.platform,
          url: s.url,
        })) || [];

      if (action === "addSocial") {
        socialMediaList.push(data);
      } else if (action === "updateSocial" && existingSocial) {
        socialMediaList = socialMediaList.map((s) =>
          s.platform === existingSocial.platform && s.url === existingSocial.url
            ? data
            : s,
        );
      } else if (action === "deleteSocial" && existingSocial) {
        socialMediaList = socialMediaList.filter(
          (s) =>
            !(
              s.platform === existingSocial.platform &&
              s.url === existingSocial.url
            ),
        );
      }

      await updateAcademy(academy.id, {
        socialMedia: socialMediaList,
      });

      queryClient.invalidateQueries({ queryKey: ["academies"] });
      setIsOpen(false);
      toast.success("تم تحديث البيانات بنجاح");
    } catch (err) {
      const error = err as ErrorAxios;
      toast.error(error.response?.data.message || "حدث خطأ أثناء المعالجة");
    }
  };

  if (action === "deleteSocial") {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <p className="text-sm font-medium">
          هل أنت متأكد من حذف وسيلة التواصل هذه؟
        </p>
        <Button
          type="submit"
          variant="destructive"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting && <Spinner className="ml-2" />}
          تأكيد الحذف
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="space-y-2">
        <Label>اسم المنصة</Label>
        <Controller
          control={control}
          name="platform"
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={isSubmitting}
              dir="rtl"
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر المنصة..." />
              </SelectTrigger>
              <SelectContent>
                {Object.values(PlatformEnum).map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.platform && (
          <ErrorMessageForm message={errors.platform.message} />
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">الرابط (URL)</Label>
        <Input
          id="url"
          placeholder="https://example.com"
          disabled={isSubmitting}
          {...register("url")}
          dir="ltr"
          className="text-left"
        />
        {errors.url && <ErrorMessageForm message={errors.url.message} />}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting && <Spinner className="ml-2" />}
        {action === "addSocial" ? "إضافة" : "حفظ التعديلات"}
      </Button>
    </form>
  );
}
