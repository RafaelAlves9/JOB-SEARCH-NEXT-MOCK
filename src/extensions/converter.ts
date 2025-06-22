export function base64ToBlobUrl(base64: string, mimeType = 'audio/mp3'): string {
   const binaryString = atob(base64);
   const bytes = new Uint8Array(binaryString.length);
   for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
   }
   const blob = new Blob([bytes], { type: mimeType });
   return URL.createObjectURL(blob);
}

export const blobToBase64 = async (blob: Blob): Promise<string> => {
   return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
         const base64 = reader.result as string;
         resolve(base64.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
   });
};
