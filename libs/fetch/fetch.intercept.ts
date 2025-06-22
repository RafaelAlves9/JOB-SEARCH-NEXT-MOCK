import { handleStatusHttpResponse } from '../../src/utils/handleStatusResponse';

export async function fetchWithInterceptor(
   fetchFn: (url: string, init?: RequestInit) => Promise<Response>,
   url: string,
   init: RequestInit = {},
): Promise<Response> {
   try {
      let headers = { ...init.headers };

      headers = {
         ...headers,
      };

      const configWithSession = {
         ...init,
         headers,
      };

      const res = await fetchFn(url, configWithSession);

      if (!res.ok) {
         handleStatusHttpResponse(res);
         throw new Error(`Erro HTTP ${res.status}`);
      }

      return res;
   } catch (err) {
      console.error('Erro global:', err);
      throw err;
   }
}
