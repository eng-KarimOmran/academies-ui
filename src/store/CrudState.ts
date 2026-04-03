import { create } from "zustand";

type DialogActionType = "create" | "update" | "delete" | null;

interface CrudStoreState<T> {
  dialogAction: DialogActionType;
  selectedItem: T | null;
  openDialog: (action: DialogActionType, item?: T) => void;
  closeDialog: () => void;
}

export const useCrudState = <T>() =>
  create<CrudStoreState<T>>((set) => ({
    dialogAction: null,
    selectedItem: null,
    openDialog: (action, item = undefined) =>
      set({ dialogAction: action, selectedItem: item }),
    closeDialog: () => set({ dialogAction: null, selectedItem: null }),
  }));
