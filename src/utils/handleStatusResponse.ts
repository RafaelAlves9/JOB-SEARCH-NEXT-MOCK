'use client';

import { logoutMethod } from './logoutMethod';

export const handleStatusHttpResponse = (response: any) => {
   const status = response.status;

   switch (status) {
      case 400:
         alert(response.data[0].value);
         break;
      case 401:
         logoutMethod();
         break;
      case 403:
         window.location.href = `/not-authorized`;
         break;
      case 429:
         alert('You have exceeded the limit of requests per minute');
         break;
      default:
         alert(`An unexpected error occurred, contact the administrator - ${status}`);
         break;
   }
};
