import z from "zod";
import {
  address,
  id,
  limit,
  phone,
  platform,
  positiveNumber,
  url,
  entityName,
} from "@/validations/common.validation";

const socialMediaSchema = z.object({
  platform,
  url,
});

export const CreateAcademySchema = z.object({
  name: entityName,
  phone,
  address,
  instaPay: z.string(),
  owners: phone,
});

export const UpdateAcademySchema = z.object({
  name: entityName.optional(),
  address: address.optional(),
  instaPay: z.string().optional(),
  owners: phone.optional(),
  socialMedia: z.array(socialMediaSchema).min(1).optional(),
});

export const DeleteAcademySchema = z.object({ academyId: id });

export const GetAcademySchema = {
  params: z.object({ academyId: id }),
};

export const GetAllAcademiesSchema = z.object({
  page: positiveNumber.optional().default(1),
  limit: limit.optional().default(50),
  search: z.string().optional(),
});
