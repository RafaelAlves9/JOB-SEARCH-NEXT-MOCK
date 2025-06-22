import { useEffect, useRef } from 'react';

const useIntervalEffect = (fn?: () => void, interval?: number) => {
   const savedCallback = useRef(fn);

   useEffect(() => {
      if (fn) savedCallback.current = fn;
   }, [fn]);

   useEffect(() => {
      if (!fn || !interval || interval <= 0) return;
      const tick = () => savedCallback.current?.();

      const id = setInterval(tick, interval);
      return () => clearInterval(id);
   }, [interval, fn]);
};

export default useIntervalEffect;
