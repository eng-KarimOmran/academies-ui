import { create } from "zustand";

export type Actions = "update" | "delete" | "add" | "get" | "logout";

interface DialogState<T = unknown> {
  action: Actions | null;
  selectItem: T | null;
  open: boolean;

  openDialog: (action: Actions, item: T) => void;
  closeDialog: () => void;
}

export const useDialogState = create<DialogState>((set) => ({
  open: false,
  selectItem: null,
  action: null,

  openDialog: (action, item) =>
    set({
      open: true,
      action,
      selectItem: item,
    }),

  closeDialog: () =>
    set({
      open: false,
      action: null,
      selectItem: null,
    }),
}));
