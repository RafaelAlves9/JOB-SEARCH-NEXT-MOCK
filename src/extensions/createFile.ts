'use client';

import { EFileType } from '@src/business/enum/EFileType';

const base64ToBytes = (base64String: string) => {
   const binaryString = atob(base64String);
   const bytes = new Uint8Array(binaryString.length);
   for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
   }
   return bytes;
};

export const downloadFile = (bytesArray: string, type: EFileType, name?: string): void => {
   try {
      const bytes = base64ToBytes(bytesArray);
      const blob = new Blob([bytes], { type: type });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const extension = type?.split('/')[1];
      link.href = url;
      link.download = `${name ?? 'file'}.${extension}`;
      link.click();
      URL.revokeObjectURL(url);
   } catch (error) {
      console.error('Error to download file', error);
   }
};
