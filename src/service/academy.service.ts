import type { DeleteAcademyDto, GetAllAcademiesDto } from "@/DTOs/academy.dto";
import { axiosClient } from "@/lib/axios";
import type { Platform } from "@/types/enums";

type UpdateAcademyDto = {
  name?: string;
  phone?: string;
  address?: string;
  instaPay?: string;
  owners?: { phone: string }[];
  socialMedia?: {
    platform: Platform;
    url: string;
  }[];
};

type CreateAcademyDto = {
  name: string;
  phone: string;
  address: string;
  instaPay: string;
  owners: { phone: string }[];
};

export const getAllAcademies = (data: GetAllAcademiesDto) =>
  axiosClient.get(
    `/academy?page=${data.page ?? 1}&limit=${data.limit ?? 10}&search=${data.search ?? ""}`,
  );

export const deleteAcademy = (data: DeleteAcademyDto) =>
  axiosClient.delete(`/academy/${data.academyId}`);

export const createAcademy = (data: CreateAcademyDto) =>
  axiosClient.post(`/academy`, data);

export const updateAcademy = (id: string, data: UpdateAcademyDto) =>
  axiosClient.patch(`/academy/${id}`, data);

export const getAcademy = (id: string) =>
  axiosClient.get(`/academy/details/${id}`);
