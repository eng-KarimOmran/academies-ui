import ErrorMessageForm from "@/components/Form/ErrorMessageForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { deleteSchema } from "@/lib/utils";
import { deleteAcademy } from "@/service/academy.service";
import type { Academy } from "@/types/academy";
import type { ErrorAxios } from "@/types/axios";
import type { InputProps } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Activity } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Data {
  name: string;
}

export default function Delete({
  item,
  setIsOpen,
}: {
  item: Academy;
  setIsOpen: (data: boolean) => void;
}) {
  const queryClient = useQueryClient();

  const defaultValues = {
    name: "",
  };

  const resolver = zodResolver(deleteSchema(item.name, "الأكادمية"));

  const inputs: InputProps<Data>[] = [
    {
      label: `اكتب "${item.name}" لتأكيد الحذف`,
      id: "name",
      name: "name",
      type: "text",
      placeholder: "اكتب اسم الأكادمية لتأكيد الحذف",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Data>({ defaultValues, resolver });

  const onSubmit = async () => {
    try {
      await deleteAcademy({ academyId: item.id });
      queryClient.invalidateQueries({ queryKey: ["academies"] });
      toast.success("تم حذف الأكاديمية بنحاح");
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
      <Button
        type="submit"
        variant="destructive"
        disabled={isSubmitting}
        className="w-full"
      >
        <Activity mode={isSubmitting ? "visible" : "hidden"}>
          <Spinner />
        </Activity>
        حذف
      </Button>
    </form>
  );
}
