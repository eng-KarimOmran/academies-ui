import { create } from "zustand";
import type { Academy } from "@/types/academy";

type DialogActionType = "create" | "update" | "delete" | null;

interface AcademyStoreState {
  dialogAction: DialogActionType;
  selectedAcademy: Academy | null;
  openDialog: (action: DialogActionType, academy?: Academy) => void;
  closeDialog: () => void;
}

export const useAcademyStore = create<AcademyStoreState>((set) => ({
  dialogAction: null,
  selectedAcademy: null,
  openDialog: (action, academy = undefined) => set({ dialogAction: action, selectedAcademy: academy }),
  closeDialog: () => set({ dialogAction: null, selectedAcademy: null }),
}));