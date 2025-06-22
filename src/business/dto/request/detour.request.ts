import { EPurpose } from "@src/business/enum/EPurpose";
import { fields } from "@src/extensions/messages";
import z from "zod";

export const ZDetourRequest = z.object({
   purpose: z.nativeEnum(EPurpose),
   createDate: z.string(),
   description: z.string(),
   userName: z.string().min(1, fields.required),
   identifier: z.string(),
   regionId: z.number().min(1, fields.required),
   workAreaId: z.number().min(1, fields.required),
   companyId: z.number().min(1, fields.required),
   userWorkAreaId: z.number().min(1, fields.required),
   attachments: z.array(
      z.object({
         type: z.string(),
         name: z.string(),
         path: z.string(),
         bytes: z.string(),
      })
   ),
}).refine((data) => data.description.trim().length >= 3 || data.attachments.some((attachment) => attachment.type === "Audio"), {
   path: ["description"],
   message: fields.min(3),
});

export const ZDetourUpdateRequest = z.object({
   id: z.number(),
   type: z.string().min(1, fields.required),
   status: z.string(),
   assessment: z.object({
      id: z.number(),
      gravity: z.string().min(1, fields.required),
      urgency: z.string().min(1, fields.required),
      trend: z.string().min(1, fields.required),
      category: z.string().min(1, fields.required),
      redirection: z.string().min(1, fields.required),
      enterprise: z.string().min(1, fields.required),
      description: z.string().min(3, fields.min(3)),
   }),
});

export const ZDetourClassificationUpdateRequest = z.object({
      id: z.number(),
      status: z.string().min(1, fields.required),
      responsible: z.object({
         name: z.string().min(1, fields.required),
         email: z.string().min(1, fields.required),
      }),
      assessment: z.object({
         id: z.number(),
         gravity: z.string().min(1, fields.required),
         urgency: z.string().min(1, fields.required),
         trend: z.string().min(1, fields.required),
         category: z.string().min(1, fields.required),
         redirection: z.string().min(1, fields.required),
         enterprise: z.string().min(1, fields.required),
         action: z.string().min(1, fields.required),
         observation: z.string().min(3, fields.min(3))
      })
});

export const ZDetourPaginationRequest = z.object({
   status: z.string(),
   purpose: z.nativeEnum(EPurpose),
   pageNumber: z.number(),
   pageSize: z.number(),
});

export type TDetourRequest = z.infer<typeof ZDetourRequest>;
export type TDetourUpdateRequest = z.infer<typeof ZDetourUpdateRequest>;
export type TDetourPaginationRequest = z.infer<typeof ZDetourPaginationRequest>;
export type TDetourClassificationUpdateRequest = z.infer<typeof ZDetourClassificationUpdateRequest>;
