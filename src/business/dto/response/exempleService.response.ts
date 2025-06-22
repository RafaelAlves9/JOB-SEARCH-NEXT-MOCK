import z from "zod";

export const ZExempleServiceResponse = z.object({

});

export const ZExempleServicePaginationResponse = z.object({
   items: z.array(ZExempleServiceResponse),
   currentPage: z.number(),
   totalPages: z.number(),
   pageSize: z.number(),
   totalCount: z.number(),
});

export type TExempleServiceResponse = z.infer<typeof ZExempleServiceResponse>;
export type TExempleServicePaginationResponse = z.infer<typeof ZExempleServicePaginationResponse>;