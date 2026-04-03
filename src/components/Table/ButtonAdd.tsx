import CustomDialog, { type ConfigDialog } from "../Dialog/CustomDialog";
import useDialog from "@/hooks/useDialog";
import { Button } from "../ui/button";
import { RiAddLine } from "@remixicon/react";

export default function ButtonAdd({
  configDialogAdd,
}: {
  configDialogAdd: ConfigDialog;
}) {
  const { setIsOpen, isOpen } = useDialog();

  const configDialog = {
    isOpen,
    setIsOpen,
  };

  return (
    <>
      <Button
        className="text-lg w-full md:w-auto"
        onClick={() => setIsOpen(true)}
      >
        <RiAddLine />
        إضافة
      </Button>
      {configDialog && (
        <CustomDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          {...configDialogAdd}
        />
      )}
    </>
  );
}
