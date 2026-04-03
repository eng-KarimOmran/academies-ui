import type { Header } from "@/components/Table/HeaderTable";
import type { Academy } from "@/types/academy";

export const columns: Header<Academy>[] = [
  {
    key: "name",
    header: "اسم الأكاديمية",
    display: (data) => data.name,
  },
  {
    key: "phone",
    header: "الهاتف",
    display: (data) => data.phone,
  },
  {
    key: "address",
    header: "العنوان",
    display: (data) => data.address,
  },
  {
    key: "instaPay",
    header: "انستاباي",
    display: (data) => data.instaPay,
  },
];
