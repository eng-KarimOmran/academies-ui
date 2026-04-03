import CustomDialog, {
  type ConfigDialog,
} from "@/components/Dialog/CustomDialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useDialog from "@/hooks/useDialog";
import type { Academy } from "@/types/academy";
import {
  RiDeleteBin6Line,
  RiEditLine,
  RiExternalLinkLine,
  type RemixiconComponentType,
} from "@remixicon/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Update from "./Forms/Update";
import Delete from "./Forms/delete";

type ActionType = "update" | "delete" | "details";

interface Action {
  title: string;
  icon: RemixiconComponentType;
  type: ActionType;
}

export default function ActionsAcademy({ item }: { item: Academy }) {
  const { isOpen, setIsOpen } = useDialog();
  const [configDialog, setConfigDialog] = useState<ConfigDialog | null>(null);
  const navigate = useNavigate();

  const actions: Action[] = [
    { title: "التفاصيل", icon: RiExternalLinkLine, type: "details" },
    { title: "تعديل", icon: RiEditLine, type: "update" },
    { title: "حذف", icon: RiDeleteBin6Line, type: "delete" },
  ];

  const handleAction = (type: ActionType) => {
    switch (type) {
      case "details":
        navigate(`/dashboard/academies/${item.id}`);
        break;
      case "update":
        setConfigDialog({
          title: "تعديل بيانات الأكاديمية",
          description: "قم بتعديل البيانات المطلوبة ثم اضغط حفظ.",
          children: ({ setIsOpen }) => (
            <Update item={item} setIsOpen={setIsOpen} />
          ),
        });
        setIsOpen(true);
        break;
      case "delete":
        setConfigDialog({
          title: "حذف الأكاديمية",
          description: "هل أنت متأكد؟ لا يمكن التراجع عن هذا الإجراء.",
          children: () => <Delete item={item} setIsOpen={setIsOpen} />,
        });
        setIsOpen(true);
        break;
    }
  };

  return (
    <>
      {actions.map((action) => (
        <DropdownMenuItem
          key={action.type}
          onSelect={(e) => {
            e.preventDefault();
            handleAction(action.type);
          }}
        >
          <action.icon className="ml-2 h-4 w-4" />
          <span>{action.title}</span>
        </DropdownMenuItem>
      ))}
      {configDialog && (
        <CustomDialog isOpen={isOpen} setIsOpen={setIsOpen} {...configDialog} />
      )}
    </>
  );
}