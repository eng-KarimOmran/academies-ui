import type { LoginDto } from "@/DTOs/auth.dto";
import { axiosClient } from "@/lib/axios";

export const login = (data: LoginDto) => axiosClient.post("/auth/login", data);

export const refresh = () => axiosClient.get("/auth/refresh");
