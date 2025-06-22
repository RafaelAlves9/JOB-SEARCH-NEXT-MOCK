import { FetchBuilder } from "./fetch.builder";
import { fetchWithInterceptor } from "./fetch.intercept";

export interface IFetchInstances {
   public: (url: string, init?: RequestInit) => Promise<Response>;
   private: (url: string, init?: RequestInit) => Promise<Response>;
   privateFile: (url: string, init?: RequestInit) => Promise<Response>;
   identity: (url: string, init?: RequestInit) => Promise<Response>;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL!;
const IDENTITY_URL = process.env.NEXT_PUBLIC_IDENTITY_BASE_URL!;
const SYSTEM_ORIGIN = process.env.NEXT_PUBLIC_SYSTEM_ORIGIN!;

export const fetchInstances = {
   public: FetchBuilder.build()
      .withHeaders({ "Content-Type": "application/json" })
      .initInstance(),

   private: FetchBuilder.build()
      .withUrl(BACKEND_URL)
      .withHeaders({
         "Content-Type": "application/json",
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Methods":
            "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      })
      .haveCredentials()
      .initInstance(),

   privateFile: FetchBuilder.build()
      .withUrl(BACKEND_URL)
      .withHeaders({
         "Content-Type": "multipart/form-data",
         "Access-Control-Allow-Origin": "*",
      })
      .haveCredentials()
      .initInstance(),

   identity: FetchBuilder.build()
      .withUrl(IDENTITY_URL)
      .withHeaders({
         originSystem: SYSTEM_ORIGIN,
         "content-type": "application/json",
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Methods":
            "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      })
      .haveCredentials()
      .initInstance(),
};

export const fetchClient: IFetchInstances = {
   public: (url: string, init?: RequestInit) =>
      fetchWithInterceptor(fetchInstances.public, url, init),

   private: (url: string, init?: RequestInit) =>
      fetchWithInterceptor(fetchInstances.private, url, init),

   privateFile: (url: string, init?: RequestInit) =>
      fetchWithInterceptor(fetchInstances.privateFile, url, init),

   identity: (url: string, init?: RequestInit) =>
      fetchWithInterceptor(fetchInstances.identity, url, init),
};
