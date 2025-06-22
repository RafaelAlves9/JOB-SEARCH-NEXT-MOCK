'use client';
export const logoutMethod = (): void => {
   // TODO: Remover o cookie session
   document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
   window.location.href = '/login-admin';
};
