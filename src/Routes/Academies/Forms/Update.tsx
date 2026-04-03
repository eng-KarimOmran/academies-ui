import ErrorMessageForm from "@/components/Form/ErrorMessageForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { updateAcademy } from "@/service/academy.service";
import type { Academy } from "@/types/academy";
import type { ErrorAxios } from "@/types/axios";
import type { InputProps } from "@/types/form";
import { address, entityName, phone } from "@/validations/common.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Activity } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const UpdateAcademySchema = z.object({
  name: entityName,
  phone: phone,
  address: address,
  instaPay: z.string(),
});

type UpdateAcademyDto = z.infer<typeof UpdateAcademySchema>;

export default function Update({
  item,
  setIsOpen,
}: {
  item: Academy;
  setIsOpen: (data: boolean) => void;
}) {
  const queryClient = useQueryClient();

  const defaultValues: UpdateAcademyDto = {
    name: item.name,
    address: item.address,
    phone: item.phone,
    instaPay: item.instaPay,
  };

  const resolver = zodResolver(UpdateAcademySchema);

  const inputs: InputProps<UpdateAcademyDto>[] = [
    {
      label: "اسم الأكاديمية",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "اكتب اسم الأكاديمية",
    },
    {
      label: "رقم الهاتف",
      id: "phone",
      name: "phone",
      type: "tel",
      placeholder: "01xxxxxxxxx",
    },
    {
      label: "العنوان",
      id: "address",
      name: "address",
      type: "text",
      placeholder: "اكتب العنوان",
    },
    {
      label: "انستا باي",
      id: "instaPay",
      name: "instaPay",
      type: "text",
      placeholder: "example@instapay",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateAcademyDto>({ defaultValues, resolver });

  const onSubmit = async (data: UpdateAcademyDto) => {
    try {
      await updateAcademy(item.id, data);
      queryClient.invalidateQueries({ queryKey: ["academies"] });
      toast.success("تم تعديل بيانات الأكاديمية بنحاح");
      setIsOpen(false);
    } catch (error) {
      const err = error as ErrorAxios;
      toast.error(err.response?.data.message || "حدث خطأ غير متوقع");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      {inputs.map((i) => (
        <div className="grid gap-2" key={i.id}>
          <Label htmlFor={i.id}>{i.label}</Label>
          <Input
            id={i.id}
            type={i.type}
            disabled={isSubmitting}
            placeholder={i.placeholder}
            {...register(i.id)}
          />
          {errors[i.id] && <ErrorMessageForm message={errors[i.id]?.message} />}
        </div>
      ))}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        <Activity mode={isSubmitting ? "visible" : "hidden"}>
          <Spinner />
        </Activity>
        حفظ
      </Button>
    </form>
  );
}
