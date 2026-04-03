import TableUi, { type DataTableProps } from "@/components/Table/TableUi";
import { getAllAcademies } from "@/service/academy.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { columns } from "./columns";
import type { Academy } from "@/types/academy";
import PageHeader, { type PageHeaderProps } from "@/components/PageHeader";
import Add from "./Forms/Add";
import ActionsAcademy from "./ActionsAcademy";

export default function Academies() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["academies"],
    queryFn: () => getAllAcademies({ limit: 10, page: 1 }),
    select: (data) => data.data.data,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const configTable: DataTableProps<Academy> = {
    data: data?.items || [],
    isLoading,
    headers: columns,
    actions: (item) => <ActionsAcademy item={item} />,
    configDialogAdd: {
      title: "إضافة أكاديمية جديدة",
      description: "قم بإدخال بيانات الأكاديمية لإضافتها إلى النظام.",
      children: ({ setIsOpen }) => <Add setIsOpen={setIsOpen} />,
    },
  };

  const configHeader: PageHeaderProps = {
    title: "إدارة الأكاديميات",
    description:
      "إدارة الأكاديميات تشمل إدارة البيانات ومنصات التواصل الاجتماعي",
  };

  return (
    <section className="flex flex-col gap-6">
      <PageHeader {...configHeader} />
      <TableUi {...configTable} />
    </section>
  );
}