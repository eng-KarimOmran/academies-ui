export type InputProps<T> = {
  label: string;
  id: keyof T;
  name: string;
  type?: "text" | "password" | "email" | "number" | "tel";
  placeholder?: string;
};
