
export type TTimelineResponse = {
   id: number;
   observation: string;
   eventDate: string;
   event: string | null;
   gut: number | null;
   userId: string | null;
   emailSent: string | null;
}

export type TTimelinePaginationResponse = {
   items: TTimelineResponse[];
   total: number;
   pageNumber: number;
   pageSize: number;
}
