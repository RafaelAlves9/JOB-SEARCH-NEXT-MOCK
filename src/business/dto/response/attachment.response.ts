import z from 'zod';

export const ZAttachmentResponse = z.object({
   id: z.number(),
   type: z.string(),
   name: z.string(),
   path: z.string(),
   fileBytes: z.string(),
});

export type TAttachmentResponse = z.infer<typeof ZAttachmentResponse>;
