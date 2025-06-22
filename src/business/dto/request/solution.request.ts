import { EPurpose } from "@src/business/enum/EPurpose";
import { fields } from "@src/extensions/messages";
import z from "zod";

export const ZSolutionRequest = z.object({
   purpose: z.nativeEnum(EPurpose),
   createDate: z.string(),
   description: z.string(),
   userName: z.string().min(1, fields.required),
   identifier: z.string().min(1, fields.required),
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

export type TSolutionRequest = z.infer<typeof ZSolutionRequest>;