import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const deleteSchema = (name: string, categoryName: string) =>
  z.object({
    name: z
      .string()
      .min(1, `لازم تكتب اسم ${categoryName}`)
      .refine((val) => val === name, {
        message: `اسم ${categoryName} غير مطابق`,
      }),
  });
