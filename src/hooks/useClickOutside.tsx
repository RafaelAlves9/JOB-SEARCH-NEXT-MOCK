import { useCallback, useEffect } from 'react';

const useClickOutside = <T extends (...args: any[]) => void>(fn: T, componentRef: React.RefObject<HTMLElement>) => {
   const handleClickOutside = useCallback(
      (event: MouseEvent) => {
         if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
            fn();
         }
      },
      [fn, componentRef],
   );

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [handleClickOutside]);
};

export default useClickOutside;
