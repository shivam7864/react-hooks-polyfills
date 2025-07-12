import { useEffect, useRef, useState } from "react";

const useThrottle = (callback, delay) => {
  const [throttledValue, setThrottledValue] = useState(callback);
  const lastExecutedref = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      const now = Date.now();
      const timeElapsed = now - lastExecutedref.current;
      if (timeElapsed >= delay) {
        setThrottledValue(callback);
        lastExecutedref.current = now;
      }
    }, delay - (Date.now() - lastExecutedref.current));
    return () => {
      clearTimeout(handler);
    };
  }, [delay, callback]);
};

export default useThrottle;
