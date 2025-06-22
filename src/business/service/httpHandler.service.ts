import { IClientRequest } from '../interface/httpHandlerService.interface';
import { toastMessage } from '@src/utils/toastMessage';
import { alert } from '@src/extensions/messages';
import { fetchClient } from '@fetch/fetch.instances';
import { getCookieJSON } from '@src/utils/localStorageProperty';
import { TNotificationError } from '../dto/response/notification.response';

export async function clientRequest<T>({
   url,
   body,
   method,
   sucessAlert = false,
   instanceType = 'private',
   textAlert,
}: IClientRequest): Promise<T> {
   const instance = fetchClient[instanceType];
   const init = buildRequestInit(method, body);
   try {
      const response = await instance(url, init);
      const returnedData = await handleRequestResult<T>(response, sucessAlert, textAlert);
      return returnedData;
   } catch (error) {
      toastMessage(alert.requesterFailed, 'error');
      throw null;
   }
}

function buildRequestInit(method: string, body?: any) {
   const session = getCookieJSON('session');

   const init: RequestInit = {
      method: method.toUpperCase(),
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${session ? session.accessToken : ''}`,
      },
   };

   if (body) {
      init.body = JSON.stringify(body);
   }

   return init;
}

async function handleRequestResult<T>(response: Response, sucessAlert: boolean, textAlert?: string): Promise<T> {
   if (!response.ok) {
      const error: TNotificationError[] = await response.json();
      if (response.status === 400) toastMessage(error[0].value, 'error');
      throw null;
   }

   if (response.status === 204) {
      toastMessage(alert.itemNotFound, 'warning');
      throw null;
   }

   if (sucessAlert) {
      toastMessage(textAlert ?? alert.requesterSuccess, 'success');
   }

   const data = await response.json();
   return data;
}
