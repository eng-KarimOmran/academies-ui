import { AxiosError } from "axios";

export type ErrorAxios = AxiosError<{
  message: string;
  status: number;
  success: boolean;
}>;
