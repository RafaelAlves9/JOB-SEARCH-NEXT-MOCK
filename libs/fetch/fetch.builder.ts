type FetchOptions = {
   baseUrl?: string;
   headers?: Record<string, string>;
   withCredentials?: boolean;
};

export class FetchBuilder {
   private baseUrl = "";
   private headers: Record<string, string> = {};
   private credentials: RequestCredentials = "same-origin";

   static build() {
      return new FetchBuilder();
   }

   withUrl(url: string) {
      this.baseUrl = url;
      return this;
   }

   withHeaders(headers: Record<string, string>) {
      this.headers = { ...this.headers, ...headers };
      return this;
   }

   haveCredentials() {
      this.credentials = "include";
      return this;
   }

   initInstance() {
      return async (path: string, init: RequestInit = {}) => {
         const url = `${this.baseUrl}${path}`;

         const finalInit: RequestInit = {
            ...init,
            credentials: this.credentials,
            headers: {
               ...this.headers,
               ...(init.headers || {}),
            },
         };

         return fetch(url, finalInit);
      };
   }
}
