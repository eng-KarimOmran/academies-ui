import ErrorMessageForm from "@/components/Form/ErrorMessageForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import type { CreateAcademyDto } from "@/DTOs/academy.dto";
import { createAcademy } from "@/service/academy.service";
import type { ErrorAxios } from "@/types/axios";
import type { InputProps } from "@/types/form";
import { CreateAcademySchema } from "@/validations/academy.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Activity } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type CreateAcademyForm = Omit<CreateAcademyDto, "owners"> & {
  owners: string;
};

export default function Add({
  setIsOpen,
}: {
  setIsOpen: (data: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const defaultValues: CreateAcademyForm = {
    name: "",
    address: "",
    phone: "",
    instaPay: "",
    owners: "",
  };

  const resolver = zodResolver(CreateAcademySchema);

  const inputs: InputProps<CreateAcademyForm>[] = [
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
    {
      label: "رقم المالك",
      id: "owners",
      name: "owners",
      type: "text",
      placeholder: "01xxxxxxxxx",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateAcademyForm>({ defaultValues, resolver });

  const onSubmit = async (data: CreateAcademyForm) => {
    try {
      const cleanedOwner = data.owners.trim();
      const formattedData = {
        ...data,
        owners: [{ phone: cleanedOwner }],
      };
      await createAcademy(formattedData);
      queryClient.invalidateQueries({ queryKey: ["academies"] });
      toast.success("تم اضافة الأكادمية بنجاح");
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
        إضافة الأكاديمية
      </Button>
    </form>
  );
}
