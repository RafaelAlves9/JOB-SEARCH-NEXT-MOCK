'use client';

export function getCookieJSON(name: string): any | null {
   "use client"
   const cookies = document.cookie.split('; ');
   const cookie = cookies.find(row => row.startsWith(`${name}=`));
   if (!cookie) return null;

   try {
      const value = decodeURIComponent(cookie.split('=')[1]);
      return JSON.parse(value);
   } catch (error) {
      console.error('Erro ao parsear cookie:', error);
      return null;
   }
}