import z from "zod";
import {
  id,
  phone,
  positiveNumber,
  recordType,
} from "../utils/common.validation";

export const AddFinancialRecordSchema = {
  params: z.object({
    academyId: id,
  }),
  body: z.object({
    phone,
    type: recordType,
    amount: positiveNumber,
    notes: z.string().optional(),
  }),
};

export const DeleteFinancialRecordSchema = {
  params: z.object({
    academyId: id,
    recordId: id,
  }),
};

export const GetStaffFinancialRecordsSchema = {
  params: z.object({
    academyId: id,
    staffUserId: id,
  }),
  query: z.object({
    month: z.coerce.number().min(1).max(12).optional(),
    year: z.coerce.number().min(2000).optional(),
  }),
};