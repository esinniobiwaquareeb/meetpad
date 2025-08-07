import { useEffect, useRef, useCallback } from "react";

export function useDidUpdateEffect(fn: () => void, inputs: any[]) {
  const isMountingRef = useRef(false);

  useEffect(() => {
    isMountingRef.current = true;
  }, []);

  useEffect(() => {
    if (isMountingRef.current) {
      isMountingRef.current = false;
    } else {
      fn();
    }
  }, [fn, ...inputs]);
}
