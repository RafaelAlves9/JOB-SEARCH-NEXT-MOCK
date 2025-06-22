"use client";
import { logoutMethod } from "./logoutMethod";
import { toastMessage } from "./toastMessage";

export const handleStatusHttpResponse = (response: any) => {
   const status = response.status;

   switch (status) {
      case 400:
         toastMessage(response.data[0].value, "error");
         break;
      case 401:
         logoutMethod();
         break;
      case 403:
         window.location.href = `/not-authorized`;
         break;
      case 429:
         toastMessage(
            "Você ultrapassou o limite de requisições por minuto",
            "error"
         );
         break;
      default:
         toastMessage(
            `Ocorreu um erro inesperado, contacte o administrador - ${status}`,
            "error"
         );
         break;
   }
};
