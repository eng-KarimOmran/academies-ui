import ErrorMessageForm from "@/components/Form/ErrorMessageForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { updateAcademy } from "@/service/academy.service";
import type { AcademyDetails } from "@/types/academy";
import type { ErrorAxios } from "@/types/axios";
import { phone } from "@/validations/common.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Activity } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type ActionType = "addOwner" | "updateOwner" | "deleteOwner";

type OwnerFormProps = {
  academy: AcademyDetails;
  action: ActionType;
  owner?: { phone: string };
  setIsOpen: (value: boolean) => void;
};

export default function OwnerForm({
  academy,
  action,
  owner,
  setIsOpen,
}: OwnerFormProps) {
  const queryClient = useQueryClient();

  const schema = z.object({
    phone,
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: owner ? owner.phone : "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      let updatedOwners = academy.owners.map((o) => ({ phone: o.phone }));
      if (action === "addOwner") {
        updatedOwners.push({ phone: data.phone });
      } else if (action === "updateOwner" && owner) {
        updatedOwners = updatedOwners.map((o) =>
          o.phone === owner.phone ? { ...o, phone: data.phone } : o,
        );
      } else if (action === "deleteOwner" && owner) {
        updatedOwners = updatedOwners.filter((o) => o.phone !== owner.phone);
      }
      await updateAcademy(academy.id, { owners: updatedOwners });
      queryClient.invalidateQueries({ queryKey: ["academies"] });
      setIsOpen(false);
    } catch (err) {
      const error = err as ErrorAxios;
      toast.error(error.response?.data.message || "حدث خطأ");
    }
  };

  if (action === "deleteOwner") {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <p>هل أنت متأكد من حذف هذا المالك؟</p>
        <div className="flex gap-2">
          <Button type="submit" variant="destructive" className="flex-1">
            <Activity mode={isSubmitting ? "visible" : "hidden"}>
              <Spinner />
            </Activity>
            حذف
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <Label htmlFor="phone">رقم الهاتف</Label>
      <Input id="phone" disabled={isSubmitting} {...register("phone")} />
      {errors.phone && <ErrorMessageForm message={errors.phone.message} />}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        <Activity mode={isSubmitting ? "visible" : "hidden"}>
          <Spinner />
        </Activity>
        {action === "addOwner" ? "إضافة" : "تعديل"}
      </Button>
    </form>
  );
}
