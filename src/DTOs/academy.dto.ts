import z from "zod";
import {
  CreateAcademySchema,
  UpdateAcademySchema,
  DeleteAcademySchema,
  GetAllAcademiesSchema,
  GetAcademySchema,
} from "../validations/academy.validation";

export type CreateAcademyDto = z.infer<typeof CreateAcademySchema>;

// 2. Update Academy DTO
export type UpdateAcademyDto = z.infer<typeof UpdateAcademySchema>;

// 3. Delete Academy DTO
export type DeleteAcademyDto = z.infer<typeof DeleteAcademySchema>;

// 4. Get All Academies DTO
export type GetAllAcademiesDto = z.infer<typeof GetAllAcademiesSchema>;

// 5. Get Details Academy DTO
export type GetAcademyDetailsDto = {
  params: z.infer<typeof GetAcademySchema.params>;
};
