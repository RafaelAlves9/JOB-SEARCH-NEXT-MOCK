import { useState, useEffect } from 'react';

function useDebounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
   const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

   const debouncedFn = (...args: Parameters<T>) => {
      if (timeoutId) {
         clearTimeout(timeoutId);
      }
      setTimeoutId(
         setTimeout(() => {
            fn(...args);
         }, delay),
      );
   };

   useEffect(() => {
      return () => {
         if (timeoutId) {
            clearTimeout(timeoutId);
         }
      };
   }, [timeoutId]);

   return debouncedFn;
}

// Hook para fazer debounce de valores
export function useDebouncedValue<T>(value: T, delay: number): T {
   const [debouncedValue, setDebouncedValue] = useState<T>(value);

   useEffect(() => {
      const handler = setTimeout(() => {
         setDebouncedValue(value);
      }, delay);

      return () => {
         clearTimeout(handler);
      };
   }, [value, delay]);

   return debouncedValue;
}

export default useDebounce;
export { useDebounce };
