import z from "zod";

export const ZDetourResponse = z.object({
  id: z.number(),
  purpose: z.string(),
  status: z.string(),
  type: z.string(),
  createDate: z.string(),
  description: z.string(),
  userName: z.string(),
  userEmail: z.string(),
  userWorkArea: z.string(),
  region: z.object({
    id: z.number(),
    name: z.string()
  }),
  assessment: z.object({
    id: z.number(),
    gravity: z.string(),
    urgency: z.string(), 
    trend: z.string(),
    category: z.string(),
    redirection: z.string(),
    enterprise: z.string(),
    description: z.string().nullable(),
    action: z.string().nullable(),
    gut: z.number().nullable()
  }),
  attachments: z.array(
    z.object({
      id: z.number(),
      type: z.string(),
      name: z.string(),
      path: z.string(),
      fileBytes: z.string()
    })
  ),
  responsible: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string()
  }).nullable(),
  workArea: z.object({
    id: z.number(),
    name: z.string(),
    active: z.boolean()
  }),
  company: z.object({
    id: z.number(),
    name: z.string()
  })
});

export const ZDetourPaginationResponse = z.object({
   items: z.array(ZDetourResponse),
   currentPage: z.number(),
   totalPages: z.number(),
   pageSize: z.number(),
   totalCount: z.number(),
});

export type TDetourResponse = z.infer<typeof ZDetourResponse>;
export type TDetourPaginationResponse = z.infer<
   typeof ZDetourPaginationResponse
>;
