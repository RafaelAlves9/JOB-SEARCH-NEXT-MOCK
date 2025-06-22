import { IFetchInstances } from "@fetch/fetch.instances";

export interface IClientRequest {
   url: string;
   body?: any;
   method: "get" | "post" | "put" | "delete" | "patch";
   instanceType?: keyof IFetchInstances;
   sucessAlert?: boolean;
   textAlert?: string;
}
