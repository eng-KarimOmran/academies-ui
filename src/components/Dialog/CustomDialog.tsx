import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export interface CustomDialogState {
  isOpen: boolean;
  setIsOpen: (data: boolean) => void;
}

export type ConfigDialog = Pick<
  CustomDialogProps,
  "title" | "description" | "children"
>;

export interface CustomDialogProps {
  title: string;
  description: string;
  isOpen: boolean;
  setIsOpen: (data: boolean) => void;
  children: ({ isOpen, setIsOpen }: CustomDialogState) => ReactNode;
}

export default function CustomDialog({
  title,
  description,
  isOpen,
  setIsOpen,
  children,
}: CustomDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        dir="rtl"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        className="max-h-11/12 overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-lg">{title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>
        <main className="my-2">{children({ isOpen, setIsOpen })}</main>
      </DialogContent>
    </Dialog>
  );
}
