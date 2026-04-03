import { useState } from "react";
import useDialog from "@/hooks/useDialog";
import Update from "../Forms/Update";
import type { ConfigDialog } from "@/components/Dialog/CustomDialog";
import type { AcademyDetails } from "@/types/academy";
import OwnerForm from "../Forms/OwnerForm";
import SocialForm from "../Forms/SocialForm";

export function useAcademyActions(academy: AcademyDetails | undefined) {
  const { isOpen, setIsOpen } = useDialog();
  const [configDialog, setConfigDialog] = useState<ConfigDialog | null>(null);

  const openUpdateBasicData = () => {
    if (!academy) return;
    setConfigDialog({
      title: "تعديل بيانات الأكاديمية",
      description: "قم بتعديل البيانات المطلوبة ثم اضغط حفظ.",
      children: ({ setIsOpen }) => (
        <Update item={academy} setIsOpen={setIsOpen} />
      ),
    });
    setIsOpen(true);
  };

  const openOwnerAction = (
    action: "add" | "update" | "delete",
    owner?: { phone: string },
  ) => {
    if (!academy) return;
    const titles = {
      add: "إضافة مالك",
      update: "تعديل المالك",
      delete: "حذف المالك",
    };

    setConfigDialog({
      title: titles[action],
      description:
        action === "delete"
          ? "هل أنت متأكد من حذف هذا المالك؟"
          : "قم بتعديل البيانات المطلوبة ثم اضغط حفظ.",
      children: ({ setIsOpen }) => (
        <OwnerForm
          academy={academy}
          owner={owner}
          action={`${action}Owner`}
          setIsOpen={setIsOpen}
        />
      ),
    });
    setIsOpen(true);
  };

  const openSocialAction = (
    action: "add" | "update" | "delete",
    socialId?: string,
  ) => {
    if (!academy) return;

    const titles = {
      add: "إضافة وسيلة تواصل",
      update: "تعديل وسيلة تواصل",
      delete: "حذف وسيلة تواصل",
    };

    setConfigDialog({
      title: titles[action],
      description:
        action === "delete"
          ? "هل أنت متأكد من حذف هذه الوسيلة؟"
          : "قم بتعديل البيانات.",
      children: ({ setIsOpen }) => (
        <SocialForm
          setIsOpen={setIsOpen}
          action={`${action}Social`}
          socialId={socialId}
          academy={academy}
        />
      ),
    });
    setIsOpen(true);
  };

  return {
    isOpen,
    setIsOpen,
    configDialog,
    openUpdateBasicData,
    openOwnerAction,
    openSocialAction,
  };
}