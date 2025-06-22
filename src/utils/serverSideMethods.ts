'use server';

import { cookies } from 'next/headers';

export async function getServerCookieProperty(propertyName: string, propertyKey?: string): Promise<string> {
   const cookieStore = cookies();
   const cookieItem = await cookieStore.get(propertyName)?.value;

   if (!cookieItem) return '';

   if (!propertyKey) return decodeURIComponent(cookieItem);

   try {
      const decoded = decodeURIComponent(cookieItem);
      const parsed = JSON.parse(decoded);
      return parsed?.[propertyKey] ?? '';
   } catch (e) {
      console.error('Erro ao parsear o cookie:', e);
      return '';
   }
}
